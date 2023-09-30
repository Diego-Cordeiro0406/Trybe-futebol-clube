import IMatch from '../Interfaces/IMatch';
import { IAnotherReaderModel } from '../Interfaces/ICrudModel';
import MatchesModel from '../models/MatchesModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class MatchesService {
  constructor(
    private matchesModel: IAnotherReaderModel<IMatch> = new MatchesModel(),
  ) {}

  public async findAll():Promise<ServiceResponse<IMatch[]>> {
    const allMatches = await this.matchesModel.findAll();
    return { status: 'SUCCESSFUL', data: allMatches };
  }
}
