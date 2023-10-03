import { NextFunction, Request, Response } from 'express';

class Validations {
  static validateLogin(req: Request, res: Response, next: NextFunction): Response | void {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    if (password.length < 6) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    next();
  }

  static async validateMatch(req: Request, res: Response, next: NextFunction) {
    const { homeTeamId, awayTeamId } = req.body;
    // const teamService = new TeamService();
    // const homeValidate = await teamService.findById(Number(homeTeamId));
    // const awayValidate = await teamService.findById(Number(awayTeamId));
    if (homeTeamId === awayTeamId) {
      return res.status(422)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }

    // if (!homeValidate || !awayValidate) {
    //   return res.status(422).json({ message: 'There is no team with such id!' });
    // }
    next();
  }
}

export default Validations;
