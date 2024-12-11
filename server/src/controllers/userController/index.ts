import { Request, Response, NextFunction } from "express";
import { CreateUser } from "../../services/userService";
import { TUserCreateInput } from "../../types/user";

export const createUserController = async (
  req: Request<{}, {}, TUserCreateInput>, 
  res: Response, 
  next: NextFunction
): Promise<void> => {
  try {
    const userData: TUserCreateInput = req.body;
    
    const user = await CreateUser(userData);
    
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
