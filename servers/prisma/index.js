// import PrismaClient from "@prisma/client";
// import { withAccelerate } from "@prisma/extension-accelerate";

// const prismaClientSingleton = () => {
//     return new PrismaClient({
//         datasources: { db: { url: process.env.DATABASE_URL } },
//         ...(process.env.DEBUG === '1' && {
//             log: ['query', 'info'],
//         }),
//     }).$extends(withAccelerate());
// };

// const globalForPrisma = globalThis;

// globalForPrisma.prisma = globalForPrisma.prisma || prismaClientSingleton();

// export const prisma = globalForPrisma.prisma;

// if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default prisma;