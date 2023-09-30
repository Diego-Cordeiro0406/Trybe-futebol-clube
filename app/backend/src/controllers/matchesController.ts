import { Request, Response } from 'express';
import MatchesService from '../services/matchesService';
// import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class MatchesController {
  constructor(
    private matchesService = new MatchesService(),
  ) {}

  public async findAll(req: Request, res: Response) {
    const { inProgress } = req.query;

    if (inProgress !== undefined) {
      const matchesByStatus = await this
        .matchesService.findByMatchStatus(inProgress as string);

      return res.status(200).json(matchesByStatus.data);
    }

    const allMatches = await this.matchesService.findAll();

    return res.status(200).json(allMatches.data);
  }
}
