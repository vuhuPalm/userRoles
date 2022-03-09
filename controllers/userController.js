const {Role, User} = require('../models');
const md5 = require('md5');
const passport = require('passport')

module.exports.renderRegistrationForm = async function(req, res) {
    const roles = await Role.findAll();
    res.render('users/register', {
        roles
    });
};

module.exports.registerUser = async function(req, res) {
    await User.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: md5(req.body.password),
        role_id: req.body.role
    })
    res.redirect('/');
}

module.exports.renderLoginForm = function(req, res) {
    res.render('users/login');
}

module.exports.loginUser = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureMessage: true
});