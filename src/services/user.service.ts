import { IUser } from '../interfaces/user.interface';
import User from '../models/user.model';

const createUser = async (userData: IUser): Promise<IUser> => {
  const result = await User.create(userData);
  return result;
};

const getAllUser = async (): Promise<IUser[]> => {
  const result = await User.find().select('username fullName age email address');
  return result.map(user => ({
    username: user.username,
    fullName: user.fullName,
    age: user.age,
    email: user.email,
    address: user.address,
  }));
};


const getSingleUser = async (userId: number): Promise<IUser | null> => {
  const result = await User.findOne({ userId: userId }).select('-password');
  return result;
};


const updateUser = async (
  id: string,
  userData: IUser,
): Promise<IUser | null> => {
  const result = await User.findByIdAndUpdate(id, userData, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findByIdAndDelete(id);
  return result;
};

export const userServices = {
  createUser,
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser,
};
