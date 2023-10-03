import { Request, Router, Response } from 'express';
import MatchesController from '../controllers/matchesController';
import Auth from '../middlewares/auth';
import Validations from '../middlewares/Validations';

const matchesController = new MatchesController();

const matchesRouter = Router();

matchesRouter.get('/', (req: Request, res: Response) => matchesController.findAll(req, res));

matchesRouter
  .patch('/:id/finish', Auth.validateToken, (req: Request, res: Response) => matchesController
    .finishMatch(req, res));

matchesRouter
  .patch('/:id', Auth.validateToken, (req: Request, res: Response) => matchesController
    .updatePartialMatch(req, res));

matchesRouter
  .post(
    '/',
    Auth.validateToken,
    Validations.validateMatch,
    (req: Request, res: Response) => matchesController
      .createMatch(req, res),
  );

export default matchesRouter;
