const express = require('express')
const app = express()
const port = 3000

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


/* Middleware */
app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({extended: true}))

/* Handlebars */
const { engine } = require("express-handlebars");
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");


/* Routes */
app.get('/', (req, res) => {
  res.render('index')
})

app.get('/add', (req, res) => {
  res.render('add', {data: data});
})

app.post('/add', (req, res) => {
  console.log(req.body);

  data.push({
    merk: req.body.merk,
    type: req.body.type,
    kleur: req.body.kleur
  })

  res.render('add', { data: data });
})

const data = [
  {
    merk: 'audi',
    type: 'a4',
    kleur: 'zwart'
  }
];