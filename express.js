import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

// Konversi __filename dan __dirname ke ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5500;

// Set view engine ke EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware untuk file CSS
app.use("/css", (req, res, next) => {
  const cssFiles = [
    "bootstrap.css",
    "bootstrap.min.css",
    "bootstrap.rtl.css",
    "bootstrap.rtl.min.css",
    "bootstrap-grid.css",
    "bootstrap-grid.min.css",
    "bootstrap-grid.rtl.css",
    "bootstrap-grid.rtl.min.css",
    "bootstrap-reboot.css",
    "bootstrap-reboot.min.css",
    "bootstrap-reboot.rtl.css",
    "bootstrap-reboot.rtl.min.css",
    "bootstrap-utilities.css",
    "bootstrap-utilities.min.css",
    "bootstrap-utilities.rtl.css",
    "bootstrap-utilities.rtl.min.css",
    "style.css",
    "styleejsE.css",
  ];

  const requestedFile = req.url.split("/").pop();
  if (cssFiles.includes(requestedFile)) {
    const filePath = path.join(__dirname, "css", requestedFile);
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        return res.status(404).send("File not found");
      }
      res.sendFile(filePath);
    });
  } else {
    res.status(404).send("File not found");
  }
});

// Middleware untuk file JS
app.use("/js", (req, res, next) => {
  const jsFiles = [
    "bootstrap.bundle.js",
    "bootstrap.bundle.min.js",
    "bootstrap.esm.js",
    "bootstrap.esm.min.js",
    "bootstrap.min.js",
    "bootstrap.js",
    "main.js",
  ];

  const requestedFile = req.url.split("/").pop();
  if (jsFiles.includes(requestedFile)) {
    const filePath = path.join(__dirname, "js", requestedFile);
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        return res.status(404).send("File not found");
      }
      res.sendFile(filePath);
    });
  } else {
    res.status(404).send("File not found");
  }
});

// Middleware untuk file statis
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/pembelian", express.static(path.join(__dirname, "pembelian")));

// Route untuk halaman utama
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Rute untuk home.ejs ketika diakses di /home
app.get("/home", (req, res) => {
  res.render("home");
});

// Route untuk halaman pembelian
app.get("/pembelian.html", (req, res) => {
  res.sendFile(path.join(__dirname, "pembelian.html"));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));