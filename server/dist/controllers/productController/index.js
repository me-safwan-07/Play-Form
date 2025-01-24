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
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProducts = void 0;
const database_1 = require("../../database");
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const formId = req.params.formId;
    try {
        const products = yield database_1.prisma.product.findMany({
            where: { formId },
            include: {
                environments: true
            }
        });
        res.status(200).json({ products });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.getProducts = getProducts;
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const formId = req.params.formId;
    const productData = req.body;
    try {
        const product = yield database_1.prisma.product.create({
            data: Object.assign(Object.assign({}, productData), { formId }),
            include: {
                environments: true
            }
        });
        res.status(201).json({ product });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.createProduct = createProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.productId;
    const updates = req.body;
    try {
        const product = yield database_1.prisma.product.update({
            where: { id: productId },
            data: updates,
            include: {
                environments: true
            }
        });
        res.status(200).json({ product });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.productId;
    try {
        yield database_1.prisma.product.delete({
            where: { id: productId }
        });
        res.status(200).json({ message: "Product deleted successfully" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.deleteProduct = deleteProduct;
