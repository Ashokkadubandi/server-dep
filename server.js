const express = require("express");
const path = require("path");
const app = express();
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");

const dbPath = path.join(__dirname, "./myData.db");
let db = null;
const PORT = process.env.PORT || 5000;

// const initializeDbServer = async () => {
//   try {
//     db = await open({
//       filename: dbPath,
//       driver: sqlite3.Database,
//     });
//     app.listen(PORT, () => {
//       console.log("Server running at https://localhost:5000");
//     });
//   } catch (e) {
//     console.log(`DB Error ${e.message}`);
//     process.exit(1);
//   }
// };

// initializeDbServer();

app.get("/", async (req, res) => {
  res.send("Hello it is working");
});

console.log("running");

module.exports = app;
