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
exports.deleteUser = exports.updateUserById = exports.getUserById = exports.createUserController = void 0;
const userService_1 = require("../../services/userService");
const database_1 = require("../../database");
const responseSelection = {
    id: true,
    name: true,
    email: true,
    emailVerified: true,
    imageUrl: true,
    createdAt: true,
    updatedAt: true,
    identityProvider: true,
};
const createUserController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = req.body;
        const user = yield (0, userService_1.CreateUser)(userData);
        res.status(200).json({
            success: true,
            data: user,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.createUserController = createUserController;
const getUserById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield database_1.prisma.user.findUnique({
            where: { id },
            select: responseSelection
        });
        if (!user) {
            res.status(404).json({ success: false, message: 'User not found' });
            return;
        }
        ;
        res.json(user);
        next();
    }
    catch (error) {
        res.status(404).json({ error: 'Failed to get user' });
        next(error);
    }
});
exports.getUserById = getUserById;
const updateUserById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const updatedUser = yield database_1.prisma.user.update({
            where: { id },
            data: req.body,
            select: responseSelection
        });
        if (!updatedUser) {
            res.status(404).json({ success: false, message: 'User not found' });
            return;
        }
        res.json(updatedUser);
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to update user' });
        next(err);
    }
});
exports.updateUserById = updateUserById;
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedUser = yield database_1.prisma.user.delete({
            where: { id }
        });
        res.status(204).send('User deleted successfully');
        next();
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete user' });
        next(error);
    }
});
exports.deleteUser = deleteUser;
