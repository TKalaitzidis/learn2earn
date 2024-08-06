const router = require("express").Router();
const pool = require("../config/db");
const authorization = require("../middleware/authorization");

router.get("/", authorization, async(req, res) => {
    try {
        const user = await pool.query("SELECT user_name FROM userbase WHERE user_id = $1", [req.user]);

        res.json(user.rows[0]);
    } catch (error) {
        res.status(500).json("Server error");
    }
})

module.exports= router;