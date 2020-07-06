// 1. Require express
const express = require("express");
// 2. create an instance of express called app
const app = express();
// 3. Add a port
const PORT = process.env.PORT || 3000;

// 5. Get these bad boys from processing POST routes
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// View / HTML
app.get("/", (req, res) => {
    res.send("Hello World!");
});


// API / JSON


// 4. listen on that port
app.listen(PORT, (req, res) => {
    console.log(`Currently running on http://localhost:${PORT}`);
});