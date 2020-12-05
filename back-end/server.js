const express = require("express");
const cors = require("cors");
const dataService = require("./data-service.js");
const userService = require("./user-service.js");
const app = express();
const bodyParser = require('body-parser');

var jwt = require('jsonwebtoken');)
var token = jwt.sign({ userName: 'mashrur' }, 'secret');
var passport = require("passport");) 


app.use(passport.initialize());

app.use(cors());

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.json());

const HTTP_PORT = process.env.PORT || 8080;


app.post("/user/register", (req, res) => {
    userService.registerUser(req.body)
        .then((msg) => {
            res.json({ "message": msg });
        }).catch((msg) => {
            res.status(422).json({ "message": msg });
        });
});

app.post("/user/login", (req, res) => {
    userService.checkUser(req.body)
        .then((user) => {
            res.json({ "message": "login successful" });
        }).catch((msg) => {
            res.status(422).json({ "message": msg });
        });
});

app.put("/user/:id", (req, res) => {
    userService.updateUserById(req.body)
        .then((user) => {
            res.json({ "message": "User city updated" });
        }).catch((msg) => {
            res.status(422).json({ "message": msg });
        });
});



app.use((req, res) => {
    res.status(404).end();
});

userService.connect().then(()=>{
    app.listen(HTTP_PORT, ()=>{console.log("API listening on: " + HTTP_PORT)});
})
.catch((err)=>{
    console.log("unable to start the server: " + err);
    process.exit();
});