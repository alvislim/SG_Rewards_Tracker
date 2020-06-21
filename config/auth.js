// To handle when user tries to access dashboard if user is not yet login

module.exports = {
  autheticationPassed: function (req, res, next) {
      if (req.isAuthenticated()) {
        return next();
      } 
      req.flash('error_msg', 'You have not login!');
      res.redirect('/login');
  },
  autheticationFailed: function (req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect('/dashboard');
  }
};