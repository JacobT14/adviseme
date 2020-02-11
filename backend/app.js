//jshint esversion:6
//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
//const functions = require(__dirname + "/functions.js");
const encryption = require("mongoose-encryption");
const cors = require("cors");

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(cors());
app.use(bodyParser.json());

//connect to mongoDb locally
/*
mongoose.connect("mongodb://localhost:27017/userDb", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
*/

/* database served on Atlas*/
mongoose.connect(
  "mongodb+srv://kevin:kevin123@cluster0-oecwm.mongodb.net/userDb",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

/*  userDb        Database    ---------------------------------------------------------------------------*/
const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true, dropDups: true },
  password: String,
  firstName: String,
  lastName: String,
  title: String,
  department: String,
  permissionLevel: String
});

//const secret="Thisisourlittlesecret.";
//need a encryption method. Haven't set up yet.Use Jacob's authentication
//userSchema.plugin(encryption,{secret: secret, encryptedFields: ["password"]});
const User = new mongoose.model("User", userSchema);
//---------------------------------------------------------------------------------------------------------

/*  userDb Database    Collection: sessions -------------------------------------------------------------------------*/
//will create method to POST for admin later when building the admin side. Now only for testing purpose

const promptSchema = new mongoose.Schema({
  label: String,
  type: { type: String, enum: ["OPEN", "MULTIPLE_CHOICE"] },
  possibleAnswers: [String],
  isDisplayed: Boolean
});

const sessionSchema = new mongoose.Schema({
  topic: String,
  creatorFirstName: String,
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  departmentFilter: String,
  assignedUsers: { type: [mongoose.Schema.Types.ObjectId], ref: "User" },
  prompts: [promptSchema]
});

const Session = new mongoose.model("Session", sessionSchema);

// app.get("/",function(req,res){
//     res.render("home");
// })
// app.get("/register", function(req, res){
//     res.render("register");
// })
// app.get("/login", function(req, res){
//     res.render("login");
// })
// app.get("/logout", function(req,res){
//     res.render("login");
// })
// app.get("/sessionStartingPage", function(req,res){
//     res.render("sessionStartingPage");
// })

app.post("/register", function(req, res) {
  const {
    email,
    password,
    department,
    title,
    firstName,
    lastName,
    permissionLevel = "UNAPPROVED"
  } = req.body;
  const newUser = new User({
    email,
    password,
    department,
    title,
    firstName,
    lastName,
    permissionLevel
  });
  console.log("GOT HERE");
  newUser.save(function(err) {
    if (err) {
      console.log({ err });
      res.send(500, err);
    } else {
      console.log("SAVED!");
      res.json(req.body);
    }
  });
});

app.put("/users/:userId", function(req, res) {
  const {
    password,
    department,
    title,
    firstName,
    lastName,
    permissionLevel = "UNAPPROVED"
  } = req.body;

  console.log(req.params);
  const { userId } = req.params;

  console.log("GOT HERE");
  console.log({ userId, body: req.body });
  User.findOneAndUpdate({ email: userId }, req.body, function(err, doc) {
    if (err) return res.send(500, { error: err });
    console.log({ doc });
    return res.json(doc);
  });
});

app.get("/users", async function(req, res) {
  console.log("GETTING USERS!");
  const users = await User.find();
  console.log({ users });
  res.json(users);
});

app.get("/users/:userId", async function(req, res) {
  console.log("GETTING USERS!");
  const users = await User.find({ email: req.params.userId });
  console.log({ users });
  const [user] = users;
  res.json(user);
});

app.post("/login", function(req, res) {
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ email: username }, function(err, foundUser) {
    if (err) {
      console.log(err);
    } else {
      console.log({ foundUser });
      if (foundUser && foundUser.password == password) {
        console.log({ foundUser });
        return res.json(foundUser);
        // Session.find({},function(err, foundSessions){
        //     console.log(foundSessions);
        //     res.render("sessionList", {sessions: foundSessions});
        // })
      } else {
        res.status(401).send();
      }
    }
  });
});

app.post("/sessions", async function(req, res) {
  //Creates a session
  const {
    topic,
    creatorFirstName,
    creatorId,
    departmentFilter,
    assignedUserIds,
    prompts
  } = req.body;

  const session = {
    topic,
    creatorFirstName,
    creator: creatorId,
    departmentFilter,
    assignedUsers: assignedUserIds,
    prompts
  };

  const sessionResponse = await Session.create(session);
  res.json(sessionResponse);
});

app.put("/sessions/:sessionId", async function(req, res) {
  //updates a session - must always send the full prompt array
  const { departmentFilter, assignedUserIds, prompts } = req.body;

  const session = {
    departmentFilter,
    assignedUsers: assignedUserIds,
    prompts
  };

  const sessionResponse = await Session.findByIdAndUpdate(
    req.params.sessionId,
    {
      $set: session
    }
  );
  res.json(sessionResponse);
});

app.get("/sessions/:sessionId", async function(req, res) {
  //updates a session - must always send the full prompt array

  const sessionResponse = await Session.findById(req.params.sessionId);
  res.json(sessionResponse);
});

app.get("/sessions", async function(req, res) {
  // ?userIds=5e3f3da4707e50100544424f,
  //updates a session - must always send the full prompt array

  const { userIds = "" } = req.query;
  const userIdsArray = userIds.split(",");

  const filters = {};
  if (userIdsArray !== []) {
    filters.assignedUsers = { $in: userIdsArray };
  }

  const sessionResponse = await Session.find(filters);
  res.json(sessionResponse);
});

app.listen(3000, function() {
  console.log("Listen on PORT 3000");
});
