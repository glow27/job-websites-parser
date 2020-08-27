module.exports = function(req, res, next) {
  if (req.session.passport && req.session.passport.user) {
    res.locals.user = req.session.passport.user
  }
  next()
}
