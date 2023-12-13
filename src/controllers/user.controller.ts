/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { userServices } from '../services/user.service';
import { IUser } from '../interfaces/user.interface';
import User from '../models/user.model';

const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const result = await userServices.createUser(userData);

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

const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllUser();
    res.status(200).json({
      statusCode: 'success',
      message: 'User fetched successfully!',
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

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const userIdString = req.params.userId;
    const userId = parseInt(userIdString, 10);

    const result = await userServices.getSingleUser(userId);

    if (result) {
      res.status(200).json({
        success: true,
        message: 'User fetched successfully',
        data: result,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: {
        code: 500,
        description: 'Something went wrong',
      },
    });
  }
};

const updateUser = async (
  userId: number,
  userData: any,
): Promise<IUser | null> => {
  const result = await User.findByIdAndUpdate(userId, userData, {
    new: true,
    runValidators: true,
  });

  if (result) {
    const userObject = result.toObject();
    const updatedUser = userObject as IUser;
    return updatedUser;
  } else {
    return null;
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    await userServices.deleteUser(userId);
    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: null,
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

export const userController = {
  createUser,
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser,
};
