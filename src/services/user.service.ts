/* eslint-disable @typescript-eslint/no-explicit-any */
import { IUser } from '../interfaces/user.interface';
import User from '../models/user.model';

const createUser = async (userData: IUser): Promise<IUser> => {
  const result = await User.create(userData);
  return result;
};

const getAllUser = async (): Promise<IUser[]> => {
  const result = await User.find().select('username fullName age email address');
  return result.map(user => user.toObject() as IUser);
};



const getSingleUser = async (userId: number): Promise<IUser | null> => {
  const result = await User.findOne({ userId: userId }).select('-password');
  return result;
};


const updateUser = async (
  userId: number,
  userData: any,
): Promise<IUser | null> => {
  const result = await User.findOneAndUpdate( { userId: userId }, userData, {
    new: true,
    runValidators: true,
  });

  if (result) {
    return result.toObject() as IUser;
  } else {
    return null;
  }
};


const deleteUser = async (userId: number): Promise<IUser | null> => {
  const result = await User.findOneAndDelete({ userId: userId });
  return result;
};

export const userServices = {
  createUser,
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser,
};
