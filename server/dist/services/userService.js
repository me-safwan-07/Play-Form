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
exports.updateUser = exports.getUserByEmail = exports.CreateUser = void 0;
const client_1 = require("@prisma/client");
const database_1 = require("../database");
const validate_1 = require("../utils/validate");
const errors_1 = require("../utils/errors");
const zod_1 = __importDefault(require("zod"));
const responseSelection = {
    id: true,
    name: true,
    email: true,
    emailVerified: true,
    imageUrl: true,
    createdAt: true,
    updatedAt: true,
    // twoFactorEnabled: true,
    identityProvider: true,
};
const CreateUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Validate inputs if needed (uncomment when `validateInputs` is defined)
        // validateInputs([data, ZUser]);
        const user = yield database_1.prisma.user.create({
            data: data,
            select: responseSelection,
        });
        return user;
    }
    catch (error) {
        // Unique constraint violation (e.g., duplicate email)
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
            throw new errors_1.DatabaseError("User with this email already exists");
        }
        // Other known Prisma errors
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            throw new errors_1.DatabaseError(error.message);
        }
        // Unknown errors
        throw error;
    }
});
exports.CreateUser = CreateUser;
const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    (0, validate_1.validateInputs)([email, zod_1.default.string().email()]);
    try {
        const user = yield database_1.prisma.user.findFirst({
            where: {
                email,
            },
            select: responseSelection,
        });
        return user;
    }
    catch (error) {
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            throw new errors_1.DatabaseError(error.message);
        }
        throw error;
    }
});
exports.getUserByEmail = getUserByEmail;
const updateUser = (personId, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedUser = yield database_1.prisma.user.update({
            where: {
                id: personId,
            },
            data: data,
            select: responseSelection,
        });
        return updatedUser;
    }
    catch (error) {
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError && error.code === "P2016") {
            throw new errors_1.ResourceNotFoundError("User", personId);
        }
        throw error;
    }
});
exports.updateUser = updateUser;
