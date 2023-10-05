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
    const filterMatch = matches.filter((match) => match.inProgress === false);
    const leaderboardResult = teams.map((team) => new LeaderboardModel(team, filterMatch));

    const result = leaderboardResult.map((team) => {
      const { teamId, ...rest } = team;

      return rest;
    });

    const leaderboardOrdered = result.sort((a, b) => {
      if (b.totalPoints !== a.totalPoints) return b.totalPoints - a.totalPoints;

      if (a.totalVictories !== b.totalVictories) return b.totalVictories - a.totalVictories;

      if (a.goalsBalance !== b.goalsBalance) return b.goalsBalance - a.goalsBalance;

      return b.goalsFavor - a.goalsFavor;
    });

    return { status: 'SUCCESSFUL', data: leaderboardOrdered };
  }
}
