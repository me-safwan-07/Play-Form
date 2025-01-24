import { Request, Response } from "express";
import { prisma } from "../../database";

export const getResponses = async (req: Request, res: Response): Promise<void> => {
  const formId = req.params.formId;
  const { page = 1, limit = 10 } = req.query;

  try {
    const skip = (Number(page) - 1) * Number(limit);

    const [responses, total] = await Promise.all([
      prisma.response.findMany({
        where: { formId },
        include: {
          notes: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  email: true
                }
              }
            }
          }
        },
        skip,
        take: Number(limit),
        orderBy: { createdAt: 'desc' }
      }),
      prisma.response.count({ where: { formId } })
    ]);

    res.status(200).json({
      responses,
      pagination: {
        total,
        pages: Math.ceil(total / Number(limit)),
        page: Number(page),
        limit: Number(limit)
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createResponse = async (req: Request, res: Response): Promise<void> => {
  const formId = req.params.formId;
  const responseData = req.body;

  try {
    const response = await prisma.response.create({
      data: {
        ...responseData,
        formId
      },
      include: {
        notes: true
      }
    });

    res.status(201).json({ response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateResponse = async (req: Request, res: Response): Promise<void> => {
  const responseId = req.params.responseId;
  const updates = req.body;

  try {
    const response = await prisma.response.update({
      where: { id: responseId },
      data: updates,
      include: {
        notes: true
      }
    });

    res.status(200).json({ response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}; 