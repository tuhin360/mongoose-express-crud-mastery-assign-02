import { Schema, model } from 'mongoose';
import { IOrder } from '../interfaces/order.interface';

const orderSchema = new Schema<IOrder>({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  productQuantity: { type: Number, required: true },
});

const Order = model<IOrder>('Order', orderSchema);

export default Order;
