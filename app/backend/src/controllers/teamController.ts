import { Request, Response } from 'express';
import TeamService from '../services/teamService';
// import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class TeamController {
  constructor(
    private teamService = new TeamService(),
  ) {}

  public async findAll(req: Request, res: Response) {
    const allTeams = await this.teamService.findAll();

    return res.status(200).json(allTeams.data);
  }
}
