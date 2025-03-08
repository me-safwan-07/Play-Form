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
exports.cache = void 0;
const redisClient_1 = __importDefault(require("./redisClient"));
const superjson_1 = require("superjson");
const cache = (fn, keyPrefix, options = { ttl: 3600 }) => {
    return (...params) => __awaiter(void 0, void 0, void 0, function* () {
        const cacheKey = `${keyPrefix}:${JSON.stringify(params)}`;
        // ✅ Check if the data is already cached in Redis
        const cachedData = yield redisClient_1.default.get(cacheKey);
        if (cachedData) {
            return (0, superjson_1.parse)(cachedData); // 🔥 Return cached response
        }
        // ✅ Run the function if no cache exists
        const result = yield fn(...params);
        // ✅ Cache the result in Redis
        yield redisClient_1.default.set(cacheKey, (0, superjson_1.stringify)(result), 'EX', options.ttl || 3600);
        // Handle tag-based cache invalidation (optional)
        if (options.tag) {
            for (const tag of options.tag) {
                yield redisClient_1.default.sadd(tag, cacheKey);
            }
        }
        return result;
    });
};
exports.cache = cache;
