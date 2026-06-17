export interface Match {
  date: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  homeTeamTries: number;
  awayTeamTries: number;
}

export interface TeamStanding {
  team: string;
  played: number;
  wins: number;
  draws: number;
  losses: number;

  goalsFor?: number;
  goalsAgainst?: number;
  goalDifference?: number;

  pointsFor?: number;
  pointsAgainst?: number;
  pointDifference?: number;

  triesFor?: number;
  bonusPoints?: number;

  points: number;
}