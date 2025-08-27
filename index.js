import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", { message: "Hello world!" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
