"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformPrismaSurvey = void 0;
const transformPrismaSurvey = (surveyPrisma) => {
    let segment = null;
    if (surveyPrisma.segment) {
        segment = Object.assign(Object.assign({}, surveyPrisma.segment), { surveys: surveyPrisma.segment.surveys.map(({ survey }) => survey.id) });
    }
    const transformedSurvey = Object.assign(Object.assign({}, surveyPrisma), { displayPercentage: Number(surveyPrisma.displayPercentage) || null, segment });
    return transformedSurvey;
};
exports.transformPrismaSurvey = transformPrismaSurvey;
