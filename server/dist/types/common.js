"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZAllowedFileExtension = exports.ZPlacement = exports.ZColor = exports.ZOptionalNumber = exports.ZNumber = exports.ZString = void 0;
const zod_1 = __importDefault(require("zod"));
exports.ZString = zod_1.default.string();
exports.ZNumber = zod_1.default.number();
exports.ZOptionalNumber = zod_1.default.number().optional();
exports.ZColor = zod_1.default.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/);
exports.ZPlacement = zod_1.default.enum(["bottomLeft", "bottomRight", "topLeft", "topRight", "center"]);
exports.ZAllowedFileExtension = zod_1.default.enum([
    "png",
    "jpeg",
    "jpg",
    "pdf",
    "doc",
    "docx",
    "xls",
    "xlsx",
    "ppt",
    "pptx",
    "plain",
    "csv",
    "mp4",
    "mov",
    "avi",
    "mkv",
    "webm",
    "zip",
    "rar",
    "7z",
    "tar",
]);
