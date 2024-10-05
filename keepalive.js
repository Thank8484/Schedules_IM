var http = require("http");
const express = require("express");
const app = express();
const port = process.env.PORT;

http.createServer(function (req, res) {
  res.write("I'm alive");
  res.end();
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
