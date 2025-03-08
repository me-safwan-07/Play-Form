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
exports.deleteUser = exports.updateUserById = exports.createUserController = exports.getUserById = void 0;
const database_1 = require("../../database");
const cache_1 = require("../../config/cache");
const client_1 = require("@prisma/client");
const cache_2 = require("./cache");
const responseSelection = {
    id: true,
    name: true,
    email: true,
    emailVerified: true,
    imageUrl: true,
    createdAt: true,
    updatedAt: true,
    identityProvider: true,
};
// function to retrive basic information about a user's user
const getUserById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, cache_1.cache)(() => __awaiter(void 0, void 0, void 0, function* () {
        const id = req.body.id;
        try {
            const user = yield database_1.prisma.user.findUnique({
                where: {
                    id,
                },
                select: responseSelection
            });
            if (!user) {
                return null;
            }
            res.status(200).json(user);
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                res.status(400).json({ error: `Database Error: ${error.message}` });
            }
            else {
                res.status(500).json({ error: "Internal server error" });
            }
            next(error);
        }
    }), `getUser-${req.body.id}`, {
        tag: [cache_2.userCache.tag.byId(req.body.id)],
    })();
});
exports.getUserById = getUserById;
const createUserController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = req.body;
        // const user = await CreateUser(userData);
        res.status(200).json({
            success: true,
            data: userData,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.createUserController = createUserController;
// export const getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//   try {
//     const { id } = req.params;
//     const user = await prisma.user.findUnique({
//       where: { id },
//       select: responseSelection
//     });
//     if (!user) {
//       res.status(404).json({ success: false, message: 'User not found' });
//       return 
//     };
//     res.json(user);
//     next();
//   } catch (error) {
//     res.status(404).json({ error: 'Failed to get user' });
//     next(error);
//   }
// };
const updateUserById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const updatedUser = yield database_1.prisma.user.update({
            where: { id },
            data: req.body,
            select: responseSelection
        });
        if (!updatedUser) {
            res.status(404).json({ success: false, message: 'User not found' });
            return;
        }
        res.json(updatedUser);
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to update user' });
        next(err);
    }
});
exports.updateUserById = updateUserById;
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedUser = yield database_1.prisma.user.delete({
            where: { id }
        });
        res.status(204).send('User deleted successfully');
        next();
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete user' });
        next(error);
    }
});
exports.deleteUser = deleteUser;
