import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';

export default async (app) => {
    // Set up Passport
    app.use(passport.initialize());
    app.use(passport.session());

    // Serialize / deserialize user for sessions
    passport.serializeUser((user, done) => {
        done(null, user.id); // store minimal identifier in session
    });
    passport.deserializeUser((id, done) => {
        // Look up user by id in DB; here we just return dummy object
        done(null, { id });
    });

    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
        clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
        callbackURL: '/auth/google/callback'
    }, (accessToken, refreshToken, profile, done) => {
        done(null, profile);
    }));

    // Kick off Google OAuth flow
    app.get('/auth/google', (req, res) => {
        req.session.returnURI = req.query.returnURI;
        passport.authenticate('google', { scope: ['profile', 'email'] })(req, res);
    });

    // OAuth callback URL from Google Cloud config
    app.get('/auth/google/callback',
        passport.authenticate('google', {
            failureRedirect: '/login'
        }),
        (req, res) => {
            // Successful auth
            res.redirect(req.session.returnURI || '/profile');
        }
    );
};