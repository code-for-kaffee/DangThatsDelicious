const passport = require('passport');



exports.login = passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: 'Failed Login',
    successRedirect: '/',
    successFlash: 'You\'re now logged in! ' 
}); 


exports.logout = (req, res) => {
    req.logout();
    req.flash('Sucess!', 'You \'re now logged out');
    res.redirect('/');

}