const router = require("express").Router();
const pool = require("../config/db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validInfo");
const authorization = require("../middleware/authorization");

//Register

router.post("/register", validInfo, async (req, res) => {
  try {
    const { email, username, password, city } = req.body;

    const user = await pool.query(
      "SELECT * FROM userbase WHERE user_email = $1",
      [email]
    );

    if (user.rows.length !== 0) {
      return res.status(401).json({ userExists: "User already exists!" });
    }

    const saltRound = 10;
    const Salt = await bcrypt.genSalt(saltRound);
    const bcryptPassword = await bcrypt.hash(password, Salt);

    const newUser = await pool.query(
      "INSERT INTO userbase (user_email, user_name, user_pass, user_area) VALUES ($1, $2, $3, $4) RETURNING *",
      [email, username, bcryptPassword, city]
    );

    const token = jwtGenerator(newUser.rows[0].user_id);

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send(req.body);
  }
});

//Login

router.post("/login", validInfo, async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await pool.query(
      "SELECT * FROM userbase WHERE user_name = $1",
      [username]
    );

    if (user.rows.length == 0) {
      res.status(401).json("Password or User Name is incorrect");
      return;
    }

    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].user_pass
    );

    if (!validPassword) {
      res.json("Password or User Name is incorrect");
      return;
    }

    const adminCheck = await pool.query(`SELECT * FROM userbase WHERE user_name='${username}' AND isAdmin=TRUE`);
    const isAdmin = adminCheck.rows.length >= 1;
    const token = jwtGenerator(user.rows[0].user_id);
    res.json({ token, isAdmin });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/is-verify", authorization, async (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/uid", authorization, async (req, res) => {
  try {
    const { username } = req.body;

    const uid = await pool.query(
      "SELECT user_id FROM userbase WHERE user_name = $1",
      [username]
    );

    res.send(uid.rows[0].user_id.toString());
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
