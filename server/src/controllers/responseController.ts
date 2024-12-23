import { Request, Response } from "express";
import { ResponseService } from "../services/responseService";
import { TResponseInput, ZResponseInput } from "../types/responses";
import { handleError } from "../utils/error-handler";
import { prisma } from "../database";

export class ResponseController {
  static async createResponse(req: Request, res: Response) {
    try {
      const responseData: TResponseInput = req.body;

      // Validate form input
      // const validationError = validateFormInput(formData);
      // if (validationError) {
      //   return res.status(400).json({ error: validationError});
      // }

      const validationError = ZResponseInput.safeParse(responseData);
      if (validationError.error) {
        return res.status(400).json({ error: validationError.error.message });
      }

      // Add user ID from authenticated request
      // const formExists = await prisma.form.findUnique({
      //   where: {
      //     id: responseData.formId,
      //   },
      // });

      // if(!formExists) {
      //   return res.status(400).json({ error: 'Form does not exist' });
      // }
      
      const response = await ResponseService.createdResponse(responseData);
      res.status(200).json(response);
    } catch (error) {
      handleError(error, res);
    }
  }

  static async getAllResponses(req: Request, res: Response) {
    try {
      const resposes = await ResponseService.getAllResponse();
      res.json(resposes);
    } catch (error) {
      handleError(error, res);
    }
  }

  static async getFormById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const form = await ResponseService.getResponseById(id);
      res.json(form);
    } catch (error) {
      handleError(error, res);
    }
  }

//   static async updateForm(req: Request, res: Response) {
//     try {
//       const { id } = req.params;
//       const formData: TFormUpdateInput = req.body;
      
//       const form = await FormService.updateForm(id, formData);
//       res.json(form);
//     } catch (error) {
//       handleError(error, res);
//     }
//   }

//   static async deleteForm(req: Request, res: Response) {
//     try {
//       const { id } = req.params;
//       const form = await FormService.deleteForm(id);
//       res.json(form);
//     } catch (error) {
//       handleError(error, res);
//     }
//   }

//   static async getUserForm(req: Request, res: Response) {
//     try {
//       const { userId } = req.params;
//       if (!userId) {
//         return res.status(400).json({ error: "User not authenticated"});
//       }

//       const forms = await FormService.getFormsByUser(userId);
//       res.json(forms);
//     } catch (error) {
//       handleError(error, res);
//     }
//   } 
}