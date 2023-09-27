import { IUser } from './IUser';
import { IReaderModel } from './ICrudModel';

export interface IUserModel extends IReaderModel<IUser> {
  findByEmail(email: string): Promise<IUser | null>,
}
