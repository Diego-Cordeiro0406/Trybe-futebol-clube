import { Router } from 'express';
import UsersController from '../controllers/userController';
import Validations from '../middlewares/Validations';
import Auth from '../middlewares/auth';

const userController = new UsersController();

const userRouter = Router();

userRouter.post('/', Validations.validateLogin, (req, res) => userController.login(req, res));

userRouter
  .get('/role', Auth.validateToken, (req, res) => UsersController.findRole(req, res));

export default userRouter;
