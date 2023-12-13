/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Request, Response } from 'express';
import { orderServices } from '../services/order.service';
import { IOrder } from '../interfaces/order.interface';

const addOrder = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    const orderData: IOrder = req.body;

    await orderServices.addOrderToUser(userId, orderData);

    res.status(201).json({
      success: true,
      message: 'Order created successfully!',
      data: null,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message || 'Internal Server Error',
      error: {
        code: 500,
        description: 'Something went wrong',
      },
    });
  }
};

const getAllOrdersForUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    const result = await orderServices.getAllOrdersForUser(userId);

    if (result.success) {
      if ('data' in result) {
        res.status(200).json({
          success: true,
          message: 'Order fetched successfully!',
          data: result.data,
        });
      } else {
        res.status(200).json({
          success: true,
          message: 'No orders found for the user.',
          data: null,
        });
      }
    } else {
      const errorResponse = result as any;
      res.status(errorResponse.error.code).json({
        success: false,
        message: errorResponse.message,
        error: errorResponse.error,
        data: null,
      });
    }
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message || 'Internal Server Error',
      error: {
        code: 500,
        description: 'Something went wrong',
      },
      data: null,
    });
  }
};

export const orderController = {
  addOrder,
  getAllOrdersForUser,
};
