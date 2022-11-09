//Objectif : Recuprer le Blob d'un fichier à partir de son URL(chemin)

const express = require("express");
const path = require("path");
const app = express();
const port = 5000;

let options = {
  root: __dirname,
};

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile("form.html", options, null);
});


app.get("/result", (req, res) => {
    console.log("df");
  res.sendFile("index.html", options, null);
});


console.log(path.join(__dirname));

app.listen(port, () => console.log("Listenning on the", port));
