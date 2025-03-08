import { Request, Response } from "express";
import { prisma } from "../../database";


export const createProduct = async (req: Request, res: Response): Promise<void> => {
  const formId = req.params.formId;
  const productData = req.body;

  try {
    const product = await prisma.product.create({
      data: {
        ...productData,
        formId
      },
      include: {
        environments: true
      }
    });

    res.status(201).json({ product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  const productId = req.params.productId;
  const updates = req.body;

  try {
    const product = await prisma.product.update({
      where: { id: productId },
      data: updates,
      include: {
        environments: true
      }
    });

    res.status(200).json({ product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  const productId = req.params.productId;

  try {
    await prisma.product.delete({
      where: { id: productId }
    });

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
