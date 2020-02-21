const mongoose = require("mongoose");
const encryption = require('mongoose-encryption')

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

//Response will either be free response, or index of the multiple choice item
const userAnswerSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  response: String
});

const promptSchema = new mongoose.Schema({
  label: String,
  type: { type: String, enum: ["OPEN", "MULTIPLE_CHOICE"] },
  possibleAnswers: [String],
  displayIndex: Number,
  answers: [userAnswerSchema]
});

const sessionSchema = new mongoose.Schema({
  topic: String,
  isActive: Boolean,
  creatorFirstName: String,
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  departmentFilter: String,
  assignedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  prompts: [promptSchema]
});

const Session = new mongoose.model("Session", sessionSchema);

module.exports = { Session, User, mongoose };
