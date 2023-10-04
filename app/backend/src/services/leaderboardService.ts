import { ServiceResponse } from '../Interfaces/ServiceResponse';
import MatchesModel from '../models/MatchesModel';
import TeamModel from '../models/TeamModel';
import { ILeaderboard } from '../Interfaces/ILeaderboard';
import LeaderboardModel from '../models/LeaderboardModel';

export default class LeaderboardService {
  constructor(
    private teamModel = new TeamModel(),
    private matchesModel = new MatchesModel(),
  ) {}

  public async findAll(): Promise<ServiceResponse<ILeaderboard[]>> {
    const teams = await this.teamModel.findAll();
    const matches = await this.matchesModel.findAll();

    const leaderboardResult = teams.map((team) => new LeaderboardModel(team, matches));

    return { status: 'SUCCESSFUL', data: leaderboardResult };
  }
}
