import { validationResult } from 'express-validator';
import { getUser, getUserByEmail, createUser, deleteUserById, updateUser } from '../services/user.services.js';

export const getUserController = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;

  try {
    const user = await getUser(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

export const getUserByEmailController = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email } = req.params;

  try {
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

export const updateUserController = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { personId } = req.params;
  const  data = req.body;


  try {
    const updatedUser = await updateUser(personId, data);

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    } 

    res.json({ success: true, data: updatedUser });
  } catch (error) {
    next(error);
  };
};

export const deleteUserByIdController = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;

  try {
    const user = await deleteUserById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    } 

    res.status(201).json({
      success: true,
      message: 'User deleted successfully',
      data: user,
    });
  } catch (error) {
    next(error);
  }
}

export const createUserController = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const data = req.body;

  try {
    // Create user
    const user = await createUser(data);

    // Return success response
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};