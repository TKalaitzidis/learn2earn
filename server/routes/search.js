const router = require("express").Router();
const pool = require("../config/db");

router.get("/", async (req, res) => {
    try {
        
      const {term} = req.query;
      
      const books = await pool.query(`SELECT * FROM books WHERE LOWER(book_name || ' ' || book_author || ' ' || book_genre) LIKE '%' || LOWER('${term}') || '%' ;`);

      res.json(books.rows);
    } catch (error) {
      res.status(500).json("Server error");
    }
  });

module.exports= router;