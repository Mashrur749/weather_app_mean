const express = require("express");
const cors = require("cors");
const userService = require("./user-service.js");
const app = express();
const bodyParser = require('body-parser');

var jwt = require('jsonwebtoken');

var passport = require("passport");
var passportJWT = require("passport-jwt");

var token = jwt.sign({ userName: 'mashrur' }, 'secret');

// JSON Web Token Setup
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

// Configure its options
var jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");

jwtOptions.secretOrKey = '&0y7$noP#5rt99&GB%Pz7j2b1vkzaB0RKs%^N^0zOP89NT04mPuaM!&G8cbNZOtH';

var strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
    console.log('payload received', jwt_payload);

    if (jwt_payload) {
        // The following will ensure that all routes using 
        // passport.authenticate have a req.user._id, req.user.userName, req.user.fullName & req.user.role values 
        // that matches the request payload data
        next(null, { 
            _id: jwt_payload._id, 
            userName: jwt_payload.userName,
            cityId: jwt_payload.cityId 
        }); 
    } else {
        next(null, false);
    }
});


// tell passport to use our "strategy"
passport.use(strategy);

// add passport as application-level middleware
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

            var payload = { 
                _id: user._id,
                userName: user.userName,
                cityId: user.cityId
            };
            
            var token = jwt.sign(payload, jwtOptions.secretOrKey);

            res.json({ 
                "message": "login successful",
                token: token 
            });

        }).catch((msg) => {
            res.status(422).json({ "message": msg });
        });
});

app.put("/user/:id", (req, res) => {
    

    userService.updateUserById(req.params.id, req.body.cityId)
        .then((user) => {
            res.json({ "message": "User city updated" });
        }).catch((msg) => {
            res.status(422).json({ "message": msg });
        });
});

app.get("/dashboard", passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({"success": true})
})


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