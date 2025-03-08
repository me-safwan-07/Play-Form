"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleAuth = exports.login = exports.createUser = exports.getUser = void 0;
const database_1 = require("../../database");
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_validator_1 = require("express-validator");
const axios_1 = __importDefault(require("axios"));
const oauth2client_1 = require("../../utils/oauth2client");
const responseSelection = {
    id: true,
    name: true,
    email: true,
    emailVerified: true,
    imageUrl: true,
    createdAt: true,
    updatedAt: true,
    identityProvider: true,
    notificationSettings: true,
    forms: true,
};
// login
const getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.userId;
        // check if the user is already registered
        const user = yield database_1.prisma.user.findUnique({
            where: {
                id,
            },
            select: responseSelection
        });
        if (!user) {
            res.status(404).send({ message: 'User not found' });
            return;
        }
        user.notificationSettings = user.notificationSettings;
        res.status(200).json({ user });
        next();
    }
    catch (error) {
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            console.error(error.message);
        }
        else {
            console.error('Unknown error', error);
        }
        res.status(500).json({ error: 'Failed to register user' });
        next(error);
    }
});
exports.getUser = getUser;
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    const { name, email, password } = req.body;
    try {
        // Check if the user already exists
        const isUserAlready = yield database_1.prisma.user.findFirst({
            where: {
                email
            }
        });
        if (isUserAlready) {
            res.status(400).json({ message: 'User with this email already exists' });
            return;
        }
        // Hash the password
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        // Create the user
        const user = yield database_1.prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                // You can omit `forms` here if you don't need to create forms immediately
            },
            select: responseSelection,
        });
        // Retrieve the forms created by this user
        const forms = yield database_1.prisma.form.findMany({
            where: {
                createdBy: user.id
            }
        });
        user.forms = forms;
        // JWT Creation
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined');
        }
        let token;
        try {
            // Generate JWT token
            token = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        }
        catch (error) {
            console.error('Error generating JWT token', error);
            res.status(500).json({ error: 'Error generating JWT token' });
            return;
        }
        // Respond with the user data and token
        res.status(201).json({ user, token });
        next();
    }
    catch (error) {
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
            res.status(400).json({ message: 'User with this email already exists' });
        }
        else if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            console.error(error.message);
            res.status(400).json({ message: error.message });
        }
        else {
            console.error('Unknown error', error);
            res.status(500).json({ error: 'Failed to register user' });
        }
        next(error);
    }
});
exports.createUser = createUser;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield database_1.prisma.user.findFirst({ where: { email } });
        if (!user || !user.password) {
            res.status(401).json({ message: 'Invalid email or password' });
            return;
        }
        const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ message: 'Invalid email or password' });
            return;
        }
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined');
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.status(200).json({ token });
        next();
    }
    catch (error) {
        console.error('Error generating JWT token', error);
        res.status(500).json({ error: 'Error generating JWT token' });
        next(error);
    }
});
exports.login = login;
const signToken = (id) => {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined');
    }
    return jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    });
};
const createSendToken = (user, statusCode, res) => {
    const token = signToken(user.id);
    const cookieOptions = {
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: false,
        path: '/',
        sameSite: 'none'
    };
    if (process.env.NODE_ENV === 'production') {
        cookieOptions.secure = true;
        cookieOptions.sameSite = 'none';
    }
    ;
    res.cookie('jwt', token, Object.assign(Object.assign({}, cookieOptions), { sameSite: 'none' }));
    console.log(user);
    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user
        }
    });
};
const googleAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const code = req.query.code;
    const googleRes = yield oauth2client_1.oauth2Client.getToken(code);
    if (!googleRes) {
        res.status(400).json({ message: 'Failed to get Google tokens' });
        return;
    }
    oauth2client_1.oauth2Client.setCredentials((yield googleRes).tokens);
    const userRes = yield axios_1.default.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${(yield googleRes).tokens.access_token}`);
    if (!userRes) {
        res.status(400).json({ message: 'Failed to get Google user info' });
        return;
    }
    let user = yield database_1.prisma.user.findFirst({ where: { email: userRes.data.email } });
    if (!user) {
        user = yield database_1.prisma.user.create({
            data: {
                name: userRes.data.name,
                email: userRes.data.email,
                imageUrl: userRes.data.picture,
                identityProvider: 'google',
                notificationSettings: {
                    alert: { newsletter: true },
                    weeklySummary: { updates: true },
                }
            }
        });
    }
    // Create a properly typed user object
    const typedUser = Object.assign(Object.assign({}, user), { notificationSettings: user.notificationSettings });
    createSendToken(typedUser, 201, res);
});
exports.googleAuth = googleAuth;
