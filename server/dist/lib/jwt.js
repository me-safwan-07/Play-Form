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
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const database_1 = require("../database");
const verifyToken = (token_1, ...args_1) => __awaiter(void 0, [token_1, ...args_1], void 0, function* (token, userEmail = "") {
    if (!token) {
        throw new Error("No token found");
    }
    const decoded = jsonwebtoken_1.default.decode(token);
    const payload = decoded;
    const { id } = payload;
    if (!userEmail) {
        const foundUser = yield database_1.prisma.user.findUnique({
            where: { id },
        });
        if (!foundUser) {
            throw new Error("User not found");
        }
        userEmail = foundUser.email;
    }
    return jsonwebtoken_1.default.verify(token, process.env.JWTAUTH_SECRET + userEmail);
});
exports.verifyToken = verifyToken;
