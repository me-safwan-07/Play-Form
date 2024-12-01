"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const client_1 = require("@prisma/client");
const extension_accelerate_1 = require("@prisma/extension-accelerate");
const prismaClientSingleton = () => {
    return new client_1.PrismaClient(Object.assign({ datasources: { db: { url: process.env.DATABASE_URL } } }, (process.env.DEBUG === "1" && {
        log: ["query", "info"],
    }))).$extends((0, extension_accelerate_1.withAccelerate)());
};
const globalForPrisma = globalThis;
exports.prisma = (_a = globalForPrisma.prisma) !== null && _a !== void 0 ? _a : prismaClientSingleton();
