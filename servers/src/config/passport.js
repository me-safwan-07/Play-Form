import passport from 'passport';
import bcrypt from 'bcrypt';
import GoogleStrategy from 'passport-google-oauth20';
import LocalStrategy from 'passport-local';
import JwtStrategy from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';
import prisma from '../../prisma/index.js';
import { createUser } from '../services/user.services.js';
import { createAccount } from '../services/account.services.js';

// JWT strategy setup
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
};

passport.use(new JwtStrategy.Strategy(jwtOptions, async (jwt_payload, done) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: jwt_payload.id
            }
        });

        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch (error) {
        return done(error, false);
    }
}));

// Local strategy setup
passport.use(new LocalStrategy.Strategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if (!user || !user.password || !await bcrypt.compare(password, user.password)) {
            return done(null, false, { message: 'Invalid email or password' });
        }

        return done(null, user);
    } catch (error) {
        return done(error);
    }
}));

// Google OAuth2 strategy setup
passport.use(new GoogleStrategy.Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
    passReqToCallback: true,
}, async (req, accessToken, refreshToken, profile, done) => {
    try {
        if (!profile.emails || !profile.emails[0] || !profile.emails[0].value) {
            return done(new Error('No email found in Google profile'), false);
        }

        let user = await prisma.user.findFirst({
            where: {
                email: profile.emails[0].value
            }
        });

        if (!user) {
            user = await createUser({
                name: profile.displayName,
                email: profile.emails[0].value,
                emailVerified: new Date(),
                identityProvider: 'google',
                identityProviderAccountId: profile.id,
            });

            await createAccount({
                provider: 'google',
                providerAccountId: profile.id,
                userId: user.id,
            });
        }

        return done(null, user);
    } catch (error) {
        return done(error, false);
    }
}));

// Serialize and deserialize user
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id
            }
        });
        done(null, user);
    } catch (error) {
        done(error);
    }
});

export default passport;