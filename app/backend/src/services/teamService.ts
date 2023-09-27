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
}
