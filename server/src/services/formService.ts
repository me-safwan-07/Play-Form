import { prisma } from "../database"

export const selectForm = {
  id: true,
  createdAt: true,
  updatedAt: true,
  name: true,
  environmentId: true,
  createdBy: true,
  status: true,
  welcomeCard: true,
  questions: true,
  thankYouCard: true,
  displayOptions: true,
  recontactDays: true,
  displayLimit: true,
  autoClose: true,
  runOnDate: true,
  closeOnDate: true,
  delay: true,
  displayPercentage: true,
  autoComplete: true,
  verifyEmail: true,
  redirectUrl: true,
  productOverwrites: true,
  styling: true,
  surveyClosedMessage: true,
  singleUse: true,
  pin: true,
  resultShareKey: true,
  segment: {
    include: {
      forms: {
        select: {
          id: true,
        },
      },
    },
  },
};

export const getForm = async(formId: string, userId: string = "") => {
    if (!formId || !userId) {
        throw new Error("All fields as required")
    }

    const form = await prisma.form.findUnique({
        where: {
            id: formId,
            createdBy: userId,
        },
        select: selectForm
    });

    return form;
};