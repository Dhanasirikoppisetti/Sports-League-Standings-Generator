import { Match } from "../types";
import { IStandingsStrategy } from "./IStandingsStrategy";

export class RugbyStrategy implements IStandingsStrategy {
  calculate(matches: Match[]) {
    const table: any = {};

    const getTeam = (name: string) => {
      if (!table[name]) {
        table[name] = {
          team: name,
          played: 0,
          wins: 0,
          draws: 0,
          losses: 0,
          pointsFor: 0,
          pointsAgainst: 0,
          pointDifference: 0,
          bonusPoints: 0,
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

      home.pointsFor += match.homeScore;
      home.pointsAgainst += match.awayScore;

      away.pointsFor += match.awayScore;
      away.pointsAgainst += match.homeScore;

      if (match.homeScore > match.awayScore) {
        home.wins++;
        away.losses++;
        home.points += 4;
      } else if (match.awayScore > match.homeScore) {
        away.wins++;
        home.losses++;
        away.points += 4;
      } else {
        home.draws++;
        away.draws++;
        home.points += 2;
        away.points += 2;
      }

      if (match.homeTeamTries >= 4) {
        home.points++;
        home.bonusPoints++;
      }

      if (match.awayTeamTries >= 4) {
        away.points++;
        away.bonusPoints++;
      }

      if (
        match.homeScore < match.awayScore &&
        match.awayScore - match.homeScore <= 7
      ) {
        home.points++;
        home.bonusPoints++;
      }

      if (
        match.awayScore < match.homeScore &&
        match.homeScore - match.awayScore <= 7
      ) {
        away.points++;
        away.bonusPoints++;
      }

      home.pointDifference =
        home.pointsFor - home.pointsAgainst;

      away.pointDifference =
        away.pointsFor - away.pointsAgainst;
    });

    return Object.values(table);
  }
}