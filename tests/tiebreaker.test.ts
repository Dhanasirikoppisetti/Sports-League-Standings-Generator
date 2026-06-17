import { sortStandings } from "../src/tiebreaker";

test("goal difference decides ranking", () => {
  const teams = [
    { team: "A", points: 6, goalDifference: 5, goalsFor: 10 },
    { team: "B", points: 6, goalDifference: 2, goalsFor: 10 }
  ];

  const result = sortStandings(teams);

  expect(result[0].team).toBe("A");
});

test("head-to-head decides when overall stats equal", () => {
  const teams = [
    { team: "A", points: 3, goalDifference: 0, goalsFor: 2 },
    { team: "B", points: 3, goalDifference: 0, goalsFor: 2 }
  ];

  const matches = [
    { date: "", homeTeam: "A", awayTeam: "B", homeScore: 2, awayScore: 1, homeTeamTries: 0, awayTeamTries: 0 }
  ];

  const result = sortStandings(teams, matches as any);

  expect(result[0].team).toBe("A");
});