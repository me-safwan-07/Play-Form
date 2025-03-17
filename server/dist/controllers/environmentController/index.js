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
Object.defineProperty(exports, "__esModule", { value: true });
exports.environmentController = void 0;
const database_1 = require("../../database");
const environmentController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    try {
        const checkUser = yield database_1.prisma.user.findUnique({
            where: {
                id: userId
            }
        });
        if (!checkUser) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        res.status(200).json(checkUser.id);
        next();
    }
    catch (error) {
        console.error(`Error fetching user: ${error}`);
        res.status(500).json({ message: 'Internal server error' });
        next(error);
    }
});
exports.environmentController = environmentController;
