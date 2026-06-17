import { Match, TeamStanding } from "../types";
import { IStandingsStrategy } from "./IStandingsStrategy";

export class ClassicStrategy implements IStandingsStrategy {
  calculate(matches: Match[]) {
    const table: Record<string, TeamStanding> = {};

    const getTeam = (name: string) => {
      if (!table[name]) {
        table[name] = {
          team: name,
          played: 0,
          wins: 0,
          draws: 0,
          losses: 0,
          goalsFor: 0,
          goalsAgainst: 0,
          goalDifference: 0,
          points: 0
        };
      }
      return table[name];
    };

    matches.forEach(match => {
      const home = getTeam(match.homeTeam);
      const away = getTeam(match.awayTeam);

      home.played++;
      away.played++;

      home.goalsFor! += match.homeScore;
      home.goalsAgainst! += match.awayScore;

      away.goalsFor! += match.awayScore;
      away.goalsAgainst! += match.homeScore;

      if (match.homeScore > match.awayScore) {
        home.wins++;
        away.losses++;
        home.points += 3;
      } else if (match.homeScore < match.awayScore) {
        away.wins++;
        home.losses++;
        away.points += 3;
      } else {
        home.draws++;
        away.draws++;
        home.points += 1;
        away.points += 1;
      }

      home.goalDifference =
        home.goalsFor! - home.goalsAgainst!;

      away.goalDifference =
        away.goalsFor! - away.goalsAgainst!;
    });

    return Object.values(table);
  }
}