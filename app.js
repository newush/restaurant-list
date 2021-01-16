const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const hbsHelpers = require('./helpers/handlebars')
const methodOverride = require('method-override')
const routes = require('./routes')
require('./config/mongoose')

app.set('view engine', 'handlebars')

app.engine('handlebars', exphbs({ defaultLayout: 'main', helpers: hbsHelpers }))

app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: true }))

app.use(methodOverride('_method'))
app.use(routes)

app.listen(port, () => {
  console.log(`express is listening on localhost:${port}`)
})