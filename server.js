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
// This method looks into the public folder and makes the files inside run with express.

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

// Adding new notes using .post
app.post("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", (err, data) => {
    if (err) {
      console.log(err);
    };
    // Parsing the data read in db.json
    db = JSON.parse(data);
    // Adding an id to each note based off its index postion. The +1 is necessary, because an id cannot be null
    const newNote = { ...req.body, id: db.length + 1 };
    console.log(newNote);
    // Pushing the new note into the db.json
    db.push(newNote);
    // Writing the note on the page itself
    fs.writeFile("./db/db.json", JSON.stringify(db), (err) => {
      if (err) {
        console.log(err);
      }
      res.json(db);
    });
  });
});


//Deleting notes using .delete, looking at note id's
app.delete("/api/notes/:id", function (req, res) {
  fs.readFile("./db/db.json", (err, data) => {
    if (err) {
      console.log(err);
    }
    db = JSON.parse(data);
    // It is essentially the same as posting a new note, except we are filtering through the given id added by posting a note
    const newDB = db.filter((note) => note.id != parseInt(req.params.id));
    console.log(newDB);
    fs.writeFile("./db/db.json", JSON.stringify(newDB), (err) => {
      if (err) {
        console.log(err);
      }
      res.json(newDB);
    });
  });
});




// Catchall to return to the main index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

// 4. listen on that port
app.listen(PORT, (req, res) => {
  console.log(`Currently running on http://localhost:${PORT}`);
});
