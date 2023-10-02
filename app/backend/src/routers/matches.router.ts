import { Request, Router, Response } from 'express';
import MatchesController from '../controllers/matchesController';
import Auth from '../middlewares/auth';

const matchesController = new MatchesController();

const matchesRouter = Router();

matchesRouter.get('/', (req: Request, res: Response) => matchesController.findAll(req, res));

matchesRouter
  .patch('/:id/finish', Auth.validateToken, (req: Request, res: Response) => matchesController
    .finishMatch(req, res));

export default matchesRouter;
