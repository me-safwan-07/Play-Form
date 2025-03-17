"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ioredis_1 = __importDefault(require("ioredis"));
const redisClient = new ioredis_1.default({
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT) || 6379,
    password: process.env.REDIS_PASSWORD || '',
    enableReadyCheck: true,
});
// Handle connection events
redisClient.on('connect', () => {
    console.log('Redis connected successfully');
});
redisClient.on('error', (err) => {
    console.error('Redis connection error:', err);
});
exports.default = redisClient;
