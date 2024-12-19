import { Response } from "@prisma/client";
import { prisma } from "../database";
import { NotFoundError } from "../utils/errors";
import { TResponseInput } from "../types/responses";

const responseSelection = {
    id: true,
    createdAt: true,
    updatedAt: true,
    finished: true
}

export class ResponseService {
  static async createdResponse(data: TResponseInput): Promise<Response> {
    return prisma.response.create({
      data: {
        ...data,
        finished: data.finished ?? false,
      }
    }); 
  }

  static async getAllResponse(): Promise<Response[]> {
    return prisma.response.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  static async getResponseById(id: string): Promise<Response> {
    const response = await prisma.response.findUnique({
      where: { id },
    });

    if (!response) {
      throw new NotFoundError('Response not found');
    }

    return response;
  }

//   static async updateResponse(id: string, data: TFormUpdateInput): Promise<Response> {
//     const form = await prisma.response.findUnique({
//       where: { id },
//     });

//     if (!form) {
//       throw new NotFoundError('Form not found');
//     }

//     return prisma.response.update({
//       where: { id },
//       data,
//     });
//   }

//   static async deleteResponse(id: string): Promise<Response> {
//     const form = await prisma.response.findUnique({
//       where: { id },
//     });

//     if (!form) {
//       throw new NotFoundError('Form not found');
//     }

//     return prisma.response.delete({
//       where: { id },
//     });
//   }

//   static async getResponseByUser(id: string): Promise<Response[]> {
//     return prisma.response.findMany({
//       where: { id },
//       orderBy: {
//         createdAt: 'desc',
//       },
//     });
//   }
}