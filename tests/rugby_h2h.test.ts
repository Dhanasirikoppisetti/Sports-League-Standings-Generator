import { sortStandings } from "../src/tiebreaker";

test("rugby H2H decides when overall stats equal", () => {
  const teams = [
    { team: "A", points: 10, pointDifference: 5, pointsFor: 30 },
    { team: "B", points: 10, pointDifference: 5, pointsFor: 30 }
  ];

  const matches = [
    // H2H match where A beat B 21-14 (A gets 4, B gets 1 losing bonus)
    { date: "", homeTeam: "A", awayTeam: "B", homeScore: 21, awayScore: 14, homeTeamTries: 3, awayTeamTries: 2 }
  ];

  const result = sortStandings(teams as any, matches as any, "rugby");

  expect(result[0].team).toBe("A");
});
