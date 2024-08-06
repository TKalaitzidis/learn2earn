const router = require("express").Router();
const pool = require("../config/db");

router.get("/itemlist", async (req, res) => {
  try {
    const bookslist = await pool.query(
      "SELECT books.book_name, books.book_author, books.book_genre, books.book_points, books.book_type FROM booksentry JOIN books ON booksentry.b_id = books.book_id;"
    );

    res.send(bookslist.rows);
  } catch (error) {
    res.status(500).json("Server error");
  }
});

router.get("/whoowns", async (req, res) => {
    try {
      const users = await pool.query(
        "SELECT userbase.user_name FROM booksentry JOIN userbase ON booksentry.u_id = userbase.user_id JOIN books ON booksentry.b_id = books.book_id WHERE books.book_name = $1;",[req.book_name]);
        
      res.send(users.rows);
    } catch (error) {
      res.status(500).json("Server error");
    }
  });

module.exports = router;
