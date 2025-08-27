import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import fs from "node:fs";
import wordListPath from "word-list";

const app = express();
const port = 3000;
const wordArray = fs.readFileSync(wordListPath, "utf8").split("\n");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  var numIndex = Math.floor(Math.random() * wordArray.length);
  res.render("index.ejs", { word: wordArray[numIndex], definition: "Greeting" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
