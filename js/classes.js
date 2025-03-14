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
    constructor({ id, name, formation, league, stadium, popularity, budget }) {
        this.id = id;
        this.name = name;
        this.formation = formation;
        this.league = league;
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
        this.updateStartingXI(player);
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
    simulate({ home: home, away: away, league: league }) {
        let skill1 = home.getTeamSkill();
        let skill2 = away.getTeamSkill();
        let score1 = Math.floor(Math.random() * 5 * (skill1 / 100));
        let score2 = Math.floor(Math.random() * 5 * (skill2 / 100));

        home.played++;
        away.played++;
        if (score1 > score2) {
            home.points += 3;
            home.wins++;
            away.losses++;
            home.popularity = Math.min(home.popularity + 2, 100);
            away.popularity = Math.max(away.popularity - 1, 0);
        } else if (score2 > score1) {
            away.points += 3;
            away.wins++;
            home.losses++;
            away.popularity = Math.min(away.popularity + 2, 100);
            home.popularity = Math.max(home.popularity - 1, 0);
        } else {
            home.points += 1;
            away.points += 1;
            home.draws++;
            away.draws++;
        }

        const ticketPrice = 20;
        const attendance = Math.min(
            Math.floor(
                ((home.popularity + away.popularity) / 200) *
                    home.stadium.capacity
            ),
            home.stadium.capacity
        );
        const totalIncome = (attendance * ticketPrice) / 1000000;
        const splitIncome = totalIncome / 2;
        home.budget += splitIncome;
        away.budget += splitIncome;

        return {
            homeTeam: home.name,
            awayTeam: away.name,
            homeScore: score1,
            awayScore: score2,
            attendance: attendance,
        };
    }
}

class League {
    constructor({
        id,
        teams,
        tier,
        size,
        country,
        win,
        promotion,
        relegation,
        prizeMoney,
    }) {
        this.id = id;
        this.teams = teams ?? [];
        this.tier = tier;
        this.size = size;
        this.country = country;
        this.matchDay = 0;
        this.matchDays = [];
        this.history = [];
        this.win = win;
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
                    dayFixtures.push({
                        home: this.teams[team1].id,
                        away: this.teams[team2].id,
                        league: this.id,
                    });
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
            let match = new Match();
            results.push(
                match.simulate({
                    home: allTeams.get(fixture.home),
                    away: allTeams.get(fixture.away),
                    league: fixture.league,
                })
            );
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
