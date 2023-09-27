import { Request, Response } from 'express';
import TeamService from '../services/teamService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class TeamController {
  constructor(
    private teamService = new TeamService(),
  ) {}

  public async findAll(req: Request, res: Response) {
    const allTeams = await this.teamService.findAll();

    return res.status(200).json(allTeams.data);
  }

  public async findById(req: Request, res: Response) {
    const { id } = req.params;
    const { status, data } = await this.teamService.findById(Number(id));

    if (status !== 'SUCCESSFUL') return res.status(mapStatusHTTP(status)).json(data);

    return res.status(200).json(data);
  }
}
