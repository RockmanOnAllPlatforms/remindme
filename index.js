const fs = require("fs")
const express = require('express')
const app = express()
const port = 3000
const cron = require('node-cron')
const path = require('path')
const nodemailer = require('nodemailer')
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false})


app.set('view engine', 'ejs')

app.use('/static', express.static(path.join(__dirname, 'static')))

let mailOptions = {
    from: '<johobb24@gmail.com>',
    to: '<johobb24@gmail.com>',
    subject: 'Daily Reminder',
    text: 'test'
}

app.get('/', (req, res) => {
    res.render('index', {})
})


app.post('/', jsonParser,(req, res) => {
    let content = req.body.reminder
    if (content === "") {
        res.status(400)
    }
    var data = require('./data.json')

    


    console.log(len + 1, content)
    res.status(200).json("Successful request!")
})

app.delete('/', (req, res) => {
    let id = req.body.id
})

//send at 6AM everyday
cron.schedule('0 6 * * *', () =>
    console.log("test")
);

app.listen(port, () => {
  console.log(`Listening port on ${port}`)
})
