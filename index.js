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

function findDuplicate(copy){
    fs.readFile('data.json', 'utf8', function readFileCallback(err, data){
        if (err){
            console.log(err);
        } else {
            let obj = JSON.parse(data)
            let allObjects = Object.values(obj.lore)

            for (let i = 0; i < allObjects.length; i++){
                if (allObjects[i] === copy) {
                    return true
                }
            }

            return false

        }
    })
}

app.post('/', jsonParser,(req, res) => {
    let content = req.body.reminder
    if (content === "" || findDuplicate(content)) {
        res.status(400)
    }

    fs.readFile('data.json', 'utf8', function readFileCallback(err, data){
        if (err){
            console.log(err);
        } else {
            var dataObj = JSON.parse(data);
            let id = Object.keys(dataObj.lore).length + 1

            dataObj.lore.push({[id]: {txt: content}})
            dataObj = JSON.stringify(dataObj)

            fs.writeFile('data.json', dataObj, 'utf8', function errorCheck(err){
                if (err) {
                    console.log(err)
                } 
            });

        }
    });


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
