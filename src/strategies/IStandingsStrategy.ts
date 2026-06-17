import { Match } from "../types";

export interface IStandingsStrategy {
  calculate(matches: Match[]): any;
}