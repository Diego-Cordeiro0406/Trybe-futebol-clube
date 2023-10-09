import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboardService';
import LeaderboardAwayService from '../services/leaderboardAwayService';

export default class LeaderboardController {
  constructor(
    private isAway: boolean = false,
  ) {}

  public async findAll(req: Request, res: Response) {
    let leaderboardService;

    if (this.isAway) {
      leaderboardService = new LeaderboardAwayService();
    } else {
      leaderboardService = new LeaderboardService();
    }
    const leaderboard = await leaderboardService.findAll();

    res.status(200).json(leaderboard.data);
  }
}
