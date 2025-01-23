// import { Prisma, Response } from "@prisma/client";
// import { prisma } from "../database";
// import { NotFoundError } from "../utils/errors";
// import { TResponse, TResponseInput } from "../types/responses";

// const responseSelection = {
//     id: true,
//     createdAt: true,
//     updatedAt: true,
//     finished: true,
//     formId: true,
// }

// export class ResponseService {
//   static async createdResponse(data: TResponseInput): Promise<TResponse> {
//     try {
//       const prismaData: Prisma.ResponseCreateInput = {
//         form: {
//           connect: {
//             id: data.formId,
//           },
//         },
//         finished: data.finished,
//       };

//       return await prisma.response.create({
//         data: prismaData,
//         select: responseSelection
//       });

//     } catch (error: any) {
//       // if (error.code === 'P2002') {
//       //   throw new Error('A response with the same surveyId and singleUseId already exists.');
//       // }
//       console.error(error)
//       throw error;
//     } 
//   };

//   static async getAllResponse(): Promise<TResponse[]> {
//     return prisma.response.findMany({
//       orderBy: {
//         createdAt: 'desc',
//       },
//       select: responseSelection
//     });
//   }

//   static async getResponseById(id: string): Promise<TResponse> {
//     const response = await prisma.response.findUnique({
//       where: { id },
//       select: responseSelection
//     });

//     if (!response) {
//       throw new NotFoundError('Response not found');
//     }

//     return response;
//   }

// //   static async updateResponse(id: string, data: TFormUpdateInput): Promise<Response> {
// //     const form = await prisma.response.findUnique({
// //       where: { id },
// //     });

// //     if (!form) {
// //       throw new NotFoundError('Form not found');
// //     }

// //     return prisma.response.update({
// //       where: { id },
// //       data,
// //     });
// //   }

// //   static async deleteResponse(id: string): Promise<Response> {
// //     const form = await prisma.response.findUnique({
// //       where: { id },
// //     });

// //     if (!form) {
// //       throw new NotFoundError('Form not found');
// //     }

// //     return prisma.response.delete({
// //       where: { id },
// //     });
// //   }

// //   static async getResponseByUser(id: string): Promise<Response[]> {
// //     return prisma.response.findMany({
// //       where: { id },
// //       orderBy: {
// //         createdAt: 'desc',
// //       },
// //     });
// //   }
// }