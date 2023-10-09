import { Request, Router, Response } from 'express';
import LeaderboardController from '../controllers/leaderboardController';

const leaderboardController = new LeaderboardController(false);
const leaderboardAwayController = new LeaderboardController(true);

const leaderboardRouter = Router();

leaderboardRouter
  .get('/home', (req: Request, res: Response) => leaderboardController.findAll(req, res));

leaderboardRouter
  .get('/away', (req: Request, res: Response) => leaderboardAwayController.findAll(req, res));

export default leaderboardRouter;
