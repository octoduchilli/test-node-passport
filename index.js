const express = require('express')
const passport = require('passport')
const session = require('express-session')
const app = express()
const bodyParser = require('body-parser')
const port = 3001
// const JwtStrategy = require('passport-jwt').Strategy
// const ExtractJwt = require('passport-jwt').ExtractJwt
// const opts = {}
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
// opts.secretOrKey = 'secret'
// opts.issuer = 'accounts.examplesoft.com'
// opts.audience = 'localhost:3000'
const user = {
  id: 1,
  name: 'mdr'
}

const LocalStrategy = require('passport-local').Strategy

// passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
//   done(null, user)
// }))

passport.use('local', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  session: false
}, (username, password, done) => {
  console.log(username)
  console.log(password)
  done(null, user)
}))

app.use(session({
  secret: 'r8q,+&1LM3)CD*zAGpx1xm{NeQhc;#',
  resave: false,
  saveUninitialized: true,
  cookie: { 
    maxAge: 10000000,
    secure: true
  }
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(bodyParser.urlencoded({ extended: false }))

passport.serializeUser(function (user, done) {
  done(null, user.id)
})

passport.deserializeUser(function (id, done) {
  done(null, user)
})

app.post('/login', passport.authenticate('local'), (req, res) => {
  res.send(req.user)
})

app.get('/mdr', (req, res) => {
  res.send({
    lol: true,
    ...req.user
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
