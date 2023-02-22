const userService = require("./services/user.service");

const express = require("express")
const expressSession = require('express-session')

const cors = require('cors')
const path = require('path')

const app = express()
const port = 3030

// app.use(express.static("public")) 
const session = expressSession({
  secret: 'coding is amazing',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
})
app.use(express.json())
app.use(session)
// app.use(cors())

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, 'public')))
} else {
  const corsOptions = {
    origin: ['http://127.0.0.1:3000', 'http://localhost:3000'],
    header: ('Access-Control-Allow-Origin', '*'),
    credentials: true,
  }
  app.use(cors(corsOptions))
}

app.get("/api/user", (req, res) => {
  console.log('user is herherherherher');
  userService.getUser(req.query.user, req.query.actionType)
    .then((user) => {
      console.log('server:', user);
      res.send(user)
    })
})

app.put("/api/user", (req, res) => {
  userService.addFavToUser(req.body.user, req.body.food)
    .then((user) => {
      res.send(user)
    })
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
})


