import { Request, Response } from "express";
import { error } from "console";
import { ValidationError } from "../../utils/errors";
import { TFormInput, TFormUpdateInput } from "../../types/forms";
import { validateInputs } from "../../utils/validate";
import { handleError } from "../../utils/error-handler";
// import { validateFormInput } from "../../validators/form.validator";
import { FormService } from "../../services/formService";

export class FormController {
  static async createForm(req: Request, res: Response) {
    try {
      const formData: TFormInput = req.body;

      // Validate form input
      // const validationError = validateFormInput(formData);
      // if (validationError) {
      //   return res.status(400).json({ error: validationError});
      // }

      // Add user ID from authenticated request
      
      const form = await FormService.createdForm(formData);
      res.status(200).json(form);
    } catch (error) {
      handleError(error, res);
    }
  }

  static async getAllForms(req: Request, res: Response) {
    try {
      const forms = await FormService.getAllForms();
      res.json(forms);
    } catch (error) {
      handleError(error, res);
    }
  }

  static async getFormById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const form = await FormService.getFormById(id);
      res.json(form);
    } catch (error) {
      handleError(error, res);
    }
  }

  static async updateForm(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const formData: TFormUpdateInput = req.body;
      
      const form = await FormService.updateForm(id, formData);
      res.json(form);
    } catch (error) {
      handleError(error, res);
    }
  }

  static async deleteForm(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const form = await FormService.deleteForm(id);
      res.json(form);
    } catch (error) {
      handleError(error, res);
    }
  }

  static async getUserForm(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      if (!userId) {
        return res.status(400).json({ error: "User not authenticated"});
      }

      const forms = await FormService.getFormsByUser(userId);
      res.json(forms);
    } catch (error) {
      handleError(error, res);
    }
  } 
}