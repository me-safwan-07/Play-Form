import { Form } from "@prisma/client";
import { FormInput, FormUpdateInput } from "../types/forms";
import { prisma } from "../database";
import { NotFoundError } from "../utils/errors";

export class FormService {
  static async createdForm(data: FormInput): Promise<Form> {
    return prisma.form.create({
      data: {
        name: data.name,
        createdBy: data.createdBy,
        status: data.status || 'draft',
      },
    });
  }

  static async getAllForms(): Promise<Form[]> {
    return prisma.form.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  static async getFormById(id: string): Promise<Form> {
    const form = await prisma.form.findUnique({
      where: { id },
    });

    if (!form) {
      throw new NotFoundError('Form not found');
    }

    return form;
  }

  static async updateForm(id: string, data: FormUpdateInput): Promise<Form> {
    const form = await prisma.form.findUnique({
      where: { id },
    });

    if (!form) {
      throw new NotFoundError('Form not found');
    }

    return prisma.form.update({
      where: { id },
      data,
    });
  }

  static async deleteForm(id: string): Promise<Form> {
    const form = await prisma.form.findUnique({
      where: { id },
    });

    if (!form) {
      throw new NotFoundError('Form not found');
    }

    return prisma.form.delete({
      where: { id },
    });
  }
}