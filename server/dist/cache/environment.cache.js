"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.environmentCache = void 0;
const redisClient_1 = __importDefault(require("../config/redisClient"));
exports.environmentCache = {
    tag: {
        byId(id) {
            return `environments-${id}`;
        },
        byProductId(productId) {
            return `products-${productId}-environments`;
        },
    },
    revalidate({ id, productId }) {
        if (id) {
            redisClient_1.default.del(this.tag.byId(id));
        }
        if (productId) {
            redisClient_1.default.del(this.tag.byProductId(productId));
        }
    },
};
