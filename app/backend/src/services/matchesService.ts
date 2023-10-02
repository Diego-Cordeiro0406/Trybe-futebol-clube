import IMatch from '../Interfaces/IMatch';
import { IMatchCrudModel } from '../Interfaces/ICrudModel';
import MatchesModel from '../models/MatchesModel';
import { ServiceMessage, ServiceResponse } from '../Interfaces/ServiceResponse';

export default class MatchesService {
  constructor(
    private matchesModel: IMatchCrudModel<IMatch> = new MatchesModel(),
  ) {}

  public async findAll():Promise<ServiceResponse<IMatch[]>> {
    const allMatches = await this.matchesModel.findAll();
    return { status: 'SUCCESSFUL', data: allMatches };
  }

  public async findByMatchStatus(query: string):Promise<ServiceResponse<IMatch[]>> {
    const matchesByStatus = await this.matchesModel.findByMatchStatus(query);
    return { status: 'SUCCESSFUL', data: matchesByStatus };
  }

  public async finishMatch(id: number): Promise<ServiceResponse<ServiceMessage>> {
    const matchExsits = await this.matchesModel.findById(id);
    if (!matchExsits) return { status: 'NOT_FOUND', data: { message: `Match ${id} not found` } };
    if (matchExsits.inProgress === false) {
      return { status: 'CONFLICT', data: { message: 'Match already finished' } };
    }
    await this.matchesModel.finishMatch(id);
    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }
}
