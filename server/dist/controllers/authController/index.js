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
exports.createUser = exports.getUser = void 0;
const database_1 = require("../../database");
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_validator_1 = require("express-validator");
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
