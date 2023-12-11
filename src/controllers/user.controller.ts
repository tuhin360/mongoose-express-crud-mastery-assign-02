import { Request, Response } from 'express';
import User from '../models/user.model';

const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    console.log(userData);
    const result = await User.create(userData);
    res.status(201).json({
      status: 'success',
      message: 'User created successfully',
      data: result,
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      status: 'fail',
      message: error.message || 'Something went wrong',
    });
  }
};

export const userController = {
  createUser,
};
