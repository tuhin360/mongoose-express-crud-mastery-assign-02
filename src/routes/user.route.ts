import express  from 'express';
import { userController } from '../controllers/user.controller';

const router = express.Router();

router.post('/users', userController.createUser);
router.get('/users', userController.getAllUser);
router.get('/users/:id', userController.getSingleUser);
router.patch('/:id', userController.updateUser);
// router.delete('/:id', userController.deleteUser);

export const userRouter = router;
