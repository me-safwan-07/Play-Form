"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formCache = void 0;
const redisClient_1 = __importDefault(require("../../config/redisClient"));
exports.formCache = {
    tag: {
        byId(id) {
            return `forms-${id}`;
        },
        byEnvironementId(environmentId) {
            return `environment-${environmentId}-forms`;
        },
        bySegmentId(segmentId) {
            return `segments-${segmentId}-forms`;
        },
    },
    revalidate({ id, environmentId, segmentId }) {
        if (id) {
            redisClient_1.default.del(this.tag.byId(id));
        }
        if (environmentId) {
            redisClient_1.default.del(this.tag.byEnvironementId(environmentId));
        }
        if (segmentId) {
            redisClient_1.default.del(this.tag.bySegmentId(segmentId));
        }
    },
};
