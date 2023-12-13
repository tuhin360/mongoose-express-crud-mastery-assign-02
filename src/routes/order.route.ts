import express from 'express';
import { orderController } from '../controllers/order.controller';

const router = express.Router();

router.put('/users/:userId/orders', orderController.addOrder);
router.get('/users/:userId/orders', orderController.getAllOrdersForUser);
router.get('/users/:userId/orders/total-price', orderController.getAllOrdersForUser);

export { router as orderRouter };
