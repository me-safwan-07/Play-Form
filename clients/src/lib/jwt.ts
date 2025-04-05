// import jwt, { JwtPayload } from "jsonwebtoken";
// import { JWT_SECRET } from "./constants";


// export const createToken = (userId: string, userEmail: string, options = {}): string => {
//     return jwt.sign({ id: userId }, JWT_SECRET + userEmail, options);
// };

// export const verifyToken = async (token: string, userEmail: string = ""): Promise<JwtPayload> => {
//     if (!token) {
//         throw new Error("No token found");
//     }
//     const decoded = jwt.decode(token);
//     const payload: JwtPayload = decoded as JwtPayload;
//     const { id } = payload;

//     if (!userEmail) {
//         const foundUser = await prisma
//     }
// }