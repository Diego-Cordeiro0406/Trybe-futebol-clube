import { Request, Response } from 'express';
import UserService from '../services/userService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class UserController {
  constructor(
    private userService = new UserService(),
  ) { }

  public async login(req: Request, res: Response): Promise<Response> {
    const { status, data } = await this.userService.login(req.body);

    if (status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(status)).json(data);
    }
    return res.status(200).json(data);
  }

  public async findAll(req: Request, res: Response): Promise<Response> {
    const { data } = await this.userService.findAll();

    return res.status(200).json(data);
  }

  public async findById(req: Request, res: Response) {
    const { id } = req.params;
    const { status, data } = await this.userService.findById(Number(id));

    if (status !== 'SUCCESSFUL') return res.status(mapStatusHTTP(status)).json(data);

    return res.status(200).json(data);
  }

  public static async findRole(req: Request, res: Response): Promise<Response> {
    const { role } = req.body.user;

    return res.status(200).json({ role });
  }
}
