import { Request, Response } from 'express';
import MatchesService from '../services/matchesService';
// import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class MatchesController {
  constructor(
    private matchesService = new MatchesService(),
  ) {}

  public async findAll(req: Request, res: Response) {
    const allMatches = await this.matchesService.findAll();

    return res.status(200).json(allMatches.data);
  }
}
