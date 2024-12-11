"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const serviceAccountKey_json_1 = __importDefault(require("./serviceAccountKey.json"));
// Explicitly map only the required properties to match the ServiceAccount type
const typedServiceAccount = {
    projectId: serviceAccountKey_json_1.default.project_id,
    privateKey: serviceAccountKey_json_1.default.private_key, //.replace(/\\n/g, '\n'), // Handle newline escape in private key
    clientEmail: serviceAccountKey_json_1.default.client_email,
};
// Initialize Firebase Admin SDK
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(typedServiceAccount),
});
exports.default = firebase_admin_1.default;
