import Iteam from '../Interfaces/ITeam';
import SequelizeTeam from '../database/models/SequelizeTeam';
import { IReaderModel } from '../Interfaces/ICrudModel';

export default class TeamModel implements IReaderModel<Iteam> {
  private model = SequelizeTeam;
  async findAll():Promise<Iteam[]> {
    const dbData = await this.model.findAll();

    return dbData.map(({ id, teamName }) => ({ id, teamName }));
  }

  async findById(id: number): Promise<Iteam | null> {
    const dbData = await this.model.findByPk(id);
    if (!dbData) return null;

    return dbData;
  }
}
