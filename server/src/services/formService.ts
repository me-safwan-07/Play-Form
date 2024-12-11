import { Prisma } from "@prisma/client";
import { DatabaseError } from '../types/errors'; // Custom error class
import { transformPrismaSurvey } from '../utils/formsUtils'; // Utility functions
import { prisma } from "../database";
import { TForm, TFormInput } from "../types/forms";
import { validateInputs } from "../utils/validate";
import { ZId } from "../types/environment";

export const selectSurvey = {
    id: true,
    createdAt: true,
    updatedAt: true,
    name: true,
    createdBy: true,
};

export const getSurvey = async (surveyId: string): Promise<TForm | null> => {
  validateInputs([surveyId, ZId]);

  let surveyPrisma;
  try {
    surveyPrisma = await prisma.form.findUnique({
      where: {
        id: surveyId,
      },
      select: selectSurvey,
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      throw new DatabaseError(error.message);
    }
    throw error;
  }

  if (!surveyPrisma) {
    return null;
  }

  return transformPrismaSurvey(surveyPrisma);
};

// export const createForm = async (environmentId: string, formBody: TFormInput): Promise<TForm> => {
//   validateInputs([environmentId, ZId]);

//   try {
//     const createdBy = formBody.createdBy;
//     // delete createdBy;

//     const survey = await prisma.form.create({
//       data: {
//         ...formBody.data,
//         environment: {
//           connect: {
//             id: environmentId,
//           },
//         },
//       },
//       select: selectSurvey,
//     });

//     return transformPrismaSurvey(survey);
//   }
// }