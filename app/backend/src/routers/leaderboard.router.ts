import { Request, Router, Response } from 'express';
import LeaderboardController from '../controllers/leaderboardController';

const leaderbosrdController = new LeaderboardController();

const leaderboardRouter = Router();

leaderboardRouter
  .get('/home', (req: Request, res: Response) => leaderbosrdController.findAll(req, res));

export default leaderboardRouter;
