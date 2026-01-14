import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import FacebookStrategy from 'passport-facebook';

const clientBase = process.env.VITE_MODE === 'development' ? `http://localhost:${process.env.VITE_CLIENT_PORT}` : '/';
const successRedirect = `${clientBase}/@`;
const failureRedirect = `${clientBase}/login`;

export default async (app) => {
    // Set up Passport
    app.use(passport.initialize());
    app.use(passport.authenticate('session'));

    passport.serializeUser((user, done) => {
        process.nextTick(() => {
            done(null, user.id);
        });
    });

    passport.deserializeUser((id, done) => {
        process.nextTick(() => {
            done(null, { id });
        });
    });

    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
        clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
        callbackURL: '/auth/google/callback',
        scope: ['profile', 'email'],
    }, (accessToken, refreshToken, profile, done) => {
        process.nextTick(() => {
            done(null, profile);
        });
    }));

    passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: '/auth/facebook/callback',
        profileFields: ['id', 'displayName', 'email', 'photos']
    }, (accessToken, refreshToken, profile, done) => {
        process.nextTick(() => {
            done(null, profile);
        });
    }));

    app.get('/auth/google', passport.authenticate('google', {
        successRedirect,
        failureRedirect
    }));

    app.get('/auth/google/callback',
        passport.authenticate('google', {
            failureRedirect
        }),
        (req, res) => {
            res.redirect(successRedirect);
        }
    );

    app.get('/auth/facebook', passport.authenticate('facebook', {
        scope: ['email']
    }));

    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            failureRedirect
        }),
        (req, res) => {
            res.redirect(successRedirect);
        }
    );

    app.get('/auth/logout', (req, res, next) => {
        req.logout(function (err) {
            if (err) { return next(err); }
            res.redirect(clientBase);
        });
    });
};