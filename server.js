const express = require("express");
const path = require("path");
const app = express();
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const cors = require("cors");

const dbPath = path.join(__dirname, "./myData.db");
let db = null;
const PORT = process.env.PORT || 5000;

app.use(cors());

const initializeDbServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(PORT, () => {
      console.log("Server running at https://localhost:5000");
    });
  } catch (e) {
    console.log(`DB Error ${e.message}`);
    process.exit(1);
  }
};

initializeDbServer();

app.use(express.json());

app.get("/data", async (req, res) => {
  const query = "select * from Sample";
  const list = await db.all(query);
  res.send(list);
});

app.get("/data/ashok", async (req, res) => {
  const query = "select * from Sample where id = 1";
  const li = await db.all(query);
  res.send(li);
});

app.post("/posting/", async (request, res) => {
  const { name, pass } = request.body;
  const query = `INSERT INTO USER (name,pass)
  VALUES(
      "${name}","${pass}"
  )`;
  const Data = await db.run(query);
  res.send("success");
});

app.get("/user/data", async (req, res) => {
  const query = "select * from user";
  const data = await db.all(query);
  res.send(data);
});

console.log("running");

module.exports = app;
