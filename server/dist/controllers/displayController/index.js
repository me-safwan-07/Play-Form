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
exports.getDisplay = exports.selectDisplay = void 0;
const cache_1 = require("../../config/cache");
const validate_1 = require("../../utils/validate");
const environment_1 = require("../../types/environment");
const database_1 = require("../../database");
const client_1 = require("@prisma/client");
const cache_2 = require("./cache");
exports.selectDisplay = {
    id: true,
    createdAt: true,
    updatedAt: true,
    surveyId: true,
    responseId: true,
    personId: true,
    status: true,
};
const getDisplay = (req, res, next) => {
    const dispayId = req.params.displayId;
    (0, cache_1.cache)(() => __awaiter(void 0, void 0, void 0, function* () {
        (0, validate_1.validateInputs)([dispayId, environment_1.ZId]);
        try {
            const display = yield database_1.prisma.display.findUnique({
                where: {
                    id: dispayId
                },
                select: exports.selectDisplay,
            });
            if (!display) {
                res.status(404).json({ message: "dispalay is not found" });
            }
            res.status(200).json({ display });
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                res.status(400).json({ databaseEror: error.message });
            }
            res.status(400).json({ error });
        }
    }), `getDisplay-${dispayId}`, {
        tag: [cache_2.displayCache.tag.byId(dispayId)]
    })();
};
exports.getDisplay = getDisplay;
