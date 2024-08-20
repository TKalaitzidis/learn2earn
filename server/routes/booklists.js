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
      "SELECT userbase.user_name, userbase.user_area FROM booksentry JOIN userbase ON booksentry.u_id "+
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
    const cond =submitcheck.rows[0]

    if(cond){
      const userOwns = await pool.query("SELECT entry_id FROM booksentry JOIN userbase ON booksentry.u_id = userbase.user_id" +
         "JOIN books ON booksentry.b_id = books.book_id WHERE userbase.user_id=$1 AND book_name = $2;", [user_id, book_name]);
         
      if(userOwns){
        res.send(false);
      }
      else{
        const submit = await pool.query("INSERT INTO booksentry(b_id, u_id) VALUES($1,$2);", [cond.book_id.toString(),user_id]);
        res.send("Submitted succesfully");
      }
      
    }
    else{
      const booksubmit= await pool.query("INSERT INTO books (book_name, book_author, book_genre, book_type)"+
      " VALUES ($1, $2, $3, $4);", [book_name, book_author, book_genre, book_type]);
      const submit = await pool.query("INSERT INTO booksentry(b_id, u_id) VALUES($1,$2);", [submission.rows[0].book_id.toString(),user_id]);
      res.send("New book submitted succesfully");
    };

  } catch (error) {
    res.status(500).json("Server error");

  }
})

module.exports = router;