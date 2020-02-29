//jshint esversion:6
//jshint esversion:6
const { updatePrompt } = require('./sessions/prompts/update-prompt')

const {
  answerPrompt,
} = require('./sessions/prompts/answer-prompt')
const {
  apiWrapper,
} = require('./api-wrapper')

const express = require('express')
const http = require('http')
const {
  Session,
  User,
  mongoose,
  Chat,
} = require('./models/index')
const app = express()
const server = http.createServer(app)
const bodyParser = require('body-parser')
const ejs = require('ejs')

//const functions = require(__dirname + "/functions.js");

const cors = require('cors')
const basicAuth = require('express-basic-auth')
const io = require('socket.io')(server, {
  handlePreflightRequest: (req, res) => {
    console.log('here!')
    const headers = {
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Origin': req.headers.origin, //or the specific origin you want to give access to,
      'Access-Control-Allow-Credentials': true,
    }
    res.writeHead(200, headers)
    res.end()
  },
})

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200')
  res.header('Access-Control-Allow-Credentials', true)
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json,Authorization',
  )
  next()
})

const myAsyncAuthorizer = (username, password, cb) => {
  try {
    const user = User.findOne({
      email: username,
    })
      .then(user => {
        if (user && user.password == password) {
          return cb(null, true)
        }
        return cb(null, false)
      })
      .catch(e => {
        throw e
      })
  } catch (e) {
    return cb(null, false)
  }
}

//Email advisers API. WIll send when admin activate the session
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
)
app.use(cors())
app.use(bodyParser.json())

//connect to mongoDb locally
/*
mongoose.connect("mongodb://localhost:27017/userDb", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
*/

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

app.post('/register', function (req, res) {
  const {
    email,
    password,
    department,
    title,
    firstName,
    lastName,
    permissionLevel = 'UNAPPROVED',
  } = req.body
  const newUser = new User({
    email,
    password,
    department,
    title,
    firstName,
    lastName,
    permissionLevel,
  })
  console.log('GOT HERE')
  newUser.save(function (err) {
    if (err) {
      console.log({
        err,
      })
      res.send(500, err)
    } else {
      console.log('SAVED!')
      res.json(req.body)
    }
  })
})

app.post('/login', function (req, res) {
  const username = req.body.username
  const password = req.body.password

  User.findOne({
    email: username,
  }, function (err, foundUser) {
    if (err) {
      console.log(err)
    } else {
      console.log({
        foundUser,
      })
      if (foundUser && foundUser.password == password) {
        console.log({
          foundUser,
        })
        return res.json(foundUser)
        // Session.find({},function(err, foundSessions){
        //     console.log(foundSessions);
        //     res.render("sessionList", {sessions: foundSessions});
        // })
      } else {
        res.status(401).send()
      }
    }
  })
})

app.use(
  basicAuth({
    authorizer: myAsyncAuthorizer,
    authorizeAsync: true,
  }),
)

app.put('/users/:userId', function (req, res) {
  const {
    password,
    department,
    title,
    firstName,
    lastName,
    permissionLevel = 'UNAPPROVED',
  } = req.body

  console.log(req.params)
  const {
    userId,
  } = req.params

  console.log('GOT HERE')
  console.log({
    userId,
    body: req.body,
  })
  User.findOneAndUpdate({
    email: userId,
  }, req.body, function (err, doc) {
    if (err) {
      return res.send(500, {
        error: err,
      })
    }
    console.log({
      doc,
    })
    return res.json(doc)
  })
})

app.get('/users', async function (req, res) {
  console.log('GETTING USERS!')
  const users = await User.find()
  console.log({
    users,
  })
  res.json(users)
})

app.get('/users/:userId', async function (req, res) {
  console.log('GETTING USERS!')
  const users = await User.find({
    email: req.params.userId,
  })
  console.log({
    users,
  })
  const [user] = users
  res.json(user)
})

app.post('/sessions', async function (req, res) {
  //Creates a session
  const {
    topic,
    creatorFirstName,
    creatorId,
    departmentFilter,
    assignedUserIds,
    prompts,
    isActive = false,
  } = req.body
  console.log(req.body)

  const session = {
    topic,
    creatorFirstName,
    creator: creatorId,
    departmentFilter,
    assignedUsers: assignedUserIds,
    prompts,
    isActive,
  }

  const sessionResponse = await Session.create(session)
  console.log('EMITTING!')
  io.emit('sessionAdded', sessionResponse)
  res.json(sessionResponse)
})

