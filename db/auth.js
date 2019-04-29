const passport = require('koa-passport');
const knex = require('./connection');
const LocalStrategy = require('passport-local').Strategy;
const options = {};

passport.serializeUser((user, done) => { done(null, user.email); });

passport.deserializeUser((email, done) => {
    return knex.select("email", "password").from("customer").where("email", email).first()
        .then((user) => {
            if (user) {
                return done(null, { email: user.email });
            } else {
                return done(null, null)
            }
        })
        .catch((err) => { done(err, null); });
});

passport.use(new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, (email, password, done) => {
    return knex.select("email", "password").from("customer").where("email", email).first()
        .then((user) => {
            if (!user) return done(null, false);
            if (password === user.password) {
                return done(null, { email: user.email });
            } else {
                return done(null, false);
            }
        })
        .catch((err) => { return done(err); });
}));