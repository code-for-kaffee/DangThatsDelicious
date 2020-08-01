const mongoose = require('mongoose');
const User = mongoose.model('User');
const promisify = require('es6-promisify');


exports.loginForm = (req, res) => {
    res.render('Login', { title: 'Login' });
}

exports.userRegister = (req, res) => {
    res.render('register', { title:'Register' })
}

exports.validateRegister = (req, res, next) => {
    req.sanitizeBody('name');
    req.checkBody('name', 'You must supply a name').notEmpty();
    req.checkBody('email', 'That email is not valid').notEmpty().isEmail();
    req.sanitizeBody('email').normalizeEmail({
        remove_dots: false,
        remove_extension: false,
        gmail_remove_subaddress: false
    })
    req.checkBody('password', 'Password cant be empty').notEmpty();
    req.checkBody('password-confirm', 'Confirm password Cant be blank!').notEmpty();
    req.checkBody('password-confirm', 'Your password doesnt match').equals(req.body.password);
    const errors = req.validationErrors();
    if (errors) {
        req.flash('error', errors.map(e => e.msg));
        res.render('register', { title: 'Register', body: req.body, flashes: req.flash() } );
        return;
    }
    next();
}

exports.register = async (req, res, next) => {
const user = new User({ email:req.body.email, name:req.body.name });
const registerWithPromise = promisify(User.register, User);
await registerWithPromise(user, req.body.password);
next();
}

exports.account = (req, res) => {
    res.render('account', { title:"Edit your account" });
}

exports.updateAccount = async (req, res) => {
    const updates  = { 
        name: req.body.name,
        email: req.body.email
    };

    const user = await User.findByIdAndUpdate(
        {  _id: req.user._id },
        { $set: updates },
        { new: true, runValidators: true, context: 'query'}
    )
    res.redirect('back');
}