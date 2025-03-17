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
exports.createEnvironment = exports.updateEnvironment = exports.getEnvironments = exports.getEnvironment = void 0;
const client_1 = require("@prisma/client");
const environment_cache_1 = require("../cache/environment.cache");
const cache_1 = require("../config/cache");
const database_1 = require("../database");
const environment_1 = require("../types/environment");
const errors_1 = require("../utils/errors");
const zod_1 = require("zod");
const getEnvironment = (environmentId) => (0, cache_1.cache)(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const environment = yield database_1.prisma.environment.findUnique({
            where: {
                id: environmentId,
            },
        });
        return environment;
    }
    catch (error) {
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            console.error(error);
            throw new errors_1.DatabaseError(error.message);
        }
        throw error;
    }
}), `getEnvironment-${environmentId}`, {
    tag: [environment_cache_1.environmentCache.tag.byId(environmentId)]
})();
exports.getEnvironment = getEnvironment;
const getEnvironments = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, cache_1.cache)(() => __awaiter(void 0, void 0, void 0, function* () {
        let productPrisma;
        try {
            productPrisma = yield database_1.prisma.product.findFirst({
                where: {
                    id: productId,
                },
                include: {
                    environments: true,
                },
            });
            if (!productPrisma) {
                throw new errors_1.ResourceNotFoundError("Product", productId);
            }
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                console.error(error);
                throw new errors_1.DatabaseError(error.message);
            }
            throw error;
        }
        const environments = [];
        for (let environment of productPrisma.environments) {
            let targetEnvironment = environment_1.ZEnvironment.parse(environment);
            environments.push(targetEnvironment);
        }
        try {
            return environments;
        }
        catch (error) {
            if (error instanceof zod_1.z.ZodError) {
                console.error(JSON.stringify(error.errors, null, 2));
            }
            throw new errors_1.ValidationError("Data validation of environments array failed");
        }
    }), `getEnvironments-${productId}`, {
        tag: [environment_cache_1.environmentCache.tag.byProductId(productId)],
    })();
});
exports.getEnvironments = getEnvironments;
const updateEnvironment = (environmentId, data) => __awaiter(void 0, void 0, void 0, function* () {
    const newData = Object.assign(Object.assign({}, data), { updatedAt: new Date() });
    let updateEnvironment;
    try {
        updateEnvironment = yield database_1.prisma.environment.update({
            where: {
                id: environmentId,
            },
            data: newData,
        });
        environment_cache_1.environmentCache.revalidate({
            id: environmentId,
            productId: updateEnvironment.productId,
        });
        return updateEnvironment;
    }
    catch (error) {
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            throw new errors_1.DatabaseError(error.message);
        }
        throw error;
    }
});
exports.updateEnvironment = updateEnvironment;
// TODO - create the "getFirstEnvironmentByUserId" if neccessary
const createEnvironment = (productId, environmentInput) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const environment = yield database_1.prisma.environment.create({
            data: {
                type: environmentInput.type || "development",
                product: { connect: { id: productId } },
            },
        });
        environment_cache_1.environmentCache.revalidate({
            id: environment.id,
            productId: environment.productId,
        });
        return environment;
    }
    catch (error) {
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            throw new errors_1.DatabaseError(error.message);
        }
        throw error;
    }
});
exports.createEnvironment = createEnvironment;
