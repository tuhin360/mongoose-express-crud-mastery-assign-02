import { Schema, model } from 'mongoose';
import { IUser } from '../interfaces/user.interface';

const userSchema = new Schema<IUser>({
  userId: {
    type: Number,
    required: [true, 'Please provide your userId'],
    unique: true,
  },
  username: {
    type: String,
    required: [true, 'Please provide your username'],
  },
  password: {
    type: String,
    required: [true, 'Please provide your password'],
  },
  fullName: {
    firstName: {
      type: String,
      required: [true, 'Please provide your first name'],
    },
    lastName: {
      type: String,
      required: [true, 'Please provide your last name'],
    },
  },
  age: {
    type: Number,
    required: [true, 'Please provide your age'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
  },
  isActive: {
    type: Boolean,
    required: [true, 'Please specify if the user is active'],
  },
  hobbies: {
    type: [String],
    required: [true, 'Please provide your hobby'],
  },
  address: {
    street: {
      type: String,
      required: [true, 'Please provide your street address'],
    },
    city: {
      type: String,
      required: [true, 'Please provide your city'],
    },
    country: {
      type: String,
      required: [true, 'Please provide a your country'],
    },
  },
  orders: [
    {
      productName: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
});

const User = model<IUser>('User', userSchema);

export default User;
