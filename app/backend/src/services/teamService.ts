import Iteam from '../Interfaces/ITeam';
import { IReaderModel } from '../Interfaces/ICrudModel';
import TeamModel from '../models/TeamModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class TeamService {
  constructor(
    private teamModel: IReaderModel<Iteam> = new TeamModel(),
  ) {}

  public async findAll():Promise<ServiceResponse<Iteam[]>> {
    const allTeams = await this.teamModel.findAll();
    return { status: 'SUCCESSFUL', data: allTeams };
  }

  public async findById(id: number): Promise<ServiceResponse<Iteam>> {
    const team = await this.teamModel.findById(id);
    if (!team) return { status: 'NOT_FOUND', data: { message: `Team ${id} not found` } };

    return { status: 'SUCCESSFUL', data: team };
  }
}
