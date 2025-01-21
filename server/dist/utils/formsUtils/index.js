"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildOrderByClause = exports.buildWhereClause = exports.transformPrismaSurvey = void 0;
const transformPrismaSurvey = (surveyPrisma) => {
    let segment = null;
    if (surveyPrisma.segment) {
        segment = Object.assign(Object.assign({}, surveyPrisma.segment), { surveys: surveyPrisma.segment.surveys.map(({ survey }) => survey.id) });
    }
    const transformedSurvey = Object.assign(Object.assign({}, surveyPrisma), { displayPercentage: Number(surveyPrisma.displayPercentage) || null, segment });
    return transformedSurvey;
};
exports.transformPrismaSurvey = transformPrismaSurvey;
const buildWhereClause = (filterCriteria) => {
    var _a;
    const whereClause = [];
    // for name
    if (filterCriteria === null || filterCriteria === void 0 ? void 0 : filterCriteria.name) {
        whereClause.push({ name: { contains: filterCriteria.name, mode: "insensitive" } });
    }
    // for status
    if ((filterCriteria === null || filterCriteria === void 0 ? void 0 : filterCriteria.status) && ((_a = filterCriteria === null || filterCriteria === void 0 ? void 0 : filterCriteria.status) === null || _a === void 0 ? void 0 : _a.length)) {
        whereClause.push({ status: { in: filterCriteria.status } });
    }
    return { AND: whereClause };
};
exports.buildWhereClause = buildWhereClause;
const buildOrderByClause = (sortBy) => {
    if (!sortBy) {
        return undefined;
    }
    if (sortBy === "name") {
        return [{ name: 'asc' }];
    }
    return [{ [sortBy]: 'desc' }];
};
exports.buildOrderByClause = buildOrderByClause;
