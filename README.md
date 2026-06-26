# 🏆 Sports League Table Generator

A command-line application built with **TypeScript** that generates sports league standings from match data using different scoring systems. The project demonstrates the **Strategy Design Pattern**, making it easy to switch between different league rules without changing the core application logic.

---

## 📖 Overview

Different sports follow different scoring rules. For example, football awards 3 points for a win, while rugby has bonus points based on tries and close losses. Instead of writing separate applications for each sport, this project uses the **Strategy Design Pattern** to support multiple scoring systems in a clean and reusable way.

The application reads match data from a JSON file, processes it using the selected strategy, displays the results in the terminal, and generates output files in JSON format.

---

## ✨ Features

- Supports multiple scoring strategies
  - ⚽ Classic Football League
  - 🏉 Rugby League
  - 🏆 Tournament (Knockout)
- Reads match data from JSON files
- Generates league standings automatically
- Applies tie-breaker rules for rankings
- Displays results in a formatted console table
- Exports standings to JSON files
- Includes unit tests using Jest
- Easy to extend by adding new strategies

---

## 🛠️ Technologies Used

- TypeScript
- Node.js
- Commander
- CLI Table 3
- Jest
- ts-node

---

## 📁 Project Structure

```
sports-league-generator
│
├── src
│   ├── strategies
│   │   ├── IStandingsStrategy.ts
│   │   ├── ClassicStrategy.ts
│   │   ├── RugbyStrategy.ts
│   │   └── TournamentStrategy.ts
│   │
│   ├── index.ts
│   ├── types.ts
│   ├── tiebreaker.ts
│   └── formatter.ts
│
├── data
│   └── matches.json
│
├── output
│
├── tests
│
├── package.json
└── tsconfig.json
```

---

## ⚙️ Installation

Clone the repository:

```bash
git clone <repository-url>
```

Move into the project directory:

```bash
cd sports-league-generator
```

Install dependencies:

```bash
npm install
```

---

## ▶️ Running the Application

### Classic Strategy

```bash
npm start -- --strategy=classic --input=data/matches.json
```

---

### Rugby Strategy

```bash
npm start -- --strategy=rugby --input=data/matches.json
```

---

### Tournament Strategy

```bash
npm start -- --strategy=tournament --input=data/matches.json
```

---

## 🧪 Running Unit Tests

Execute all unit tests using:

```bash
npm test
```

---

## 📥 Input Format

The application reads match details from a JSON file.

Example:

```json
[
  {
    "date": "2023-01-01",
    "homeTeam": "Team A",
    "awayTeam": "Team B",
    "homeScore": 3,
    "awayScore": 1,
    "homeTeamTries": 4,
    "awayTeamTries": 2
  }
]
```

---

## 📤 Output

### Classic Strategy

Generates:

```
output/standings_classic.json
```

Contains:

- Team
- Played
- Wins
- Draws
- Losses
- Goals For
- Goals Against
- Goal Difference
- Points
- Rank

---

### Rugby Strategy

Generates:

```
output/standings_rugby.json
```

Contains:

- Team
- Played
- Wins
- Draws
- Losses
- Points For
- Points Against
- Point Difference
- Bonus Points
- Total Points
- Rank

---

### Tournament Strategy

Generates:

```
output/winners_tournament.json
```

Contains the list of winning teams for the tournament round.

---

## 📊 Tie-Breaker Rules

When two or more teams have the same number of points, the rankings are decided using the following order:

1. Total Points
2. Goal Difference / Point Difference
3. Goals For / Points For
4. Head-to-Head Result
5. Alphabetical Order

---

## 🧩 Strategy Design Pattern

This project follows the **Strategy Design Pattern**.

The application defines a common interface for all scoring strategies. Each sport has its own implementation while the main application selects the required strategy at runtime.

Implemented strategies:

- **ClassicStrategy**
- **RugbyStrategy**
- **TournamentStrategy**

This design keeps the application flexible and makes it easy to introduce new sports without modifying the existing code.

---

## ✅ Testing

Unit tests verify the core functionality of the application, including:

- Classic scoring logic
- Rugby scoring with bonus points
- Tournament winner selection
- Tie-breaker logic

All tests can be executed with:

```bash
npm test
```

---

## 🚀 Future Improvements

- Support additional sports such as Cricket or Basketball
- Add CSV and Excel export options
- Interactive command-line interface
- Database integration
- Docker support
- REST API version

---

## 👨‍💻 Author

**Dhanasiri Koppisetti**

B.Tech – Artificial Intelligence & Machine Learning

---

## 📌 Conclusion

The Sports League Table Generator demonstrates how the **Strategy Design Pattern** can be used to build flexible and maintainable applications. By separating scoring logic into independent strategies, the project supports multiple sports while keeping the core application simple, reusable, and easy to extend.
