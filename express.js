const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const PORT = 3000;

// Middleware untuk menangani permintaan ke folder CSS tanpa menyebutkan nama file
app.use("/css", (req, res, next) => {
  const cssPath = path.join(__dirname, "css", "bootstrap.min.css");
  fs.readFile(cssPath, (err, data) => {
    if (err) {
      res.status(404).send("CSS file not found");
    } else {
      res.set("Content-Type", "text/css");
      res.send(data);
    }
  });
});

// Set folder static untuk JavaScript dan file lain
app.use("/js", express.static(path.join(__dirname, "js")));

// Routing untuk halaman utama
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
