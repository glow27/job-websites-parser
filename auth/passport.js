const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const Employer = require('../models/Employer')
const Employee = require('../models/Employee')
const bcrypt = require('bcrypt')

passport.use(new LocalStrategy({
      passReqToCallback: true,
      usernameField: 'email',
      passwordField: 'password',
    },
    async function(req, email, password, done) {
      let candidate
      if (req.body.status === 'employee') {
        candidate = await Employee.findOne({email: email})
      } else {
        candidate = await Employer.findOne({email: email})
      }
      if (!candidate) {
        return done(null, false, {message: 'User is not found'})
      }
      const comparePassword = bcrypt.compareSync(password, candidate.password)
      if (!comparePassword) {
        return done(null, false, {message: 'Password is incorrect'})
      }
      console.log(candidate)
      return done(null, candidate)
    },
))

passport.serializeUser(function(user, done) {
  console.log('serializeUser: ' + user._id)
  done(null, user)
})

passport.deserializeUser(async function(user, done) {
  console.log(user)
  if (user.status === 'employee') {
    Employee.findById(user._id, function(err, user) {
      done(err, user)
    })
  } else {
    Employer.findById(user._id, function(err, user) {
      done(err, user)
    })
  }
})