app.post('/sessions/:sessionId/prompts/:promptId/answer-prompt', async function (
  req,
  res,
) {
  //Answers a prompt
  const {
    response,
  } = req.body
  const {
    user: username,
  } = req.auth
  const {
    sessionId,
    promptId,
  } = req.params
  return apiWrapper(answerPrompt, req, res, {
    response,
    username,
    sessionId,
    promptId,
    io,
  })
})

app.put('/sessions/:sessionId/prompts/:promptId', async function (
  req,
  res,
) {
  //Answers a prompt
  const {
    displayIndex,
  } = req.body
  const {
    user: username,
  } = req.auth
  const {
    sessionId,
    promptId,
  } = req.params
  return apiWrapper(updatePrompt, req, res, {
    displayIndex,
    username,
    sessionId,
    promptId,
    io,
  })
})

app.put('/sessions/:sessionId', async function (req, res) {
  console.log(req.body)
  //updates a session - must always send the full prompt array
  if (req.body.isActive == true) {
    const sessionResponse = await Session.update({
        _id: req.params.sessionId,
      }, {
        $set: {
          isActive: true,
        },
      },
      function (err) {
        if (err) {
          throw err
        } else {
          console.log(' document(s) updated')

        }
      },
    )
    console.log({
      sessionResponse,
    })
    io.emit('sessionChanged', sessionResponse)
    res.json(sessionResponse)
    console.log(req.body)
    console.log(req.params)

    //send emails
    const assignedUserIds = req.body.assignedUserIds

    for (n = 0; n < assignedUserIds.length; n++) {
      User.findById(assignedUserIds[n], function (err, res) {
        if (err) {
          throw err
        } else {
          const msg = {
            to: res.email,
            from: 'brotherhui521@gmail.com',
            subject: '<AdviseMe Project> Advising Session is active now',
            text: 'Welcome!',
            html: '<strong>Welcome!</strong><p>Please join the session by clicking this <a href="http://localhost:4200/sessions/' + req.params.sessionId + '">Link</a></p>',
          }
          sgMail.send(msg, (error, result) => {
            if (error) {
              console.log(error)
            } else {
              console.log('success')
            }
          })

        }
      })
    }
  } else {
    const {
      departmentFilter,
      assignedUserIds,
      prompts,
      isActive = false,
    } = req.body

    const session = {
      departmentFilter,
      assignedUsers: assignedUserIds,
      prompts,
      isActive,

    }

    const sessionResponse = await Session.findByIdAndUpdate(
      req.params.sessionId, {
        $set: session,
      },
    )

    io.emit('sessionChanged', sessionResponse)
    res.json(sessionResponse)
    console.log(req.body)
    console.log(req.params)
  }

})

app.get('/sessions/:sessionId', async function (req, res) {
  //updates a session - must always send the full prompt array

  try {
    const sessionResponse = await Session.findById(req.params.sessionId).populate({
      path: 'assignedUsers',
    })
    console.log({
      sessionResponse,
    })
    res.json(sessionResponse)
  } catch (e) {
    console.log({
      e,
    })
    if (e instanceof mongoose.CastError) {
      res.status(500).json({
        error: 'NOT_FOUND',
      })
    } else {
      res.status(500).send()
    }
  }
})

app.get('/sessions', async function (req, res) {
  // ?userIds=5e3f3da4707e50100544424f,
  //updates a session - must always send the full prompt array

  const {
    userIds = '',
  } = req.query
  const userIdsArray = userIds.split(',')

  const filters = {}
  if (userIdsArray !== []) {
    filters.assignedUsers = {
      $in: userIdsArray,
    }
  }

  const sessionResponse = await Session.find(filters)
  res.json(sessionResponse)
})

app.get('/chats', async function (req, res) {

  const {
    user: username,
  } = req.auth

  const user = await User.findOne({ email: username })

  const chats = await Chat.find({
    users: {
      $in: user._id,
    },
  }).populate({
    path: 'users',
  })

  console.log({chats, user})
  res.json(chats)
})

io.on('connection', function (socket) {
  console.log('connected!')
  socket.on('chatMessage', function (msg) {
    console.log('message: ' + msg)
    io.emit('chatMessage', msg)
  })
  socket.on('privateMessage', async function (msg) {
    console.log({msg})
    const chat = await Chat.findById(msg.chatId)
    chat.messages.push(msg.message)
    chat.save()
    console.log('emitting!')
    io.emit('privateMessage', msg)
  })
  socket.on('startPrivateMessage', function (msg) {
    console.log('message: ' + msg)
    console.log({msg: msg.message.messages})
    const chat = new Chat(msg.message)
    chat.save()
    io.emit('startPrivateMessage', msg)
  })
})

server.listen(3000)