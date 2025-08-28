import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import fs from "node:fs";
import wordListPath from "word-list";
import wordlist from "wordlist-english";

const app = express();
const port = 3000;
const API_URL = "https://api.dictionaryapi.dev/api/v2/entries/en";
// const API_URL = "https://wordsapiv1.p.mashape.com/words";

var wordArray = wordlist["english"];
// const wordList = fs.readFileSync(englishWords, "utf8").split("\n");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  // var numIndex = Math.floor(Math.random() * wordArray.length);
  res.render("index.ejs", { word: "Display Word", definition: "Display Definition" });
});

app.get("/new-word", async (req, res) => {
  var numIndex = Math.floor(Math.random() * wordArray.length);

  try {
    const result = await axios.get(API_URL + "/" + wordArray[numIndex]);
    res.render("index.ejs", {
      word: result.data[0].word.toUpperCase(),
      definition: result.data[0].meanings[0].definitions[0].definition,
    });
  } catch (error) {
    res.render("index.ejs", {
      word: JSON.stringify(error.response.data.message),
      definition: JSON.stringify(error.response.data.resolution),
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
