import jwt, { JwtPayload } from "jsonwebtoken";
import { prisma } from "../database";

export const verifyToken = async (token: string, userEmail: string = ""): Promise<JwtPayload> => {
    if (!token) {
        throw new Error("No token found");
    }
    const decoded = jwt.decode(token);
    const payload: JwtPayload = decoded as JwtPayload;
    const { id } = payload;

    if (!userEmail) {
        const foundUser = await prisma.user.findUnique({
            where: {id},
        });

        if (!foundUser) {
            throw new Error("User not found");
        }
        userEmail = foundUser.email;
    }

    return jwt.verify(token, process.env.JWTAUTH_SECRET + userEmail) as JwtPayload;
}