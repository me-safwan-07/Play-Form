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
exports.fetchSurvey = void 0;
const formService_1 = require("../../services/formService"); // Service that handles database logic
const errors_1 = require("../../types/errors");
// Controller to handle survey fetching
const fetchSurvey = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { surveyId } = req.params;
    try {
        const survey = yield (0, formService_1.getSurvey)(surveyId);
        if (!survey) {
            res.status(404).json({ message: 'Survey not found' });
            return;
        }
        res.json(survey);
    }
    catch (error) {
        if (error instanceof errors_1.DatabaseError) {
            res.status(500).json({ message: error.message });
            return;
        }
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.fetchSurvey = fetchSurvey;
