import { Request, Response } from 'express';
import { getSurvey } from '../../services/formService'; // Service that handles database logic
import { DatabaseError } from '../../types/errors';

// Controller to handle survey fetching
export const fetchSurvey = async (req: Request, res: Response): Promise<void> => {
  const { surveyId } = req.params;

  try {
    const survey = await getSurvey(surveyId);

    if (!survey) {
      res.status(404).json({ message: 'Survey not found' });
      return;
    }

    res.json(survey);
  } catch (error) {
    if (error instanceof DatabaseError) {
      res.status(500).json({ message: error.message });
      return;
    }

    res.status(500).json({ message: 'Internal server error' });
  }
};
