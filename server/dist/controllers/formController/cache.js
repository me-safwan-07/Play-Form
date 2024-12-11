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
const cacache = require('cacache');
const surveyCache = {
    tag: {
        byId(id) {
            return `surveys-${id}`;
        },
        byEnvironmentId(environmentId) {
            return `environments-${environmentId}-surveys`;
        },
        byAttributeClassId(attributeClassId) {
            return `attributeFilters-${attributeClassId}-surveys`;
        },
        byActionClassId(actionClassId) {
            return `actionClasses-${actionClassId}-surveys`;
        },
        bySegmentId(segmentId) {
            return `segments-${segmentId}-surveys`;
        },
    },
    revalidate(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id, attributeClassId, actionClassId, environmentId, segmentId }) {
            const cachePath = '/path/to/cache'; // Replace with your cache directory
            if (id) {
                yield this.invalidateCache(this.tag.byId(id), cachePath);
            }
            if (attributeClassId) {
                yield this.invalidateCache(this.tag.byAttributeClassId(attributeClassId), cachePath);
            }
            if (actionClassId) {
                yield this.invalidateCache(this.tag.byActionClassId(actionClassId), cachePath);
            }
            if (environmentId) {
                yield this.invalidateCache(this.tag.byEnvironmentId(environmentId), cachePath);
            }
            if (segmentId) {
                yield this.invalidateCache(this.tag.bySegmentId(segmentId), cachePath);
            }
        });
    },
    invalidateCache(tag, cachePath) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Check if the cache for the tag exists, if so, remove it
                const cacheKey = tag;
                yield cacache.rm.cache(cachePath, cacheKey);
                console.log(`Cache invalidated for: ${tag}`);
            }
            catch (error) {
                console.error(`Error invalidating cache for ${tag}:`, error);
            }
        });
    },
};
module.exports = surveyCache;
