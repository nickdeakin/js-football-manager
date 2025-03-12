class Player {
    constructor(name, position, skills, value, wage, age, nationality) {
        this.name = name;
        this.position = position;
        this.skills = skills;
        this.value = value;
        this.wage = wage;
        this.age = age;
        this.nationality = nationality;
    }

    getAverageSkill() {
        return (
            Object.values(this.skills).reduce((sum, val) => sum + val, 0) / 6
        );
    }
}

class Team {
    constructor(name, formation, leagueTier, stadium, popularity, budget) {
        this.name = name;
        this.formation = formation;
        this.leagueTier = leagueTier;
        this.stadium = stadium;
        this.popularity = popularity;
        this.budget = budget;
        this.players = [];
        this.points = 0;
        this.played = 0;
        this.wins = 0;
        this.draws = 0;
        this.losses = 0;
        this.wageBill = 0;
    }

    addPlayer(player) {
        this.players.push(player);
        this.wageBill += player.wage;
        if (this.name === yourTeamName) {
            this.updateStartingXI(player);
        }
    }

    removePlayer(index) {
        const player = this.players.splice(index, 1)[0];
        this.wageBill -= player.wage;
        return player;
    }

    getTeamSkill() {
        let startingXI = this.players.slice(0, 11);
        let totalSkill = startingXI.reduce(
            (sum, player) => sum + player.getAverageSkill(),
            0
        );
        return totalSkill / startingXI.length || 0;
    }

    updateStartingXI(newPlayer) {
        const formationMap = {
            '4-4-2': { gk: 1, def: 4, mid: 4, fwd: 2 },
            '4-3-3': { gk: 1, def: 4, mid: 3, fwd: 3 },
            '3-5-2': { gk: 1, def: 3, mid: 5, fwd: 2 },
            '4-2-3-1': { gk: 1, def: 4, mid: 5, fwd: 1 },
        };
        const formation = formationMap[this.formation];
        let startingXI = this.players.slice(0, 11);
        let positionPlayers = startingXI.filter(
            (p) => p.position === newPlayer.position
        );
        if (positionPlayers.length === 0) return;

        let weakestPlayer = positionPlayers.reduce(
            (min, p) => (p.getAverageSkill() < min.getAverageSkill() ? p : min),
            positionPlayers[0]
        );
        if (newPlayer.getAverageSkill() > weakestPlayer.getAverageSkill()) {
            let weakestIndex = startingXI.indexOf(weakestPlayer);
            this.players.splice(this.players.length - 1, 1);
            this.players.splice(weakestIndex, 1, newPlayer);
            this.players.push(weakestPlayer);
        }
    }
}

class Match {
    constructor(team1, team2) {
        this.team1 = team1;
        this.team2 = team2;
    }

    simulate() {
        let skill1 = this.team1.getTeamSkill();
        let skill2 = this.team2.getTeamSkill();
        let score1 = Math.floor(Math.random() * 5 * (skill1 / 100));
        let score2 = Math.floor(Math.random() * 5 * (skill2 / 100));

        this.team1.played++;
        this.team2.played++;
        if (score1 > score2) {
            this.team1.points += 3;
            this.team1.wins++;
            this.team2.losses++;
            this.team1.popularity = Math.min(this.team1.popularity + 2, 100);
            this.team2.popularity = Math.max(this.team2.popularity - 1, 0);
        } else if (score2 > score1) {
            this.team2.points += 3;
            this.team2.wins++;
            this.team1.losses++;
            this.team2.popularity = Math.min(this.team2.popularity + 2, 100);
            this.team1.popularity = Math.max(this.team1.popularity - 1, 0);
        } else {
            this.team1.points += 1;
            this.team2.points += 1;
            this.team1.draws++;
            this.team2.draws++;
        }

        const ticketPrice = 20;
        const attendance = Math.min(
            Math.floor(
                ((this.team1.popularity + this.team2.popularity) / 200) *
                    this.team1.stadium.capacity
            ),
            this.team1.stadium.capacity
        );
        const totalIncome = (attendance * ticketPrice) / 1000000;
        const splitIncome = totalIncome / 2;
        this.team1.budget += splitIncome;
        this.team2.budget += splitIncome;

        return {
            homeTeam: this.team1.name,
            awayTeam: this.team2.name,
            homeScore: score1,
            awayScore: score2,
            attendance: attendance,
        };
    }
}

class League {
    constructor({ teams, tier, promotion, relegation, prizeMoney }) {
        this.teams = teams;
        this.tier = tier;
        this.matchDay = 0;
        this.matchDays = this.generateMatchDays();
        this.history = [];
        this.promotion = promotion;
        this.relegation = relegation;
        this.prizeMoney = prizeMoney;
    }

    isSeasonOver() {
        return this.matchDay >= this.matchDays.length;
    }

    generateMatchDays() {
        const n = this.teams.length;
        const matchDays = [];
        const teamIndices = Array.from({ length: n }, (_, i) => i);

        for (let round = 0; round < n - 1; round++) {
            let dayFixtures = [];
            let usedTeams = new Set();

            for (let i = 0; i < n / 2; i++) {
                let team1 = teamIndices[i];
                let team2 = teamIndices[n - 1 - i];
                if (!usedTeams.has(team1) && !usedTeams.has(team2)) {
                    dayFixtures.push([this.teams[team1], this.teams[team2]]);
                    usedTeams.add(team1);
                    usedTeams.add(team2);
                }
            }

            matchDays.push(dayFixtures);
            teamIndices.splice(1, 0, teamIndices.pop());
        }

        matchDays.forEach((day) => {
            for (let i = day.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [day[i], day[j]] = [day[j], day[i]];
            }
        });

        return matchDays;
    }

    simulateMatchDay() {
        if (this.isSeasonOver()) {
            return [
                {
                    homeTeam: 'Season',
                    awayTeam: 'Over!',
                    homeScore: 0,
                    awayScore: 0,
                    attendance: 0,
                },
            ];
        }
        let results = [];
        let todayFixtures = this.matchDays[this.matchDay];
        for (let fixture of todayFixtures) {
            let match = new Match(fixture[0], fixture[1]);
            results.push(match.simulate());
        }
        this.teams.forEach((team) => {
            team.budget -= team.wageBill / 1000;
        });
        this.history.push({ matchDay: this.matchDay + 1, results: results });
        this.matchDay++;
        return results;
    }

    getStandings() {
        return this.teams.sort(
            (a, b) => b.points - a.points || b.wins - a.wins
        );
    }

    getFutureFixtures() {
        let future = [];
        for (let i = this.matchDay; i < this.matchDays.length; i++) {
            let dayFixtures = this.matchDays[i].map(
                (fixture) => `${fixture[0].name} vs ${fixture[1].name}`
            );
            future.push({ matchDay: i + 1, fixtures: dayFixtures });
        }
        return future;
    }

    getTodayResults() {
        return this.history[this.matchDay - 1]?.results ?? [];
    }
}
