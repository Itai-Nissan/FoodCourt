const userService = require("./api/user/user.service");

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

// routes
const authRoutes = require('./api/auth/auth.routes')

app.use('/api/auth', authRoutes)

app.put("/api/user", (req, res) => {
  userService.addFavToUser(req.body.user, req.body.food)
    .then((user) => {
      res.send(user)
    })
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
})


