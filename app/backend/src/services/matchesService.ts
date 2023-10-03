import IMatch from '../Interfaces/IMatch';
import { IMatchCrudModel, NewEntity } from '../Interfaces/ICrudModel';
import MatchesModel from '../models/MatchesModel';
import { ServiceMessage, ServiceResponse } from '../Interfaces/ServiceResponse';
import { scoreType } from '../types/scoreType';

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

  public async updatePartialMatch(
    id: number,
    data: scoreType,
  ): Promise<ServiceResponse<ServiceMessage>> {
    const matchExsits = await this.matchesModel.findById(id);
    if (!matchExsits) return { status: 'NOT_FOUND', data: { message: `Match ${id} not found` } };

    await this.matchesModel.updatePartialMatch(id, data);

    return { status: 'SUCCESSFUL', data: { message: 'Score updated' } };
  }

  public async createMatch(data: NewEntity<IMatch>): Promise<ServiceResponse<IMatch>> {
    const { homeTeamId, awayTeamId } = data;
    const homeValidate = await this.matchesModel.findById(Number(homeTeamId));
    const awayValidate = await this.matchesModel.findById(Number(awayTeamId));

    if (!homeValidate || !awayValidate) {
      return { status: 'NOT_FOUND', data: { message: 'There is no team with such id!' } };
    }
    const newMatch = await this.matchesModel.createMatch(data);
    return { status: 'SUCCESSFUL', data: newMatch };
  }
}
