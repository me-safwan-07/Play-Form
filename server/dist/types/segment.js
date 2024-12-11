"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZSegmentUpdateInput = exports.ZSegmentCreateInput = exports.ZSegment = exports.ZSegmentFilters = exports.ZSegmentConnector = exports.ZSegmentFilter = exports.ZSegmentDeviceFilter = exports.ZSegmentSegmentFilter = exports.ZSegmentActionFilter = exports.ZSegmentPersonFilter = exports.ZSegmentAttributeFilter = exports.ZSegmentFilterRoot = exports.ZSegmentFilterRootType = exports.ZSegmentFilterValue = exports.ZActionMetric = exports.ZDeviceOperator = exports.ZSegmentOperator = exports.ZPersonOperator = exports.ZAttributeOperator = exports.ALL_OPERATORS = exports.DEVICE_OPERATORS = exports.SEGMENT_OPERATORS = exports.ACTION_METRICS = exports.PERSON_OPERATORS = exports.ATTRIBUTE_OPERATORS = exports.ZBaseOperator = exports.STRING_OPERATORS = exports.ARITHMETIC_OPERATORS = exports.BASE_OPERATORS = void 0;
const zod_1 = require("zod");
// The segment filter has operators, these are all the types of operators that can be used
exports.BASE_OPERATORS = [
    "lessThan",
    "lessEqual",
    "greaterThan",
    "greaterEqual",
    "equals",
    "notEquals",
];
exports.ARITHMETIC_OPERATORS = ["lessThan", "lessEqual", "greaterThan", "greaterEqual"];
exports.STRING_OPERATORS = ["contains", "doesNotContain", "startsWith", "endsWith"];
exports.ZBaseOperator = zod_1.z.enum(exports.BASE_OPERATORS);
// An attribute filter can have these operators
exports.ATTRIBUTE_OPERATORS = [
    ...exports.BASE_OPERATORS,
    "isSet",
    "isNotSet",
    "contains",
    "doesNotContain",
    "startsWith",
    "endsWith",
];
// the person filter currently has the same operators as the attribute filter
// but we might want to add more operators in the future, so we keep it separated
exports.PERSON_OPERATORS = exports.ATTRIBUTE_OPERATORS;
// A metric is always only associated with an action filter
// Metrics are used to evaluate the value of an action filter, from the database
exports.ACTION_METRICS = [
    "lastQuarterCount",
    "lastMonthCount",
    "lastWeekCount",
    "occuranceCount",
    "lastOccurranceDaysAgo",
    "firstOccurranceDaysAgo",
];
// operators for segment filters
exports.SEGMENT_OPERATORS = ["userIsIn", "userIsNotIn"];
// operators for device filters
exports.DEVICE_OPERATORS = ["equals", "notEquals"];
// all operators
exports.ALL_OPERATORS = [...exports.ATTRIBUTE_OPERATORS, ...exports.SEGMENT_OPERATORS];
exports.ZAttributeOperator = zod_1.z.enum(exports.ATTRIBUTE_OPERATORS);
exports.ZPersonOperator = zod_1.z.enum(exports.PERSON_OPERATORS);
exports.ZSegmentOperator = zod_1.z.enum(exports.SEGMENT_OPERATORS);
exports.ZDeviceOperator = zod_1.z.enum(exports.DEVICE_OPERATORS);
exports.ZActionMetric = zod_1.z.enum(exports.ACTION_METRICS);
exports.ZSegmentFilterValue = zod_1.z.union([zod_1.z.string(), zod_1.z.number()]);
// the type of the root of a filter
exports.ZSegmentFilterRootType = zod_1.z.enum(["attribute", "action", "segment", "device", "person"]);
// Root of the filter, this defines the type of the filter and the metadata associated with it
// For example, if the root is "attribute", the attributeClassName is required
// if the root is "action", the actionClassId is required.
exports.ZSegmentFilterRoot = zod_1.z.discriminatedUnion("type", [
    zod_1.z.object({
        type: zod_1.z.literal(exports.ZSegmentFilterRootType.Enum.attribute),
        attributeClassId: zod_1.z.string(),
    }),
    zod_1.z.object({
        type: zod_1.z.literal(exports.ZSegmentFilterRootType.Enum.person),
        userId: zod_1.z.string(),
    }),
    zod_1.z.object({
        type: zod_1.z.literal(exports.ZSegmentFilterRootType.Enum.action),
        actionClassId: zod_1.z.string(),
    }),
    zod_1.z.object({
        type: zod_1.z.literal(exports.ZSegmentFilterRootType.Enum.segment),
        segmentId: zod_1.z.string(),
    }),
    zod_1.z.object({
        type: zod_1.z.literal(exports.ZSegmentFilterRootType.Enum.device),
        deviceType: zod_1.z.string(),
    }),
]);
// Each filter has a qualifier, which usually contains the operator for evaluating the filter.
// Only in the case of action filters, the metric is also included in the qualifier
// Attribute filter -> root will always have type "attribute"
exports.ZSegmentAttributeFilter = zod_1.z.object({
    id: zod_1.z.string().cuid2(),
    root: zod_1.z.object({
        type: zod_1.z.literal("attribute"),
        attributeClassName: zod_1.z.string(),
    }),
    value: exports.ZSegmentFilterValue,
    qualifier: zod_1.z.object({
        operator: exports.ZAttributeOperator,
    }),
});
// Person filter -> root will always have type "person"
exports.ZSegmentPersonFilter = zod_1.z.object({
    id: zod_1.z.string().cuid2(),
    root: zod_1.z.object({
        type: zod_1.z.literal("person"),
        personIdentifier: zod_1.z.string(),
    }),
    value: exports.ZSegmentFilterValue,
    qualifier: zod_1.z.object({
        operator: exports.ZPersonOperator,
    }),
});
// Action filter -> root will always have type "action"
// Action filters also have the metric along with the operator in the qualifier of the filter
exports.ZSegmentActionFilter = zod_1.z
    .object({
    id: zod_1.z.string().cuid2(),
    root: zod_1.z.object({
        type: zod_1.z.literal("action"),
        actionClassId: zod_1.z.string(),
    }),
    value: exports.ZSegmentFilterValue,
    qualifier: zod_1.z.object({
        metric: zod_1.z.enum(exports.ACTION_METRICS),
        operator: exports.ZBaseOperator,
    }),
})
    .refine((actionFilter) => {
    const { value } = actionFilter;
    // if the value is not type of number, it's invalid
    const isValueNumber = typeof value === "number";
    if (!isValueNumber) {
        return false;
    }
    return true;
}, {
    message: "Value must be a number for action filters",
});
// Segment filter -> root will always have type "segment"
exports.ZSegmentSegmentFilter = zod_1.z.object({
    id: zod_1.z.string().cuid2(),
    root: zod_1.z.object({
        type: zod_1.z.literal("segment"),
        segmentId: zod_1.z.string(),
    }),
    value: exports.ZSegmentFilterValue,
    qualifier: zod_1.z.object({
        operator: exports.ZSegmentOperator,
    }),
});
// Device filter -> root will always have type "device"
exports.ZSegmentDeviceFilter = zod_1.z.object({
    id: zod_1.z.string().cuid2(),
    root: zod_1.z.object({
        type: zod_1.z.literal("device"),
        deviceType: zod_1.z.string(),
    }),
    value: exports.ZSegmentFilterValue,
    qualifier: zod_1.z.object({
        operator: exports.ZDeviceOperator,
    }),
});
// A segment filter is a union of all the different filter types
exports.ZSegmentFilter = zod_1.z
    .union([
    exports.ZSegmentActionFilter,
    exports.ZSegmentAttributeFilter,
    exports.ZSegmentPersonFilter,
    exports.ZSegmentSegmentFilter,
    exports.ZSegmentDeviceFilter,
])
    // we need to refine the filter to make sure that the filter is valid
    .refine((filter) => {
    if (filter.root.type === "action") {
        if (!("metric" in filter.qualifier)) {
            return false;
        }
    }
    return true;
}, {
    message: "Metric operator must be specified for action filters",
})
    .refine((filter) => {
    // if the operator is an arithmentic operator, the value must be a number
    if (exports.ARITHMETIC_OPERATORS.includes(filter.qualifier.operator) &&
        typeof filter.value !== "number") {
        return false;
    }
    // if the operator is a string operator, the value must be a string
    if (exports.STRING_OPERATORS.includes(filter.qualifier.operator) &&
        typeof filter.value !== "string") {
        return false;
    }
    return true;
}, {
    message: "Value must be a string for string operators and a number for arithmetic operators",
})
    .refine((filter) => {
    const { value, qualifier } = filter;
    const { operator } = qualifier;
    // if the operator is "isSet" or "isNotSet", the value doesn't matter
    if (operator === "isSet" || operator === "isNotSet") {
        return true;
    }
    if (typeof value === "string") {
        return value.length > 0;
    }
    return true;
}, {
    message: "Invalid value for filters: please check your filter values",
});
exports.ZSegmentConnector = zod_1.z.enum(["and", "or"]).nullable();
// here again, we refine the filters to make sure that the filters are valid
const refineFilters = (filters) => {
    let result = true;
    for (let i = 0; i < filters.length; i++) {
        const group = filters[i];
        if (Array.isArray(group.resource)) {
            result = refineFilters(group.resource);
        }
        else {
            // if the connector for a "first" group is not null, it's invalid
            if (i === 0 && group.connector !== null) {
                result = false;
                break;
            }
        }
    }
    return result;
};
// The filters can be nested, so we need to use z.lazy to define the type
// more on recusrsive types -> https://zod.dev/?id=recursive-types
// TODO: Figure out why this is not working, and then remove the ts-ignore
// @ts-ignore
exports.ZSegmentFilters = zod_1.z
    .array(zod_1.z.object({
    id: zod_1.z.string().cuid2(),
    connector: exports.ZSegmentConnector,
    resource: zod_1.z.union([exports.ZSegmentFilter, zod_1.z.lazy(() => exports.ZSegmentFilters)]),
}))
    .refine(refineFilters, {
    message: "Invalid filters applied",
});
exports.ZSegment = zod_1.z.object({
    id: zod_1.z.string(),
    title: zod_1.z.string(),
    description: zod_1.z.string().nullable(),
    isPrivate: zod_1.z.boolean().default(true),
    filters: exports.ZSegmentFilters,
    environmentId: zod_1.z.string(),
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date(),
    surveys: zod_1.z.array(zod_1.z.string()),
});
exports.ZSegmentCreateInput = zod_1.z.object({
    environmentId: zod_1.z.string(),
    title: zod_1.z.string(),
    description: zod_1.z.string().optional(),
    isPrivate: zod_1.z.boolean().default(true),
    filters: exports.ZSegmentFilters,
    surveyId: zod_1.z.string(),
});
exports.ZSegmentUpdateInput = zod_1.z
    .object({
    title: zod_1.z.string(),
    description: zod_1.z.string().nullable(),
    isPrivate: zod_1.z.boolean().default(true),
    filters: exports.ZSegmentFilters,
    surveys: zod_1.z.array(zod_1.z.string()),
})
    .partial();
