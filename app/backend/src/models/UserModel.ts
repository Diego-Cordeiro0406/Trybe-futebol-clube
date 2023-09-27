import SequelizeUser from '../database/models/SequelizeUser';
import { IUser } from '../Interfaces/IUser';
import { IUserModel } from '../Interfaces/IUserModel';

export default class UserModel implements IUserModel {
  private model = SequelizeUser;

  async findAll(): Promise<IUser[]> {
    const dbData = await this.model.findAll();
    return dbData.map(({ id, username, role, email, password }) => (
      { id, username, role, email, password }
    ));
  }

  async findById(id: number): Promise<IUser | null> {
    const user = await this.model.findByPk(id);
    if (!user) return null;

    return user;
  }

  async findByEmail(email: string): Promise<IUser | null> {
    const user = await this.model.findOne({ where: { email } });
    if (!user) return null;

    return user;
  }
}
