import express from 'express';
import passport from 'passport';

const router = express.Router();

router.post(
    '/login',
    passport.authenticate('local', { session: false }),
    (req, res) => {
        const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ token });
    }
);

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
    '/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.redirect(`${process.env.CLIENT_URL}/auth?token=${token}`);
    }
);

export default router;