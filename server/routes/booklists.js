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

router.get("/history", async (req, res) => {
  try {
    const userHistory = await pool.query(
      "SELECT books.book_name, books.book_author, books.book_genre, books.book_points, " +
        "books.book_type FROM history JOIN userbase ON history.u_id = userbase.user_id " +
        "JOIN books ON history.b_id = books.book_id WHERE userbase.user_name=$1;",
      [req.query.username]
    );
    res.send(userHistory.rows);
  } catch (error) {
    res.status(500).json("Server error");
  }
});

router.get("/whoowns", async (req, res) => {
  try {
    const users = await pool.query(
      "SELECT userbase.user_name, userbase.user_email, userbase.user_area, userbase.user_id, userbase.user_ph_points, userbase.user_pdf_points FROM booksentry JOIN userbase ON booksentry.u_id " +
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
        await pool.query("INSERT INTO history(b_id, u_id) VALUES($1,$2);", [
          cond.book_id.toString(),
          user_id,
        ]);
        await pool.query(
          `UPDATE userbase SET ${
            cond.book_type === "Physical" ? "user_ph_points" : "user_pdf_points"
          } = ${
            cond.book_type === "Physical" ? "user_ph_points" : "user_pdf_points"
          } + ${cond.book_points} WHERE user_id = ${user_id};`
        );
        res.send("Submitted successfully");
      }
    } else {
      const booksubmit = await pool.query(
        "INSERT INTO books (book_name, book_author, book_genre, book_type) VALUES ($1, $2, $3, $4) RETURNING book_id;",
        [book_name, book_author, book_genre, book_type]
      );

      await pool.query("INSERT INTO history(b_id, u_id) VALUES($1,$2);", [
        booksubmit.rows[0].book_id.toString(),
        user_id,
      ]);

      await pool.query(
        `UPDATE userbase SET ${
          book_type === "Physical" ? "user_ph_points" : "user_pdf_points"
        } = ${
          book_type === "Physical" ? "user_ph_points" : "user_pdf_points"
        } + 1 WHERE user_id = ${user_id};`
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
      buyer_id,
      buyer_email,
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

    
    let request;

    const pointsCheck = await pool.query(
      `SELECT * FROM userbase WHERE ${
        book.book_type === "Physical" ? "user_ph_points" : "user_pdf_points"
      }>=${book.book_points} AND user_name='${buyer_name}';`
    );



    if (pointsCheck.rows.length > 0) {
      await pool.query(
        `INSERT INTO requests (b_id, requester_id, offerer_id) VALUES (${book.book_id},${buyer_id},${owner_id})`
      );
      
      if (book.book_type === "Physical") {
        request = mailjet.post("send", { version: "v3.1" }).request({
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
      } else {
        request = mailjet.post("send", { version: "v3.1" }).request({
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
                    <p>Your book "${book_name}" has successfully been picked by user: ${buyer_name}. You should now send it to the following e-mail:</p>
                    <div style="border: 1px solid #ddd; padding: 10px; margin-top: 10px;">
                      <p><strong>${buyer_email}</p>
                    </div>
                    <p>If you fail to send the book to this e-mail in more than 14 days, your account will be penalized.</p>
                  `,
            },
          ],
        });
      }

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

router.post("/complete", async (req, res) => {
  try {
    const { b_id, buyer_id, owner_id, request_id, decision } = req.body;
    
    if (decision) {
      const bookres = await pool.query(
        `SELECT * FROM books WHERE book_id=${b_id}`
      );
      const book = bookres.rows[0];

      await pool.query(
        `UPDATE userbase SET ${
          book.book_type === "Physical" ? "user_ph_points" : "user_pdf_points"
        } = ${
          book.book_type === "Physical" ? "user_ph_points" : "user_pdf_points"
        } + ${book.book_points} WHERE user_id = ${owner_id};`
      );
      await pool.query(
        `UPDATE userbase SET ${
          book.book_type === "Physical" ? "user_ph_points" : "user_pdf_points"
        } = ${
          book.book_type === "Physical" ? "user_ph_points" : "user_pdf_points"
        } - ${book.book_points} WHERE user_id = ${buyer_id};`
      );

      await pool.query(
        `DELETE FROM requests WHERE b_id=${b_id} AND offerer_id=${owner_id}`
      );

      if (book.book_type === "Physical") {
        await pool.query(
          "DELETE FROM booksentry WHERE b_id = $1 AND u_id = $2;",
          [book.book_id, owner_id]
        );
      }
    } else {
      await pool.query(`DELETE FROM requests WHERE request_id = ${request_id}`);
    }

    res.send("Request Completed Successfully.");
  } catch (error) {
    res.send(error);
  }
});

router.get("/getrequests", async (req, res) => {
  try {
    
    const requests = await pool.query(
      `SELECT b_id, requester_id, offerer_id, request_id, requester.user_name, book_name FROM requests JOIN books ON b_id=books.book_id JOIN userbase AS requester ON requester_id=requester.user_id JOIN userbase AS offerer ON offerer_id=offerer.user_id WHERE offerer_id=${req.query.offerer_id};`
    );
    res.send(requests.rows);
  } catch (error) {
    res.send(`Error getting requests: ${error}`);
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
    bookowners = await pool.query(
      "SELECT books.book_name,userbase.user_name FROM booksentry JOIN books on booksentry.b_id=books.book_id JOIN userbase ON booksentry.u_id=userbase.user_id;"
    );
    res.json(bookowners.rows);
  } catch (error) {
    res.send(`Error getting book owners: ${error}`);
  }
});

router.post("/editbook", async (req, res) => {
  try {
    const { name, author, points, genre, type, oldName } = req.body;
    await pool.query(
      `UPDATE books SET book_name='${name}', book_author='${author}', book_genre='${genre}', book_points='${points}', book_type='${type}' WHERE book_name='${oldName}';`
    );

    res.send("Book Editted Successfully.");
  } catch (error) {
    res.send(`Error editing the book: ${error}`);
  }
});

router.post("/removeowner", async (req, res) => {
  try {
    const { user_id, book_name } = req.body;
    book = await pool.query(
      `SELECT * FROM books WHERE book_name='${book_name}';`
    );
    await pool.query(
      `DELETE FROM booksentry WHERE u_id=${user_id} AND b_id=${book.rows[0].book_id};`
    );
    await pool.query(
      `UPDATE userbase SET ${
        book.rows[0].book_type === "Physical"
          ? "user_ph_points"
          : "user_pdf_points"
      }= ${
        book.rows[0].book_type === "Physical"
          ? "user_ph_points"
          : "user_pdf_points"
      }-${book.rows[0].book_points} WHERE user_id=${user_id};`
    );
    res.send("Entry Deleted Successfully.");
  } catch (error) {
    res.send(`Error removing owner: ${error}`);
  }
});

module.exports = router;
