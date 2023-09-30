import { Request, Router, Response } from 'express';
import MatchesController from '../controllers/matchesController';

const matchesController = new MatchesController();

const matchesRouter = Router();

matchesRouter.get('/', (req: Request, res: Response) => matchesController.findAll(req, res));

export default matchesRouter;
