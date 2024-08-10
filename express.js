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

// -------------------------

// const express = require("express");
// const path = require("path");
// const fs = require("fs");
// const app = express();
// const PORT = 5500 ;

// // setting untuk memasukkan file ejs sementara ke halaman home.ejs
// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));

// app.use("/css", (req, res, next) => {
//   const cssFiles = [
//     "bootstrap.css",
//     "bootstrap.min.css",
//     "bootstrap.rtl.css",
//     "bootstrap.rtl.min.css",
//     "bootstrap-grid.css",
//     "bootstrap-grid.min.css",
//     "bootstrap-grid.rtl.css",
//     "bootstrap-grid.rtl.min.css",
//     "bootstrap-reboot.css",
//     "bootstrap-reboot.min.css",
//     "bootstrap-reboot.rtl.css",
//     "bootstrap-reboot.rtl.min.css",
//     "bootstrap-utilities.css",
//     "bootstrap-utilities.min.css",
//     "bootstrap-utilities.rtl.css",
//     "bootstrap-utilities.rtl.min.css",
//     "style.css",
//   ];

//   // Cek apakah file yang diminta ada di daftar
//   const requestedFile = req.url.split("/").pop();
//   if (cssFiles.includes(requestedFile)) {
//     const filePath = path.join(__dirname, "css", requestedFile);
//     fs.access(filePath, fs.constants.F_OK, (err) => {
//       if (err) {
//         return res.status(404).send("File not found");
//       }
//       res.sendFile(filePath);
//     });
//   } else {
//     res.status(404).send("File not found");
//   }
// });

// app.use("/js", (req, res, next) => {
//   const jsFiles = [
//     "bootstrap.bundle.js",
//     "bootstrap.bundle.min.js",
//     "bootstrap.esm.js",
//     "bootstrap.esm.min.js",
//     "bootstrap.min.js",
//     "bootstrap.js",
//     "main.js",
//   ];

//   const requestedFile = req.url.split("/").pop();
//   if (jsFiles.includes(requestedFile)) {
//     const filePath = path.join(__dirname, "js", requestedFile);
//     fs.access(filePath, fs.constants.F_OK, (err) => {
//       if (err) {
//         return res.status(404).send("File not found");
//       }
//       res.sendFile(filePath);
//     });
//   } else {
//     res.status(404).send("File not found");
//   }
// });

// app.use("/images", express.static(path.join(__dirname, "images")));

// app.use("/pembelian", express.static(path.join(__dirname, "pembelian")));

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "index.html"));
// });

// // ruting ke homedir.ejs ketika di masukkan /home
// app.get("/home", (req, res) => {
//   res.render("home.ejs");
// });

// app.get("/pembelian", (req, res) => {
//   res.sendFile(path.join(__dirname, "pembelian.html"));
// });

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// ----------------------------------------

// ---------------------------- //
// ARSIP BUAT KODINGAN //
// Middleware untuk menangani permintaan ke folder CSS tanpa menyebutkan nama file ( masih ada bug sepertinya)
// app.use("/css", (req, res, next) => {
//   const cssPath = [
//     path.join(__dirname, "css", "bootstrap.css", );
//     path.join(__dirname, "css", "style.css" );
//     path.join(__dirname, "css", "bootstrap.min.css");
//     path.join(__dirname, "css", "bootstrap.rtl.css");
//     path.join(__dirname, "css", "bootstrap.rtl.min.css");
//     path.join(__dirname, "css", "bootstrap-grid.css");
//     path.join(__dirname, "css", "bootstrap-grid.min.css");
//     path.join(__dirname, "css", "bootstrap-grid.rtl.css");
//     path.join(__dirname, "css", "bootstrap-grid.rtl.min.css");
//     path.join(__dirname, "css", "bootstrap-reboot.css");
//     path.join(__dirname, "css", "bootstrap-reboot.min.css");
//     path.join(__dirname, "css", "bootstrap-reboot.rtl.css");
//     path.join(__dirname, "css", "bootstrap-reboot.rtl.min.css");
//     path.join(__dirname, "css", "bootstrap-utilities.css");
//     path.join(__dirname, "css", "bootstrap-utilities.min.css");
//     path.join(__dirname, "css", "bootstrap-utilities.rtl.css");
//     path.join(__dirname, "css", "bootstrap-utilities.rtl.min.css");

//   ];

// app.use('/css', express.static(path.join(__dirname, 'css')));

//   fs.readFile(cssPath, (err, data) => {
//     if (err) {
//       res.status(404).send("CSS file tidak ada");
//     } else {
//       res.set("Content-Type", "text/css");
//       res.send(data);
//     }
//   });

// ----------------- //
// app.use("/js", express.static(path.join(__dirname, "js")));

// // Routing untuk jalankan ke halaman utama

// // Middleware untuk menggabungkan file CSS
// app.use("/css/", (req, res) => {
//   const cssFiles = [
//     path.join(__dirname, "css", "bootstrap.css"),
//   path.join(__dirname, "css", "style.css"),
//   path.join(__dirname, "css", "bootstrap.min.css")
//   path.join(__dirname, "css", "bootstrap.rtl.css")
//   path.join(__dirname, "css", "bootstrap.rtl.min.css")
//   path.join(__dirname, "css", "bootstrap-grid.css")
//   path.join(__dirname, "css", "bootstrap-grid.min.css")
//   path.join(__dirname, "css", "bootstrap-grid.rtl.css")
//   path.join(__dirname, "css", "bootstrap-grid.rtl.min.css")
//   path.join(__dirname, "css", "bootstrap-reboot.css")
//   path.join(__dirname, "css", "bootstrap-reboot.min.css")
//   path.join(__dirname, "css", "bootstrap-reboot.rtl.css")
//   path.join(__dirname, "css", "bootstrap-reboot.rtl.min.css")
//   path.join(__dirname, "css", "bootstrap-utilities.css")
//   path.join(__dirname, "css", "bootstrap-utilities.min.css")
//   path.join(__dirname, "css", "bootstrap-utilities.rtl.css")
//   path.join(__dirname, "css", "bootstrap-utilities.rtl.min.css")
// ];

//   Promise.all(cssFiles.map(file => fs.promises.readFile(file)))
//     .then(data => {

//       const combinedCss = data.join("\n");

//       res.set("Content-Type", "text/css");
//       res.send(combinedCss);
//     })
//     .catch(err => {

//       res.status(500).send("Error membaca CSS files");
//     });
// });

// // Set folder static untuk JavaScript dan file lain
