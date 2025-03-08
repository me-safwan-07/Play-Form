import { Request, Response, NextFunction } from "express";
import { cache } from "../../config/cache";
import { validateInputs } from "../../utils/validate";
import { ZId } from "../../types/environment";
import { prisma } from "../../database";
import { Prisma } from "@prisma/client";
import { displayCache } from "./cache";


export const selectDisplay = {
  id: true,
  createdAt: true,
  updatedAt: true,
  surveyId: true,
  responseId: true,
  personId: true,
  status: true,
};

export const getDisplay = (req: Request, res: Response, next: NextFunction) => {
    const dispayId = req.params.displayId;
    cache(
        async () => {
            validateInputs([dispayId, ZId]);

            try {
                const display = await prisma.display.findUnique({
                    where: {
                        id: dispayId
                    },
                    select: selectDisplay,
                });

                if (!display) {
                    res.status(404).json({ message: "dispalay is not found" });
                }

                res.status(200).json({ display });
            } catch (error) {
                if (error instanceof Prisma.PrismaClientKnownRequestError) {
                    res.status(400).json({ databaseEror: error.message})
                }
                res.status(400).json({ error });
            }
        },
        `getDisplay-${dispayId}`,
        {
            tag: [displayCache.tag.byId(dispayId)]
        }
    )();
};

