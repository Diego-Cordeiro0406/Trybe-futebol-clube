import { Router } from 'express';
import UsersController from '../controllers/userController';
import Validations from '../middlewares/Validations';
import Auth from '../middlewares/auth';

const userController = new UsersController();

const loginRouter = Router();

loginRouter.post('/', Validations.validateLogin, (req, res) => userController.login(req, res));

loginRouter
  .get('/role', Auth.validateToken, (req, res) => UsersController.findRole(req, res));

export default loginRouter;
