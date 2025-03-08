"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.displayCache = void 0;
const redisClient_1 = __importDefault(require("../../config/redisClient"));
exports.displayCache = {
    tag: {
        byId(id) {
            return `displays-${id}`;
        },
        byFormId(formId) {
            return `forms-${formId}-displays`;
        },
        byPersonId(personId) {
            return `people-${personId}-displays`;
        },
        byEnvironmentId(environmentId) {
            return `environments-${environmentId}-displays`;
        },
    },
    revalidate({ id, formId, personId, environmentId }) {
        if (id) {
            redisClient_1.default.del(this.tag.byId(id));
        }
        if (formId) {
            redisClient_1.default.del(this.tag.byFormId(formId));
        }
        if (personId) {
            redisClient_1.default.del(this.tag.byPersonId(personId));
        }
        if (environmentId) {
            redisClient_1.default.del(this.tag.byEnvironmentId(environmentId));
        }
    },
};
