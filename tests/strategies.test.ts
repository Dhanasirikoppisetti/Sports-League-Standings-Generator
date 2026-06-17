import { ClassicStrategy } from "../src/strategies/ClassicStrategy";

test("classic win gives 3 points", () => {
  const strategy = new ClassicStrategy();

  const result = strategy.calculate([
    {
      date: "",
      homeTeam: "A",
      awayTeam: "B",
      homeScore: 2,
      awayScore: 1,
      homeTeamTries: 0,
      awayTeamTries: 0
    }
  ]);

  expect(result.find(t => t.team === "A")?.points).toBe(3);
});