import { RugbyStrategy } from "../src/strategies/RugbyStrategy";

test("rugby awards 4 points for win and bonus for 4 tries", () => {
  const strategy = new RugbyStrategy();

  const result = strategy.calculate([
    {
      date: "",
      homeTeam: "A",
      awayTeam: "B",
      homeScore: 28,
      awayScore: 10,
      homeTeamTries: 4,
      awayTeamTries: 1
    }
  ]);

  const a: any = result.find((t: any) => t.team === "A");
  expect(a.points).toBe(5); // 4 for win +1 for 4+ tries
});

test("rugby awards losing bonus point for small margin", () => {
  const strategy = new RugbyStrategy();

  const result = strategy.calculate([
    {
      date: "",
      homeTeam: "A",
      awayTeam: "B",
      homeScore: 21,
      awayScore: 17,
      homeTeamTries: 2,
      awayTeamTries: 3
    }
  ]);

  const b: any = result.find((t: any) => t.team === "B");
  expect(b.points).toBe(1); // losing bonus point for <=7 margin
});
