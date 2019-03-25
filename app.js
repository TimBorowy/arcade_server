var express = require('express')
var app = express()
const mongo = require('mongodb')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const router = require('./routes/MainRouter')(express)
const port = 8080


app.set('view engine', 'hbs')

app.use(bodyParser.json())    // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}))

app.use(express.static('public'))
app.use(express.static('games'))

// use routes defined in routes file
app.use('/', router)

app.listen(port, () => console.log(`Arcade server listening on port ${port}!`))