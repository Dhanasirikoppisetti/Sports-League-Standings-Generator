# Sports League Generator

This project provides a CLI tool to generate standings from match data using configurable strategies (Classic, Rugby, Tournament).

Usage

Install dependencies:

```bash
npm install
```

Run CLI (examples):

```bash
npm start -- --strategy=classic --input=data/matches.json
npm start -- --strategy=rugby --input=data/matches.json
npm start -- --strategy=tournament --input=data/matches.json
```

Run tests:

```bash
npm test
```

What I implemented

- `ClassicStrategy`, `RugbyStrategy`, `TournamentStrategy` using Strategy pattern
- CLI using `commander` with defaults
- JSON output written to `output/`
- Head-to-Head (H2H) tie-breaker for tie groups in `src/tiebreaker.ts`
- Jest tests covering strategies and H2H behavior

Next improvements (optional)

- More extensive H2H cycle resolution (multi-team circular ties)
- CSV output and pretty tables
- Additional CLI flags for output path and formats
