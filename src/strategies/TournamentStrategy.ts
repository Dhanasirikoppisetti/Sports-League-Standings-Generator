import { Match } from "../types";
import { IStandingsStrategy } from "./IStandingsStrategy";

export class TournamentStrategy implements IStandingsStrategy {
  calculate(matches: Match[]) {
    return {
      roundWinners: matches.map(match =>
        match.homeScore >= match.awayScore
          ? match.homeTeam
          : match.awayTeam
      )
    };
  }
}