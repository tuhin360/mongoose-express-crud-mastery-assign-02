/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { userServices } from '../services/user.service';

import Joi from 'joi';
import { IUser } from '../interfaces/user.interface';

const userSchema = Joi.object({
  userId: Joi.number().required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
  fullName: Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
  }).required(),
  age: Joi.number().required(),
  email: Joi.string().email().required(),
  isActive: Joi.boolean().required(),
  hobbies: Joi.array().items(Joi.string()).required(),
  address: Joi.object({
    street: Joi.string().required(),
    city: Joi.string().required(),
    country: Joi.string().required(),
  }).required(),
});

const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;

    const { error } = userSchema.validate(userData);

    if (error) {
      res.status(500).json({
        status: 'fail',
        message:'Something went wrong',
        error:error.details,
      });
    }
 

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

    if (result instanceof IUser) {
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

// const getSingleUser = async (req: Request, res: Response) => {
//   try {
//     const userIdString = req.params.userId;
//     const userId = parseInt(userIdString, 10);

//     const result = await userServices.getSingleUser(userId);

//     if (result) {
//       res.status(200).json({
//         success: true,
//         message: 'User fetched successfully',
//         data: result,
//       });
//     } else {
//       res.status(404).json({
//         success: false,
//         message: 'User not found',
//         error: {
//           code: 404,
//           description: 'User not found!',
//         },
//       });
//     }
//   } catch (error: any) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: 'Internal Server Error',
//       error: {
//         code: 500,
//         description: 'Something went wrong',
//       },
//     });
//   }
// };

const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    const userData = req.body;

    const { error } = userSchema.validate(userData);
    if (error) {
      return res.status(400).json({
        status: 'fail',
        message: error.message,
      });
    }

    const result = await userServices.updateUser(userId, userData);

    if (result) {
      res.status(200).json({
        success: true,
        message: 'User updated successfully',
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
    console.log(error);
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

// const updateUser = async (
//   userId: number,
//   userData: any,
// ): Promise<IUser | null> => {
//   const result = await User.findByIdAndUpdate(userId, userData, {
//     new: true,
//     runValidators: true,
//   });

//   if (result) {
//     const userObject = result.toObject();
//     const updatedUser = userObject as IUser;
//     return updatedUser;
//   } else {
//     return null;
//   }
// };

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
