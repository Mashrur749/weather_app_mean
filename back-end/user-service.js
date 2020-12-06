const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

let mongoDBConnectionString = "mongodb+srv://mashrur:asdasd@userdb.wiwmq.mongodb.net/user?retryWrites=true&w=majority";

let Schema = mongoose.Schema;

let userSchema = new Schema({
    userName: {
        type: String,
        unique: true
    },
    password: String,
    cityId: Number
});

let User;

module.exports.connect = function () {
    return new Promise(function (resolve, reject) {
        let db = mongoose.createConnection(mongoDBConnectionString);

        db.on('error', (err) => {
            reject(err); // reject the promise with the provided error
        });

        db.once('open', () => {
            User = db.model("users", userSchema);
            resolve();
        });
    });
};

module.exports.registerUser =  function (userData) {
    return new Promise(function (resolve, reject) {

        if (userData.password != userData.password2) {
            reject("Passwords do not match");
        } else {
            bcrypt.hash(userData.password, 10).then(hash=>{ // Hash the password using a Salt that was generated using 10 rounds
                
                userData.password = hash;

                let newUser = new User(userData);
                newUser.cityId = 26;
                                
                newUser.save((err) => {
                    if (err) {
                        if (err.code == 11000) {
                            reject("User Name already taken");
                        } else {
                            reject("There was an error creating the user: " + err);
                        }

                    } else {
                        resolve("User " + userData.userName + " successfully registered");
                    }
                });
            })
            .catch(err=>{ reject(err)});
        }
    });      
};


module.exports.updateUserById = function(userId, cityId){
    return new Promise(function (resolve, reject) {
        User.findOneAndUpdate({_id: userId}, {cityId: cityId}, (err, user) => {
            if(err){
                console.log(err)
                reject(err);
            }

            resolve(user);
        })
    });
}


module.exports.checkUser = function (userData) {
    return new Promise(function (resolve, reject) {

        User.find({ userName: userData.userName })
        .limit(1)
        .exec()
        .then((users) => {

            if (users.length == 0) {
                reject("Unable to find user " + userData.userName);
            } else {
                bcrypt.compare(userData.password, users[0].password).then((res) => {
                    if (res === true) {
                        resolve(users[0]);
                    } else {
                        reject("Incorrect password for user " + userData.userName);
                    }
                });
            }
        }).catch((err) => {
            reject("Unable to find user " + userData.userName);
        });
    });
};