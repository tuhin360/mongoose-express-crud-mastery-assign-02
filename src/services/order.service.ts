import User from '../models/user.model';
import { IOrder } from '../interfaces/order.interface';

interface ErrorResponse {
    success: boolean;
    message: string;
    error: {
      code: number;
      description: string;
    };
  }

const addOrderToUser = async (
  userId: number,
  orderData: IOrder,
): Promise<{ success: boolean; message: string; data: null }> => {
  try {
    const user = await User.findOne({ userId });

    if (!user) {
      throw {
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      };
    }

    if (!user.orders) {
      user.orders = [];
    }

    user.orders.push(orderData);
    await user.save();

    return {
      success: true,
      message: 'Order created successfully!',
      data: null,
    };
  } catch (error) {
    console.error(error);
    throw {
      success: false,
      message: 'Something went wrong',
      error: {
        code: 500,
        description: 'Something went wrong',
      },
    };
  }
};

const getAllOrdersForUser = async (
    userId: number
  ): Promise<{ success: boolean; message: string; data?: { orders: IOrder[] } } | ErrorResponse> => {
    try {
      const user = await User.findOne({ userId });
  
      if (!user) {
        const errorResponse: ErrorResponse = {
          success: false,
          message: 'User not found',
          error: {
            code: 404,
            description: 'User not found!',
          },
        };
        return errorResponse;
      }
  
      
      const orders = user.orders || [];
  
      return {
        success: true,
        message: 'Orders fetched successfully!',
        data: {
          orders,
        },
      };
    } catch (error) {
      console.error(error);
      const errorResponse: ErrorResponse = {
        success: false,
        message: 'Something went wrong',
        error: {
          code: 500,
          description: 'Internal Server Error',
        },
      };
      return errorResponse;
    }
  };

export const orderServices = {
  addOrderToUser,
  getAllOrdersForUser,
};
