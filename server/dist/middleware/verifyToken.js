"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => {
    console.log('Headers:', req.headers);
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.log('No valid auth header found:', authHeader);
        res.status(401).json({ message: 'No token provided' });
        return;
    }
    const token = authHeader.split(' ')[1];
    console.log('Token:', token);
    if (!process.env.JWT_SECRET) {
        res.status(500).send("JWT_SECRET not defined");
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        console.log('Decoded token:', decoded);
        if (!decoded.id) {
            res.status(401).json({ message: 'Invalid token' });
            return;
        }
        req.userId = decoded.id;
        next();
    }
    catch (error) {
        console.log('Token verification error:', error);
        res.status(401).json({ message: 'Invalid token' });
        return;
    }
};
exports.verifyToken = verifyToken;
