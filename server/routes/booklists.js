const router = require("express").Router();
const pool = require("../config/db");
require("dotenv").config();
const mailjet = require("node-mailjet").apiConnect(
  process.env.MAILJET_API_KEY,
  process.env.MAILJET_SECRET_KEY
);

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
      "SELECT userbase.user_name, userbase.user_email, userbase.user_area, userbase.user_points, userbase.user_id FROM booksentry JOIN userbase ON booksentry.u_id " +
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
      "SELECT books.book_name, books.book_author, books.book_genre, books.book_points, " +
        "books.book_type FROM booksentry JOIN userbase ON booksentry.u_id = userbase.user_id " +
        "JOIN books ON booksentry.b_id = books.book_id WHERE userbase.user_name=$1;",
      [req.query.username]
    );
    res.send(ubooks.rows);
  } catch (error) {
    res.status(500).json("Server error");
  }
});

router.post("/submit", async (req, res) => {
  try {
    const { book_name, book_author, book_genre, book_type, user_id } = req.body;

    const submitcheck = await pool.query(
      "SELECT * FROM books WHERE book_name=$1",
      [book_name]
    );
    const cond = submitcheck.rows[0];

    if (submitcheck.rows.length > 0) {
      const userOwns = await pool.query(
        `SELECT entry_id FROM booksentry 
         JOIN userbase ON booksentry.u_id = userbase.user_id 
         JOIN books ON booksentry.b_id = books.book_id 
         WHERE userbase.user_id = $1 AND books.book_name = $2;`,
        [user_id, book_name]
      );

      if (userOwns.rows.length > 0) {
        res.send("User already owns the book");
        return;
      } else {
        await pool.query("INSERT INTO booksentry(b_id, u_id) VALUES($1,$2);", [
          cond.book_id.toString(),
          user_id,
        ]);
        await pool.query(
          "UPDATE userbase SET user_points = user_points + 1 WHERE user_id = $1;",
          [user_id]
        );
        res.send("Submitted successfully");
      }
    } else {
      const booksubmit = await pool.query(
        "INSERT INTO books (book_name, book_author, book_genre, book_type) VALUES ($1, $2, $3, $4) RETURNING book_id;",
        [book_name, book_author, book_genre, book_type]
      );

      await pool.query("INSERT INTO booksentry(b_id, u_id) VALUES($1,$2);", [
        booksubmit.rows[0].book_id.toString(),
        user_id,
      ]);
      await pool.query(
        "UPDATE userbase SET user_points = user_points + 1 WHERE user_id = $1;",
        [user_id]
      );
      res.send("New book submitted successfully.");
    }
  } catch (error) {
    console.error("Error during book submission:", error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
});

router.post("/transact", async (req, res) => {
  try {
    const {
      book_name,
      owner_name,
      buyer_name,
      owner_id,
      owner_email,
      form_firstname,
      form_lastname,
      form_streetname,
      form_number,
      form_floor,
      form_city,
      form_postal,
      form_country,
      form_state,
    } = req.body;

    const bookres = await pool.query(
      "SELECT * FROM books WHERE book_name = $1;",
      [book_name]
    );
    const book = bookres.rows[0];
    const pointsCheck = await pool.query(
      "SELECT * FROM userbase WHERE user_points>$1 AND user_name=$2;",
      [book.book_points, buyer_name]
    );

    if (pointsCheck.rows.length > 0) {
      await pool.query(
        "UPDATE userbase SET user_points = user_points + $1 WHERE user_name = $2;",
        [book.book_points, owner_name]
      );
      await pool.query(
        "UPDATE userbase SET user_points = user_points - $1 WHERE user_name = $2;",
        [book.book_points, buyer_name]
      );
      await pool.query(
        "DELETE FROM booksentry WHERE b_id = $1 AND u_id = $2;",
        [book.book_id, owner_id]
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
                Email: owner_email,
                Name: owner_name,
              },
            ],
            Subject: `Book Transaction successful: ${book_name}`,
            HTMLPart: `
                  <h3>Book Transaction successful: ${book_name}</h3>
                  <p>Your book "${book_name}" has successfully been picked by user: ${buyer_name}. You should now send it to the following address:</p>
                  <div style="border: 1px solid #ddd; padding: 10px; margin-top: 10px;">
                    <p><strong>Recipient:</strong> ${form_firstname} ${form_lastname}</p>
                    <p><strong>Address:</strong> ${form_streetname} ${form_number}</p>
                    <p><strong>Floor:</strong> ${form_floor}</p>
                    <p><strong>City:</strong> ${form_city}</p>
                    <p><strong>Postal Code:</strong> ${form_postal}</p>
                    <p><strong>State:</strong> ${form_state}</p>
                    <p><strong>Country:</strong> ${form_country}</p>
                  </div>
                  <p>If you fail to send the book to the address in more than 14 days, your account will be penalized.</p>
                `,
          },
        ],
      });

      request
        .then((result) => {
          res
            .status(200)
            .send(
              "Transaction successful. Email sent: " +
                result.body.Messages[0].Status
            );
        })
        .catch((err) => {
          console.error("Error sending email:", err);
          res
            .status(500)
            .send("Transaction successful, but email sending failed.");
        });
    } else {
      res.send("User doesnt have enough points to buy this book");
    }
  } catch (error) {
    console.error("Error during transaction:", error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
});

router.get("/topowners", async (req, res) => {
  try {
    const topowners = await pool.query(
      "SELECT ub.user_name, frequency FROM ( SELECT u_id, COUNT(u_id) AS frequency FROM booksentry GROUP BY u_id ORDER BY frequency DESC LIMIT 5 ) AS top_users JOIN userbase ub ON top_users.u_id = ub.user_id;"
    );
    res.send(topowners.rows);
  } catch (error) {
    res.send(`Error getting top book owners: ${error}`);
  }
});

router.get("/bookowners", async (req, res) => {
  try {
    bookowners = await pool.query("SELECT books.book_name,userbase.user_name FROM booksentry JOIN books on booksentry.b_id=books.book_id JOIN userbase ON booksentry.u_id=userbase.user_id;")
    res.json(bookowners.rows);
  } catch (error) {
    res.send(`Error getting book owners: ${error}`);
  }
})

router.post("/editbook", async (req, res) => {
  try {
    const { name, author, points, genre, type, oldName } = req.body;
    await pool.query(`UPDATE books SET book_name='${name}', book_author='${author}', book_genre='${genre}', book_points='${points}', book_type='${type}' WHERE book_name='${oldName}';`)
    
    res.send("Book Editted Successfully.");
  } catch (error) {
    res.send(`Error editing the book: ${error}`)
  }
})

router.post("/removeowner", async (req, res) => {
  try {
    const { user_id, book_name } = req.body;
    book_id = await pool.query(`SELECT book_id FROM books WHERE book_name='${book_name}';`);
    await pool.query(`DELETE FROM booksentry WHERE u_id=${user_id} AND b_id=${book_id.rows[0].book_id};`);
    res.send("Entry Deleted Successfully.");
  } catch (error) {
    res.send(`Error removing owner: ${error}`);
  }
})

module.exports = router;
