import IMatch from '../Interfaces/IMatch';
import SequelizeMatches from '../database/models/SequelizeMatches';
import { IMatchCrudModel } from '../Interfaces/ICrudModel';
import SequelizeTeam from '../database/models/SequelizeTeam';

export default class MatchesModel implements IMatchCrudModel<IMatch> {
  private model = SequelizeMatches;
  async findAll():Promise<IMatch[]> {
    const dbData = await this.model.findAll({
      include: [
        {
          model: SequelizeTeam, as: 'homeTeam', attributes: ['teamName'],
        },
        {
          model: SequelizeTeam, as: 'awayTeam', attributes: ['teamName'],
        },
      ],
    });

    return dbData;
  }

  async findById(id: number): Promise<IMatch | null> {
    const dbData = await this.model.findByPk(id);
    if (!dbData) return null;

    return dbData;
  }

  async findByMatchStatus(query: string): Promise<IMatch[]> {
    const dbData = await this.model.findAll({
      where: { inProgress: query === 'true' },
      include: [
        {
          model: SequelizeTeam, as: 'homeTeam', attributes: ['teamName'],
        },
        {
          model: SequelizeTeam, as: 'awayTeam', attributes: ['teamName'],
        },
      ],
    });

    return dbData;
  }

  async finishMatch(id: number): Promise<void> {
    await this.model.update({ inProgress: false }, {
      where: { id },
    });
  }
}
