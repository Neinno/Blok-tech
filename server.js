const express = require("express");
const app = express();
const port = process.env.PORT || 3000; 
const dotenv = require("dotenv").config();
const { MongoClient } = require ("mongodb");
const { ObjectId } = require ("mongodb");

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});


/* Middleware */
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));


/* Handlebars */
const { engine } = require("express-handlebars");
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");


/* Routes */
app.get("/", async (req, res) => {
  res.render("index");
});

app.get("/add", (req, res) => {
  res.render("add", {data: data});
});

app.get("/profile", (req, res) => {
  res.render("profile");
});

// app.get("/match", (req, res) => {
//   const cars = await db.collection("cars").find({},{}).toArray();
//   const merk = (cars.length == 0) ?"no cars found" : "cars";

//   res.render("cars", {merk});
// });

app.post("/add", (req, res) => {
  console.log(req.body);

  data.push({
    merk: req.body.merk,
    type: req.body.type,
    kleur: req.body.kleur
  });

  res.render("add", { data: data });
});

const data = [
  {
    merk: "audi",
    type: "a4",
    kleur: "zwart"
  }
];

async function connectDB() {
  const uri = process.env.DB_URI;
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const cars = database.collection("cars");
  try { 
    await client.connect();
    db = client.db(process.env.DB_NAME);
  } catch (error) {
    throw error;
  }
}

