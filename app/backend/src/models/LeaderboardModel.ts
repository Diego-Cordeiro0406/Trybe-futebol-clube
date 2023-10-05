import Iteam from '../Interfaces/ITeam';
import { ILeaderboard } from '../Interfaces/ILeaderboard';
import IMatch from '../Interfaces/IMatch';

export default class LeaderboardModel implements ILeaderboard {
  name: string;
  totalPoints = 0;
  totalGames = 0;
  totalVictories = 0;
  totalDraws = 0;
  totalLosses = 0;
  goalsFavor = 0;
  goalsOwn = 0;
  goalsBalance = 0;
  efficiency = 0;
  teamId: number;

  constructor(name: Iteam, concludedMatches: IMatch[]) {
    this.name = name.teamName;
    this.teamId = name.id;
    this.matchesResult(concludedMatches);
    this.goalsBalanceResult();
    this.totalPointsResult();
    this.totalGamesResult();
    this.totalEfficiency();
  }

  private matchesResult(concludedMatches: IMatch[]) {
    concludedMatches.filter((match) => match.homeTeamId === this.teamId).forEach((match) => {
      this.goalsFavor += match.homeTeamGoals;
      this.goalsOwn += match.awayTeamGoals;
      switch (true) {
        case match.homeTeamGoals > match.awayTeamGoals:
          this.totalVictories += 1;
          break;
        case match.homeTeamGoals < match.awayTeamGoals:
          this.totalLosses += 1;
          break;
        default:
          this.totalDraws += 1;
          break;
      }
    });
  }

  private goalsBalanceResult() {
    this.goalsBalance = this.goalsFavor - this.goalsOwn;
    return this.goalsBalance;
  }

  private totalPointsResult() {
    this.totalPoints = this.totalVictories * 3 + this.totalDraws;
    return this.totalPoints;
  }

  private totalGamesResult() {
    this.totalGames = this.totalVictories + this.totalDraws + this.totalLosses;
    return this.totalGames;
  }

  private totalEfficiency() {
    this.efficiency = parseFloat(((this.totalPoints / (this.totalGames * 3)) * 100).toFixed(2));
    return this.efficiency;
  }
}
