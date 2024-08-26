const router = require("express").Router();
const pool = require("../config/db");
const authorization = require("../middleware/authorization");
const bcrypt = require("bcrypt");

function generateRandomString(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

router.get("/", authorization, async (req, res) => {
  try {
    const user = await pool.query("SELECT * FROM userbase WHERE user_id = $1", [
      req.user,
    ]);

    res.json(user.rows[0]);
  } catch (error) {
    res.status(500).json("Server error");
  }
});

router.get("/otheruser", authorization, async (req, res) => {
  try {
    user = await pool.query(
      "SELECT user_id, user_name, user_email, user_area, user_points FROM userbase WHERE user_name = $1",
      [req.query.username]
    );

    res.json(user.rows[0]);
  } catch (error) {
    res.status(500).json("Server error");
  }
});

router.get("/exists", async (req, res) => {
  try {
    doesExist = await pool.query(
      "SELECT user_id FROM userbase WHERE user_email=$1",
      [req.query.user_email]
    );
    if (doesExist.rows.length > 0) {
      const randomString = generateRandomString(8);
      const saltRound = 10;
      const Salt = await bcrypt.genSalt(saltRound);
      const bcryptPassword = await bcrypt.hash(randomString, Salt);
      await pool.query(`UPDATE userbase SET user_pass = '${bcryptPassword}' WHERE user_email = '${req.query.user_email}';`);
      res.send(bcryptPassword);
    } else {
      res.send(false);
    }
  } catch (error) {
    res.status(500).json("Server error");
  }
});

module.exports = router;
