import * as bcrypt from 'bcryptjs';
import { IToken } from '../Interfaces/Itoken';
import { IUserResponse, IUser, ILogin } from '../Interfaces/IUser';
import { IUserModel } from '../Interfaces/IUserModel';
import { ServiceResponse, ServiceMessage } from '../Interfaces/ServiceResponse';
import UserModel from '../models/UserModel';
import JWT from '../utils/JWT';

export default class UserService {
  constructor(
    private userModel: IUserModel = new UserModel(),
    private jwtService = JWT,
  ) { }

  public async findAll(): Promise<ServiceResponse<IUserResponse[]>> {
    const allUsers = await this.userModel.findAll();
    const usersReturn = allUsers
      .map(({ id, username, role, email }) => ({ id, username, role, email }));
    return { status: 'SUCCESSFUL', data: usersReturn };
  }

  public async findById(id: number): Promise<ServiceResponse<IUserResponse>> {
    const user = await this.userModel.findById(id);
    if (!user) return { status: 'NOT_FOUND', data: { message: 'User not found' } };
    const { username, role, email } = user as IUser;

    return { status: 'SUCCESSFUL', data: { id, username, role, email } };
  }

  // batata

  public async login(data: ILogin): Promise<ServiceResponse<ServiceMessage | IToken>> {
    const user = await this.userModel.findByEmail(data.email);
    if (user) {
      if (!bcrypt.compareSync(data.password, user.password)) {
        return { status: 'INVALID_VALUES', data: { message: 'Invalid email or password' } };
      }
      const { email } = user as IUser;
      const token = this.jwtService.sign({ email });
      return { status: 'SUCCESSFUL', data: { token } };
    }
    return { status: 'INVALID_VALUES', data: { message: 'Invalid email or password' } };
  }
}
