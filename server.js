const express = require("express");
const app = express();
const port = process.env.PORT || 3000; 
const dotenv = require("dotenv").config();
const slug = require("slug");
const { MongoClient } = require ("mongodb");
const { ObjectId } = require ("mongodb");

app.listen(port, () => {
  console.log(`App listening on port ${port}`);

  connectDB().then(console.log("Database connection succes"));
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


/***********/
/* Routes */
/***********/
app.get("/", (req, res) => {
  res.render("index");
});


/* Toevoegen + POST naar database */
app.get("/add", (req, res) => {
  res.render("add");
});

app.post("/add", async (req, res) => {

  let car = {
    slug: slug(req.body.kenteken),
    kenteken: req.body.kenteken,
    merk: req.body.merk,
    type: req.body.type,
    kleur: req.body.kleur,
    locatie: req.body.locatie
  };

  await db.collection("cars").insertOne(car);

  const query = {};
  const cars = await db.collection("cars").find(query).toArray();
  res.render("profile", {cars});
});


/* Profiel pagina, zoeken naar database */
app.get("/profile", async (req, res) => {
  const cars = await db.collection("cars").find({},{}).toArray();

  const merk = (cars.length == 0) ? "no cars found" : "cars";
  res.render("profile", {cars});
});


/* Detail pagina */
app.get("/:carId/:slug", async (req, res) => {
  const query = {_id: ObjectId(req.params.carId)};
  const car = await db.collection("cars").findOne(query);

  res.render("cardetail", {car});
});


/* Database connection */
async function connectDB() {
  const uri = process.env.DB_URI;
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try { 
    await client.connect();
    db = client.db(process.env.DB_NAME);
  } catch (error) {
    throw error;
  }
}

