import express  from 'express';
import { userController } from '../controllers/user.controller';

const router = express.Router();

router.post('/users', userController.createUser);
router.get('/users', userController.getAllUser);
router.get('/users/:userId', userController.getSingleUser);
router.patch('/users/:userId', userController.updateUser);
router.delete('/users/:userId', userController.deleteUser);

export const userRouter = router;
