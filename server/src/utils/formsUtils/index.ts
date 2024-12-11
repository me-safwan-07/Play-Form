import { TForm } from "../../types/forms";
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