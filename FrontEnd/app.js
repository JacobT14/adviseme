//jshint esversion:6
//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
//const functions = require(__dirname + "/functions.js");
const encryption=require("mongoose-encryption");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

//connect to mongoDb locally
/*
mongoose.connect("mongodb://localhost:27017/userDb", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
*/

/* database served on Atlas*/
mongoose.connect("mongodb+srv://kevin:kevin123@cluster0-oecwm.mongodb.net/userDb", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


/*  userDb        Database    ---------------------------------------------------------------------------*/
const userSchema=new mongoose.Schema({
    email: String,
    password: String,
    firstName: String,
    lastName: String,
    title: String,
    department: String
});

//const secret="Thisisourlittlesecret.";
//need a encryption method. Haven't set up yet.Use Jacob's authentication
//userSchema.plugin(encryption,{secret: secret, encryptedFields: ["password"]});
const User=new mongoose.model("User",userSchema);
//---------------------------------------------------------------------------------------------------------

/*  userDb Database    Collection: sessions -------------------------------------------------------------------------*/
//will create method to POST for admin later when building the admin side. Now only for testing purpose

const sessionSchema=new mongoose.Schema({
    topic: String,
    creatorFirstName: String,
    creatorEmail: String,
    departmentFilter: String,
});
const Session=new mongoose.model("Session",sessionSchema);


app.get("/",function(req,res){
    res.render("home");
})
app.get("/register", function(req, res){
    res.render("register");
})
app.get("/login", function(req, res){
    res.render("login");
})
app.get("/logout", function(req,res){
    res.render("login");
})
app.get("/sessionStartingPage", function(req,res){
    res.render("sessionStartingPage");
})


app.post("/register", function(req,res){
    const newUser=new User({
        email: req.body.username,
        password: req.body.password
    });
    newUser.save(function(err){
        if(err){
            res.send(err);
        }else{
            res.redirect("/login");
        }
    })
})

app.post("/login",function(req,res){
    const username=req.body.username;
    const password=req.body.password;

    User.findOne({email: username},function(err, foundUser){
        if(err){
            console.log(err);
        }else{
            if (foundUser.password==password){
                Session.find({},function(err, foundSessions){
                    console.log(foundSessions);
                    res.render("sessionList", {sessions: foundSessions});
                })
            }
            else{
                res.redirect("/login");
            }
        }
    })
})


app.listen(3000, function(){
    console.log("Listen on PORT 3000");
})