"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.structuredClone = void 0;
const structured_clone_1 = __importDefault(require("@ungap/structured-clone"));
let structuredCloneExport;
if (typeof structuredClone === "undefined") {
    exports.structuredClone = structuredCloneExport = structured_clone_1.default;
}
else {
    // @ts-expect-error
    exports.structuredClone = structuredCloneExport = structuredClone;
}
