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
exports.updateEnvironmentController = exports.createEnvironmentController = exports.getEnvironmentsController = exports.getEnvironmentController = void 0;
const environment_services_1 = require("../services/environment.services");
const errors_1 = require("../utils/errors");
const database_1 = require("../database");
const getEnvironmentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const { environmentId } = req.params;
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
        const environment = yield (0, environment_services_1.getEnvironment)(environmentId);
        if (!environment) {
            throw new errors_1.ResourceNotFoundError('Environment', environmentId);
        }
        res.status(200).json(environment);
    }
    catch (error) {
        if (error instanceof errors_1.DatabaseError || error instanceof errors_1.ResourceNotFoundError) {
            res.status(404).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
});
exports.getEnvironmentController = getEnvironmentController;
const getEnvironmentsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const { productId } = req.params;
    try {
        const environments = yield (0, environment_services_1.getEnvironments)(productId);
        if (!environments) {
            throw new errors_1.ResourceNotFoundError('ProductId', productId);
        }
        res.status(200).json(environments);
    }
    catch (error) {
        if (error instanceof errors_1.DatabaseError || error instanceof errors_1.ResourceNotFoundError) {
            res.status(404).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
});
exports.getEnvironmentsController = getEnvironmentsController;
const createEnvironmentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.params;
    const environmentInput = req.body;
    try {
        const environment = yield (0, environment_services_1.createEnvironment)(productId, Object.assign({}, environmentInput));
        res.status(201).json(environment);
    }
    catch (error) {
        if (error instanceof errors_1.DatabaseError || error instanceof errors_1.ValidationError) {
            res.status(400).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
});
exports.createEnvironmentController = createEnvironmentController;
const updateEnvironmentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { environmentId } = req.params;
    const data = req.body;
    try {
        const environment = yield (0, environment_services_1.getEnvironment)(environmentId);
        if (!environment) {
            throw new errors_1.ResourceNotFoundError('Environment', environmentId);
        }
        const updatedEnvironment = yield (0, environment_services_1.updateEnvironment)(environmentId, data);
        res.status(200).json(environment_services_1.updateEnvironment);
    }
    catch (error) {
        if (error instanceof errors_1.DatabaseError || error instanceof errors_1.ResourceNotFoundError) {
            res.status(404).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
});
exports.updateEnvironmentController = updateEnvironmentController;
