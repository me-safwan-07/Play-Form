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
exports.me = exports.userLogin = exports.userRegister = void 0;
const database_1 = require("../../database");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// register
const userRegister = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        // check if the user is already registered
        const existingUser = yield database_1.prisma.user.findUnique({
            where: {
                email
            },
            include: {
                accounts: true,
            }
        });
        if (existingUser) {
            res.status(400).json({
                error: 'Email already registered'
            });
            return;
        }
        // Hash password
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        // Create user
        const user = yield database_1.prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                identityProvider: 'email'
            },
            include: {
                accounts: true,
            }
        });
        // Generate token
        if (!process.env.JWTAUTH_SECRET) {
            throw new Error('JWTAUTH_SECRET is not defined');
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWTAUTH_SECRET, { expiresIn: '1d' });
        res.status(201).json({
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                identityProvider: user.identityProvider,
                accounts: user.accounts
            },
            token
        });
        next();
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
        else {
            console.error('Unknown error', error);
        }
        res.status(500).json({ error: 'Failed to register user' });
        next(error);
    }
});
exports.userRegister = userRegister;
// login
const userLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Find user by email
        const user = yield database_1.prisma.user.findUnique({
            where: {
                email
            },
            include: {
                accounts: true,
            }
        });
        if (!user) {
            res.status(401).json({ error: 'Invalid credientials' });
            return;
        }
        // check password
        if (!user.password) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }
        const isValidPassword = yield bcryptjs_1.default.compare(password, user.password);
        if (!isValidPassword) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }
        // Generate token
        if (!process.env.JWTAUTH_SECRET) {
            throw new Error('JWTAUTH_SECRET is not defined');
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWTAUTH_SECRET, { expiresIn: '1d' });
        res.json({
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                accounts: user.accounts
            },
            token
        });
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(401).json({ error: err.message });
        }
        else {
            res.status(401).json({ error: 'Unknown error' });
        }
        return;
    }
});
exports.userLogin = userLogin;
// get curent user
const me = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
        if (!token) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }
        if (!process.env.JWTAUTH_SECRET) {
            throw new Error('JWTAUTH_SECRET is not defined');
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWTAUTH_SECRET);
        const user = yield database_1.prisma.user.findUnique({
            where: {
                id: decoded.userId
            },
            include: {
                accounts: true,
            }
        });
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        res.json({
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                accounts: user.accounts
            }
        });
        next();
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            res.status(401).json({ error: "Invalid token" });
            return;
        }
        else {
            res.status(500).json({ error: "Failed to authenticate user" });
            return;
        }
        next(error);
    }
});
exports.me = me;
