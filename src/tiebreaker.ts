type Match = {
  date?: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  homeTeamTries?: number;
  awayTeamTries?: number;
};

function compareBasic(a: any, b: any) {
  return (
    (b.points - a.points) ||
    ((b.goalDifference ?? b.pointDifference) - (a.goalDifference ?? a.pointDifference)) ||
    ((b.goalsFor ?? b.pointsFor) - (a.goalsFor ?? a.pointsFor)) ||
    a.team.localeCompare(b.team)
  );
}

function computeH2HOrder(group: any[], matches: Match[], strategy: string = "classic") {
  const table: Record<string, any> = {};

  const teamsSet = new Set(group.map((t) => t.team));

  const ensure = (name: string) => {
    if (!table[name])
      table[name] = {
        team: name,
        points: 0,
        goalDifference: 0,
        goalsFor: 0,
        pointDifference: 0,
        pointsFor: 0,
        bonusPoints: 0
      };
    return table[name];
  };

  matches.forEach((m) => {
    if (!teamsSet.has(m.homeTeam) || !teamsSet.has(m.awayTeam)) return;

    const home = ensure(m.homeTeam);
    const away = ensure(m.awayTeam);
    if (strategy === "rugby") {
      home.pointsFor += m.homeScore;
      away.pointsFor += m.awayScore;

      home.pointDifference += m.homeScore - m.awayScore;
      away.pointDifference += m.awayScore - m.homeScore;

      if (m.homeScore > m.awayScore) {
        home.points += 4;
      } else if (m.homeScore < m.awayScore) {
        away.points += 4;
      } else {
        home.points += 2;
        away.points += 2;
      }

      if ((m.homeTeamTries ?? 0) >= 4) {
        home.points += 1;
        home.bonusPoints++;
      }
      if ((m.awayTeamTries ?? 0) >= 4) {
        away.points += 1;
        away.bonusPoints++;
      }

      if (m.homeScore < m.awayScore && m.awayScore - m.homeScore <= 7) {
        home.points += 1;
        home.bonusPoints++;
      }
      if (m.awayScore < m.homeScore && m.homeScore - m.awayScore <= 7) {
        away.points += 1;
        away.bonusPoints++;
      }
    } else {
      home.goalsFor += m.homeScore;
      away.goalsFor += m.awayScore;

      home.goalDifference += m.homeScore - m.awayScore;
      away.goalDifference += m.awayScore - m.homeScore;

      if (m.homeScore > m.awayScore) {
        home.points += 3;
      } else if (m.homeScore < m.awayScore) {
        away.points += 3;
      } else {
        home.points += 1;
        away.points += 1;
      }
    }
  });

  // merge h2h stats back into group objects for sorting
  return group.sort((a, b) => {
    const ha = table[a.team] ?? { points: 0, goalDifference: 0, goalsFor: 0, pointDifference: 0, pointsFor: 0 };
    const hb = table[b.team] ?? { points: 0, goalDifference: 0, goalsFor: 0, pointDifference: 0, pointsFor: 0 };

    if (strategy === "rugby") {
      return (
        (hb.points - ha.points) ||
        (hb.pointDifference - ha.pointDifference) ||
        (hb.pointsFor - ha.pointsFor) ||
        a.team.localeCompare(b.team)
      );
    }

    return (
      (hb.points - ha.points) ||
      (hb.goalDifference - ha.goalDifference) ||
      (hb.goalsFor - ha.goalsFor) ||
      a.team.localeCompare(b.team)
    );
  });
}

export function sortStandings(teams: any[], matches?: Match[], strategy: string = "classic") {
  // first sort by primary criteria
  const sorted = [...teams].sort(compareBasic);

  if (!matches) return sorted;

  // detect tie groups (points, gd, gf equal)
  const result: any[] = [];
  for (let i = 0; i < sorted.length; ) {
    const group: any[] = [sorted[i]];
    let j = i + 1;
    while (
      j < sorted.length &&
      sorted[j].points === sorted[i].points &&
      (sorted[j].goalDifference ?? sorted[j].pointDifference) === (sorted[i].goalDifference ?? sorted[i].pointDifference) &&
      (sorted[j].goalsFor ?? sorted[j].pointsFor) === (sorted[i].goalsFor ?? sorted[i].pointsFor)
    ) {
      group.push(sorted[j]);
      j++;
    }

    if (group.length > 1) {
      const ordered = computeH2HOrder(group, matches, strategy);
      result.push(...ordered);
    } else {
      result.push(group[0]);
    }

    i = j;
  }

  return result;
}