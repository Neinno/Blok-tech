const express = require('express')
const app = express()
const port = 3000

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


/* Middleware */
app.use(express.static('public'));
app.set('view engine', 'pug');

/* Routes */
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/index', (req, res) => {
  res.render('index')
})