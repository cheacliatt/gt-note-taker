// 1. Require express
const express = require("express");
const path = require("path");
let db = require("./db/db.json");
const fs = require("fs");
// 2. create an instance of express called app
const app = express();
// 3. Add a port
const PORT = process.env.PORT || 3000;

// 5. Get these bad boys from processing POST routes
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// View / HTML
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// API / JSON

app.get("/api/notes", (req, res) => {
    res.json(db);
});

app.post("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", (err, data) => {
    if (err) {
      console.log(err);
    };

 


    db = JSON.parse(data);
    const newNote = { ...req.body, id: db.length + 1 };
    console.log(newNote);
    db.push(newNote);

    fs.writeFile("./db/db.json", JSON.stringify(db), (err) => {
      if (err) {
        console.log(err);
      }
      res.json(db);
    });

       // forEach ((obj, i)) obj.id === i++



  });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

// 4. listen on that port
app.listen(PORT, (req, res) => {
  console.log(`Currently running on http://localhost:${PORT}`);
});
