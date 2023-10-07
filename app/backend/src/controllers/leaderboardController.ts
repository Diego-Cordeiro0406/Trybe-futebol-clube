import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboardService';

export default class LeaderboardController {
  constructor(
    // private isAway: boolean = false,
    private leaderboardService = new LeaderboardService(),
  ) {}

  public async findAll(req: Request, res: Response) {
    const leaderboard = await this.leaderboardService.findAll();

    res.status(200).json(leaderboard.data);
  }
}
