import { TournamentStrategy } from "../src/strategies/TournamentStrategy";

test("tournament picks higher scorer as winner per match", () => {
  const strat = new TournamentStrategy();

  const result = strat.calculate([
    { date: "", homeTeam: "A", awayTeam: "B", homeScore: 1, awayScore: 0, homeTeamTries: 0, awayTeamTries: 0 },
    { date: "", homeTeam: "C", awayTeam: "D", homeScore: 2, awayScore: 3, homeTeamTries: 0, awayTeamTries: 0 }
  ] as any);

  expect(result.roundWinners).toEqual(["A", "D"]);
});
