// 1. Require express
const express = require("express");
const path = require("path");
const db = require("./db/db.json");
const fs = require("fs");
// 2. create an instance of express called app
const app = express();
// 3. Add a port
const PORT = process.env.PORT || 3000;

// 5. Get these bad boys from processing POST routes
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));



// View / HTML
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});


// API / JSON

app.get("/api/notes", function(req, res) {
    return res.json(db);
});

app.post("/api/notes", function(req, res) {
    const newNote = req.body;
    console.log(newNote);
    db.push(newNote);

    fs.writeFile("./db/db.json", JSON.stringify(db), function (err){
        if(err){
            console.log(err);
        } res.json(newNote);
    });

    
    
});



// 4. listen on that port
app.listen(PORT, (req, res) => {
    console.log(`Currently running on http://localhost:${PORT}`);
});