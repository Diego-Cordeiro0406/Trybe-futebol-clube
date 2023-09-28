import { Router } from 'express';
import UsersController from '../controllers/userController';

const userController = new UsersController();

const userRouter = Router();

userRouter.get('/', (req, res) => userController.findAll(req, res));

userRouter.get('/:id', (req, res) => userController.findById(req, res));

export default userRouter;
