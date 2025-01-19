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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserById = exports.updateUser = exports.createUser = exports.getUser = void 0;
const database_1 = require("../../database");
const client_1 = require("@prisma/client");
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
};
const getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
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
    try {
        const data = req.body;
        const user = yield database_1.prisma.user.create({
            data: data,
            select: responseSelection
        });
        res.status(200).json({ user });
        next(user);
    }
    catch (err) {
        if (err instanceof client_1.Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
            res.status(409).json({ message: 'Email already exists' });
            console.log(err.message);
            return;
        }
        if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            res.status(403).json({ message: err.message });
            console.log(err.message);
            return;
        }
        res.status(500).json({ message: 'Failed to create user' });
        next(err);
    }
});
exports.createUser = createUser;
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const data = req.body;
        const updateUser = yield database_1.prisma.user.update({
            where: {
                id
            },
            data: data,
            select: responseSelection
        });
        res.status(200).json({ user: updateUser });
        return;
    }
    catch (error) {
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError && error.code === 'P2016') {
            res.status(404).json({ error: error.message });
        }
        res.status(404).json({ message: 'user not updated' });
        next(error);
    }
});
exports.updateUser = updateUser;
const deleteUserById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const user = yield database_1.prisma.user.delete({
            where: {
                id
            },
            select: responseSelection
        });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(200).json({ success: true, message: 'User deleted' });
        next(user);
    }
    catch (error) {
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            res.status(403).json({ message: error.message });
            console.log(error.message);
            return;
        }
        res.status(500).json({ message: 'Failed to delete user' });
        next(error);
    }
});
exports.deleteUserById = deleteUserById;
