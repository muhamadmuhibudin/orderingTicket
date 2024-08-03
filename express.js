const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const PORT = 5500;

// // Middleware untuk menangani permintaan ke folder CSS tanpa menyebutkan nama file ( masih ada bug sepertinya)
app.use("/css", (req, res, next) => {
  const cssPath = path.join(__dirname, "css", "bootstrap.css");
  fs.readFile(cssPath, (err, data) => {
    if (err) {
      res.status(404).send("CSS file not found");
    } else {
      res.set("Content-Type", "text/css");
      res.send(data);
    }
  });
});

// ----------------- //

// // Middleware untuk menggabungkan file CSS
// app.use("/css/", (req, res) => {
//   const cssFiles = [
//     path.join(__dirname, "css", "style.css"),
//     path.join(__dirname, "css", "bootstrap.css"),
//     path.join(__dirname, "css", "bootstrap.min.css")
//     path.join(__dirname, "css", "bootstrap.rtl.css")
//     path.join(__dirname, "css", "bootstrap.rtl.min.css")
//     path.join(__dirname, "css", "bootstrap-grid.css")
//     path.join(__dirname, "css", "bootstrap-grid.min.css")
//     path.join(__dirname, "css", "bootstrap-grid.rtl.css")
//     path.join(__dirname, "css", "bootstrap-grid.rtl.min.css")
//     path.join(__dirname, "css", "bootstrap-reboot.css")
//     path.join(__dirname, "css", "bootstrap-reboot.min.css")
//     path.join(__dirname, "css", "bootstrap-reboot.rtl.css")
//     path.join(__dirname, "css", "bootstrap-reboot.rtl.min.css")
//     path.join(__dirname, "css", "bootstrap-utilities.css")
//     path.join(__dirname, "css", "bootstrap-utilities.min.css")
//     path.join(__dirname, "css", "bootstrap-utilities.rtl.css")
//     path.join(__dirname, "css", "bootstrap-utilities.rtl.min.css")
//   ];

 
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
app.use("/js", express.static(path.join(__dirname, "js")));

// // Routing untuk jalankan ke halaman utama
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

