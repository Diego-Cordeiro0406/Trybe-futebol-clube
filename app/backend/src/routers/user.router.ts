import { Router } from 'express';
import UsersController from '../controllers/userController';
import Validations from '../middlewares/Validations';

const userController = new UsersController();

const userRouter = Router();

userRouter.post('/', Validations.validateLogin, (req, res) => userController.login(req, res));

export default userRouter;
