const router = require("express").Router();
const pool = require("../config/db");
const authorization = require("../middleware/authorization");
const bcrypt = require("bcrypt");
require("dotenv").config();
const mailjet = require("node-mailjet").apiConnect(
  process.env.MAILJET_API_KEY,
  process.env.MAILJET_SECRET_KEY
);
const validInfo = require("../middleware/validInfo");

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
    const doesExist = await pool.query(
      "SELECT user_id FROM userbase WHERE user_email=$1",
      [req.query.user_email]
    );

    if (doesExist.rows.length > 0) {
      const randomString = generateRandomString(8);
      const saltRound = 10;
      const Salt = await bcrypt.genSalt(saltRound);
      const bcryptPassword = await bcrypt.hash(randomString, Salt);

      await pool.query(
        `UPDATE userbase SET user_pass = $1 WHERE user_email = $2`,
        [bcryptPassword, req.query.user_email]
      );

      const request = mailjet.post("send", { version: "v3.1" }).request({
        Messages: [
          {
            From: {
              Email: "learn2earnproj@gmail.com",
              Name: "Learn2Earn",
            },
            To: [
              {
                Email: req.query.user_email,
                Name: "Password Reset",
              },
            ],
            Subject: "Password Reset",
            TextPart: `Here is your new password: ${randomString}, if you don't remember resetting your password please contact us immediately.`,
          },
        ],
      });

      request
        .then((result) => {
          res.status(200).send("Reset successful. Email sent: " + result.body.Messages[0].Status);
        })
        .catch((err) => {
          console.error("Error sending email:", err);
          res.status(500).send("Email sending failed.");
        });
    } else {
      res.send(false);
    }
  } catch (error) {
    res.status(500).json("Server error");
  }
});

router.post("/contactsubmit", async (req, res) => {
  try {
    const { description, username } = req.body;

    const request = mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: "trikprd@gmail.com",
            Name: "Learn2Earn",
          },
          To: [
            {
              Email: "learn2earnproj@gmail.com",
              Name: "Bug Report",
            },
          ],
          Subject: `Bug Report from: ${username}`,
          TextPart: description,
        },
      ],
    });

    request
      .then((result) => {
        res
          .status(200)
          .send(
            "Report successful. Email sent: " + result.body.Messages[0].Status
          );
      })
      .catch((err) => {
        console.error("Error sending email:", err);
        res.status(500).send("Email sending failed.");
      });
  } catch (error) {
    res.status(500).json("Server error");
  }
});

router.delete("/deleteuser", async (req, res) => {
  try {
    const { user_name } = req.body;
    await pool.query(`DELETE FROM userbase WHERE user_name = '${user_name}'`);

    res.send("Deleted successfully.");
  } catch (error) {
    res.send(`Error deleting user: ${error}`);
  }
});

router.post("/changename", async (req, res) => {
  try {
    const { user_name, new_name } = req.body;

    checkExists = await pool.query(
      `SELECT * FROM userbase WHERE user_name = '${new_name}';`
    );
    if (checkExists.rows.length > 0) {
      res.send("Username already exists.");
    } else {
      await pool.query(
        `UPDATE userbase SET user_name = '${new_name}' WHERE user_name = '${user_name}';`
      );

      res.send("Changed username successfully.");
    }
  } catch (error) {
    console.error("Error changing name:", error);
  }
});

router.post("/changemail", validInfo, async (req, res) => {
  try {
    const { user_name, new_mail } = req.body;

    checkExists = await pool.query(
      `SELECT * FROM userbase WHERE user_email = '${new_mail}';`
    );
    if (checkExists.rows.length > 0) {
      res.json({alreadyExists: "Email already exists."});
    } else {
      await pool.query(
        `UPDATE userbase SET user_email = '${new_mail}' WHERE user_name = '${user_name}';`
      );

      res.json({success:"Changed Email successfully."});
    }
  } catch (error) {
    res.json({error: `Error changing email: ${error}`});
  }
});

router.post("/changepass", async (req, res) => {
  try {
    const { newPass, user_name } = req.body;

    const saltRound = 10;
    const Salt = await bcrypt.genSalt(saltRound);
    console.log(newPass);
    const bcryptPassword = await bcrypt.hash(newPass, Salt);

    await pool.query(
      `UPDATE userbase SET user_pass = '${bcryptPassword}' WHERE user_name = '${user_name}';`
    );

    res.send("Changed Password successfully.");
  } catch (error) {
    res.send(`Error changing password: ${error}`);
  }
});

router.get("/getusers", async (req, res) =>{
  try {
    users = await pool.query("SELECT user_id,user_name,user_email,user_area,user_points,isadmin,isbanned,bandays FROM userbase;");
    res.send(users.rows);
  } catch (error) {
    res.send(`Error getting users: ${error}`);
  }
});

module.exports = router;
