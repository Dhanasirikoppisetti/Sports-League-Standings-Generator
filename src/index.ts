import fs from "fs";
import { Command } from "commander";

import { ClassicStrategy } from "./strategies/ClassicStrategy";
import { RugbyStrategy } from "./strategies/RugbyStrategy";
import { TournamentStrategy } from "./strategies/TournamentStrategy";
import { sortStandings } from "./tiebreaker";

const program = new Command();

program
  .option("--strategy <type>", "strategy to run (classic|rugby|tournament)", "classic")
  .option("--input <file>", "input JSON file", "data/matches.json");

program.parse();

const options = program.opts();

const matches = JSON.parse(
  fs.readFileSync(options.input, "utf-8")
);

let strategy: any;

switch (options.strategy) {
  case "classic":
    strategy = new ClassicStrategy();
    break;

  case "rugby":
    strategy = new RugbyStrategy();
    break;

  case "tournament":
    strategy = new TournamentStrategy();
    break;

  default:
    throw new Error("Invalid strategy");
}

const result = strategy.calculate(matches);

if (options.strategy === "tournament") {
  fs.mkdirSync("output", { recursive: true });
  fs.writeFileSync("output/winners_tournament.json", JSON.stringify(result, null, 2));

  console.log(result);
} else {
  const sorted = sortStandings(result, matches, options.strategy);

  sorted.forEach((team: any, index: number) => {
    team.rank = index + 1;
  });

  fs.mkdirSync("output", { recursive: true });
  fs.writeFileSync(`output/standings_${options.strategy}.json`, JSON.stringify(sorted, null, 2));

  console.table(sorted);
}