import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import FacebookStrategy from 'passport-facebook';
import { db } from './mongo-client.js';

const clientBase = process.env.VITE_MODE === 'development' ? `http://localhost:${process.env.VITE_CLIENT_PORT}` : '/';
const successRedirect = `${clientBase}/@`;
const failureRedirect = `${clientBase}/login`;
const reactivateRedirect = (email) => `${clientBase}/reactivate?email=${encodeURIComponent(email)}`;

const handleOAuthCallback = (provider) => async (req, res) => {
    const email = req.user?.emails?.[0]?.value;
    if (!email) {
        res.redirect(failureRedirect);
        return;
    }

    const user = await db.collections.accounts.findOne({ email });
    if (!user || !user.subscriptionId) {
        // Extract firstName and lastName from OAuth profile
        let firstName = '';
        let lastName = '';
        
        // Try Facebook OAuth structure first: profile._json.first_name and profile._json.last_name
        if (req.user._json && req.user._json.first_name) {
            firstName = req.user._json.first_name || '';
            lastName = req.user._json.last_name || '';
        }
        // Google OAuth (and Facebook normalized): profile.name.givenName and profile.name.familyName
        else if (req.user.name) {
            firstName = req.user.name.givenName || '';
            lastName = req.user.name.familyName || '';
        }
        
        // Build redirect URL with parameters
        const params = new URLSearchParams({
            email,
            social: 'true',
            oauthProvider: provider
        });
        if (firstName) params.append('firstName', firstName);
        if (lastName) params.append('lastName', lastName);
        
        const redirectUrl = `${clientBase}/signup?${params.toString()}`;
        res.redirect(redirectUrl);
        return;
    }

    if (user.inactive) {
        res.redirect(reactivateRedirect(email));
        return;
    }

    const providerMismatch = (!user.isSocial) || (user.oauthProvider && user.oauthProvider !== provider);
    if (providerMismatch) {
        const params = new URLSearchParams({
            error: 'Use your existing login method'
        });
        res.redirect(`${clientBase}/login?${params.toString()}`);
        return;
    }

    if (!user.oauthProvider) {
        await db.collections.accounts.updateOne(
            { _id: user._id },
            { $set: { oauthProvider: provider, isSocial: true } }
        );
    }

    req.session.userId = user._id.toString();
    req.session.email = user.email;

    res.redirect(successRedirect);
};

export default async (app) => {
    // Set up Passport
    app.use(passport.initialize());
    app.use(passport.authenticate('session'));

    passport.serializeUser((user, done) => {
        process.nextTick(() => {
            done(null, user);
        });
    });

    passport.deserializeUser((user, done) => {
        process.nextTick(() => {
            done(null, user);
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
        profileFields: ['id', 'displayName', 'email', 'first_name', 'last_name', 'photos']
    }, (accessToken, refreshToken, profile, done) => {
        process.nextTick(() => {
            done(null, profile);
        });
    }));

    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']
    }));

    app.get('/auth/google/callback',
        passport.authenticate('google', {
            failureRedirect
        }),
        handleOAuthCallback('google')
    );

    app.get('/auth/facebook', passport.authenticate('facebook', {
        scope: ['email']
    }));

    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            failureRedirect
        }),
        handleOAuthCallback('facebook')
    );

    app.get('/auth/logout', (req, res, next) => {
        req.logout(function (err) {
            if (err) { return next(err); }
            res.redirect(clientBase);
        });
    });
};