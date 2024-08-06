const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');

const app = express();

// middleware
app.use(express.json()) 
app.use(cors())

//routes

//register and login routes

app.use("/auth", require("./routes/jwtAuth"))

//dashboard route

app.use("/dashboard", require("./routes/dashboard"));

//books route

app.use("/books", require("./routes/booklists"));

const port = 8000;
app.listen(port, () => console.log("Server is running on port", port))