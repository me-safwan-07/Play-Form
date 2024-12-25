"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZBaseStyling = exports.ZFormStylingBackground = exports.ZCardArrangementOptions = exports.ZStylingColor = void 0;
const zod_1 = require("zod");
const common_1 = require("./common");
exports.ZStylingColor = zod_1.z.object({
    light: common_1.ZColor,
    dark: common_1.ZColor.nullish(),
});
exports.ZCardArrangementOptions = zod_1.z.enum(["casual", "straight", "simple"]);
exports.ZFormStylingBackground = zod_1.z
    .object({
    bg: zod_1.z.string().nullish(),
    bgType: zod_1.z.enum(["animation", "color", "image", "upload"]).nullish(),
    brightness: zod_1.z.number().nullish(),
})
    .refine((formBackground) => {
    if (formBackground.bgType === 'upload') {
        return !!formBackground.bg;
    }
    return true;
}, { message: 'Invalid background' });
exports.ZBaseStyling = zod_1.z.object({
    brandColor: exports.ZStylingColor.nullish(),
    questionColor: exports.ZStylingColor.nullish(),
    inputColor: exports.ZStylingColor.nullish(),
    inputBorderColor: exports.ZStylingColor.nullish(),
    cardBackgroundColor: exports.ZStylingColor.nullish(),
    cardBorderColor: exports.ZStylingColor.nullish(),
    cardShadowColor: exports.ZStylingColor.nullish(),
    highlightBorderColor: exports.ZStylingColor.nullish(),
    isDarkModeEnabled: zod_1.z.boolean().nullish(),
    roundness: zod_1.z.number().nullish(),
    hideProgressBar: zod_1.z.boolean().nullish(),
    isLogoHidden: zod_1.z.boolean().nullish(),
    cardArrangement: exports.ZCardArrangementOptions.nullish(),
    background: exports.ZFormStylingBackground.nullish(),
});
