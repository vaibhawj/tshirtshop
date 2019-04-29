const passport = require('koa-passport');
const knex = require('./db/connection');
const LocalStrategy = require('passport-local').Strategy;
const options = {};

passport.serializeUser((user, done) => { done(null, user.email); });

passport.deserializeUser((email, done) => {
    return knex('customer').where({ email }).first()
        .then((user) => { done(null, user); })
        .catch((err) => { done(err, null); });
});

passport.use(new LocalStrategy(options, (email, password, done) => {
    knex('customer').where({ email }).first()
        .then((user) => {
            if (!user) return done(null, false);
            if (password === user.password) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        })
        .catch((err) => { return done(err); });
}));