import { Prisma } from "@prisma/client";
import { TForm, TFormFilterCriteria } from "../../types/forms";
import { TSegment } from "../../types/segment";

export const transformPrismaSurvey = (surveyPrisma: any): TForm => {
  let segment: TSegment | null = null;

  if (surveyPrisma.segment) {
    segment = {
      ...surveyPrisma.segment,
      surveys: surveyPrisma.segment.surveys.map(({survey}: any) => survey.id),
    };
  }

  const transformedSurvey: TForm = {
    ...surveyPrisma,
    displayPercentage: Number(surveyPrisma.displayPercentage) || null,
    segment,
  };

  return transformedSurvey;
};

export const buildWhereClause = (filterCriteria: TFormFilterCriteria) => {
  const whereClause: Prisma.FormWhereInput["AND"] = [];

  // for name
  if (filterCriteria?.name) {
    whereClause.push({ name: { contains: filterCriteria.name, mode:"insensitive" } });
  }

  // for status
  if (filterCriteria?.status && filterCriteria?.status?.length) {
    whereClause.push({ status:  {in: filterCriteria.status }});
  }

  return { AND: whereClause };
};

export const buildOrderByClause = (sortBy: string): Prisma.FormOrderByWithRelationInput[] | undefined => {
  if (!sortBy) {
    return undefined;
  }

  if (sortBy === "name") {
    return [{ name: 'asc' }];
  }

  return [{ [sortBy]: 'desc' }];
}