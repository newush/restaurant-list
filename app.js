const express = require('express')
const session = require('express-session')
const usePassport = require('./config/passport')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const hbsHelpers = require('./helpers/handlebars')
const methodOverride = require('method-override')
const routes = require('./routes')
require('./config/mongoose')

app.set('view engine', 'handlebars')

app.use(session({
  secret: 'MySecret',
  resave: false,
  saveUninitialized: true
}))
app.engine('handlebars', exphbs({ defaultLayout: 'main', helpers: hbsHelpers }))

app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: true }))

app.use(methodOverride('_method'))
usePassport(app)
app.use(routes)

app.listen(port, () => {
  console.log(`express is listening on localhost:${port}`)
})
