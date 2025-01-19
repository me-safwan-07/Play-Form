// import { Form } from "@prisma/client";
// import { TFormInput, TFormUpdateInput } from "../types/forms";
// import { prisma } from "../database";
// import { NotFoundError } from "../utils/errors";

// export class FormService {
//   static async createdForm(data: TFormInput): Promise<Form> {
//     return prisma.form.create({

//       data: {
//         name: data.name,
//         // createdBy: data.createdBy,
//         status: data.status || 'draft',
//         welcomeCard: data.welcomeCard,
//         questions: data.questions, 
//         thankYouCard: data.thankYouCard,
//       },
//     });
//   }

//   static async getAllForms(): Promise<Form[]> {
//     return prisma.form.findMany({
//       orderBy: {
//         createdAt: 'desc',
//       },
//     });
//   }

//   static async getFormById(id: string): Promise<Form> {
//     const form = await prisma.form.findUnique({
//       where: { id },
//     });

//     if (!form) {
//       throw new NotFoundError('Form not found');
//     }

//     return form;
//   }

//   static async updateForm(id: string, data: TFormUpdateInput): Promise<Form> {
//     const form = await prisma.form.findUnique({
//       where: { id },
//     });

//     if (!form) {
//       throw new NotFoundError('Form not found');
//     }

//     return prisma.form.update({
//       where: { id },
//       data,
//     });
//   }

//   static async deleteForm(id: string): Promise<Form> {
//     const form = await prisma.form.findUnique({
//       where: { id },
//     });

//     if (!form) {
//       throw new NotFoundError('Form not found');
//     }

//     return prisma.form.delete({
//       where: { id },
//     });
//   }

//   static async getFormsByUser(id: string): Promise<Form[]> {
//     return prisma.form.findMany({
//       where: { id },
//       orderBy: {
//         createdAt: 'desc',
//       },
//     });
//   }
// }