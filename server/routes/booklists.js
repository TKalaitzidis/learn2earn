const router = require("express").Router();
const pool = require("../config/db");

router.get("/itemlist", async (req, res) => {
  try {
    const bookslist = await pool.query(
      "SELECT books.book_name, MAX(books.book_author) AS book_author, MAX(books.book_genre) AS book_genre, MAX(books.book_points) AS book_points, MAX(books.book_type) AS book_type FROM booksentry JOIN books ON booksentry.b_id = books.book_id GROUP BY books.book_name;"
    );

    res.send(bookslist.rows);
  } catch (error) {
    res.status(500).json("Server error");
  }
});

router.get("/whoowns", async (req, res) => {
  try {
    const users = await pool.query(
      "SELECT userbase.user_name, userbase.user_email, userbase.user_area, userbase.user_points, userbase.user_id FROM booksentry JOIN userbase ON booksentry.u_id "+
      "= userbase.user_id JOIN books ON booksentry.b_id = books.book_id WHERE books.book_name = $1;",
      [req.query.book_name]
    );

    res.send(users.rows);
  } catch (error) {
    res.status(500).json("Server error");
  }
});

router.get("/userbooks", async (req, res) => {
  try {
    const ubooks = await pool.query(
      "SELECT books.book_name, books.book_author, books.book_genre, books.book_points, "+
      "books.book_type FROM booksentry JOIN userbase ON booksentry.u_id = userbase.user_id "+
      "JOIN books ON booksentry.b_id = books.book_id WHERE userbase.user_name=$1;",
    [req.query.username]);
    res.send(ubooks.rows);
  } catch (error) {
    res.status(500).json("Server error");
  }
});

router.post("/submit", async (req, res) => {
  try {
    const { book_name, book_author, book_genre, book_type, user_id } = req.body;

    const submitcheck = await pool.query("SELECT * FROM books WHERE book_name=$1", [book_name]);
    const cond = submitcheck.rows[0];

    if (cond) {
      const userOwns = await pool.query(
        `SELECT entry_id FROM booksentry 
         JOIN userbase ON booksentry.u_id = userbase.user_id 
         JOIN books ON booksentry.b_id = books.book_id 
         WHERE userbase.user_id = $1 AND books.book_name = $2;`,
        [user_id, book_name]
      );

      if (userOwns.rows.length > 0) {
        res.send("User already owns the book");
      } else {
        await pool.query("INSERT INTO booksentry(b_id, u_id) VALUES($1,$2);", [cond.book_id.toString(), user_id]);
        await pool.query("UPDATE userbase SET user_points = user_points + 1 WHERE user_id = $1;", [user_id]);
        res.send("Submitted successfully");
      }
    } else {
      const booksubmit = await pool.query(
        "INSERT INTO books (book_name, book_author, book_genre, book_type) VALUES ($1, $2, $3, $4) RETURNING book_id;",
        [book_name, book_author, book_genre, book_type]
      );

      await pool.query("INSERT INTO booksentry(b_id, u_id) VALUES($1,$2);", [booksubmit.rows[0].book_id.toString(), user_id]);
      await pool.query("UPDATE userbase SET user_points = user_points + 1 WHERE user_id = $1;", [user_id]);
      res.send("New book submitted successfully");
    }
  } catch (error) {
    console.error("Error during book submission:", error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
});

router.post("/transact", async (req, res) => {
  try {
    const { book_name, owner_name, buyer_name, buyer_id, owner_id } = req.body;

    const bookres = await pool.query("SELECT * FROM books WHERE book_name = $1;", [book_name]);
    const book = bookres.rows[0];
    const pointsCheck = await pool.query("SELECT * FROM userbase WHERE user_points>$1 AND user_name=$2;", [book.book_points, buyer_name]);

    if (pointsCheck.rows.length > 0){
      await pool.query("UPDATE userbase SET user_points = user_points + $1 WHERE user_name = $2;", [book.book_points, owner_name]);
      await pool.query("UPDATE userbase SET user_points = user_points - $1 WHERE user_name = $2;", [book.book_points, buyer_name]);
      await pool.query("DELETE FROM booksentry WHERE b_id = $1 AND u_id = $2;", [book.book_id, owner_id]);
      res.send("Transaction successful.");
    }
    else{
      res.send("User doesnt have enough points to buy this book");
    }
  } catch (error) {
    console.error("Error during transaction:", error);
    res.status(500).json({ error:"Server error", details: error.message });
  }
})


module.exports = router;