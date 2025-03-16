let yourTeamId = 'eng-swindon';

let yourTeamLeagueId = 0;
let currentHistoryDay = 0;
let currentFutureDay = 0;
let seasonNumber = 1;
let currentResultLeague = 0;
let currentWeek = 0;
let isMidweek = false;

let leagues = new Map();
let teams = new Map();
let players = new Map();
let transferList = new Map();

let weeks = new Map();

const setup = () => {
    generateTeams();
    generateLeagues();
    assignTeamsToLeagues();
    generateWeeks();
    generateFixtures();
};

const generateWeeks = () => {
    weeks.clear();
    [...Array(52)].forEach((_, i) => {
        weeks.set(i + 1, {
            type: 'season',
            weekend: {
                fixtures: {},
                events: [],
            },
            midweek: {
                fixtures: {},
                events: [],
            },
        });
    });

    [...Array(4)].forEach((_, i) => {
        const week = weeks.get(i + 1);
        week.type = 'preseason';
    });

    [...Array(2)].forEach((_, i) => {
        const week = weeks.get(i + 51);
        week.type = 'postseason';
    });

    weeks.get(28).weekend.events.push('christmas');
    weeks.get(28).weekend.events.push('boxingday');
    weeks.get(29).weekend.events.push('newyears');

    weeks.get(36).weekend.events.push('easter');
};

const generateFixtures = () => {
    leagues.forEach((league) => {
        const fixtures = [];
        league.teams.forEach((home) => {
            league.teams.forEach((away) => {
                if (home.id !== away.id) {
                    fixtures.push({
                        home: home.id,
                        away: away.id,
                    });
                }
            });
        });

        league.fixtures = fixtures;

        const seasonWeeks = Array.from(
            weeks.entries().filter(([k, v]) => v.type === 'season')
        );

        league.teams.forEach((team) => {
            const teamFixtures = league.fixtures.filter(
                (fixture) => fixture.home === team.id
            );
            teamFixtures.forEach((teamFixture) => {
                let weeksToChooseFrom = [...seasonWeeks];
                let weekIndex;
                let week;
                let found = false;
                let count = 0;
                do {
                    weekIndex = Math.floor(
                        Math.random() * weeksToChooseFrom.length
                    );
                    if (weeksToChooseFrom[weekIndex]) {
                        week = weeksToChooseFrom[weekIndex][0];
                        if (weeks.get(week).weekend.fixtures[league.id]) {
                            found = weeks
                                .get(week)
                                .weekend.fixtures[
                                    league.id
                                ].find((weekFixture) => {
                                    return (
                                        weekFixture.home === teamFixture.home ||
                                        weekFixture.away === teamFixture.home ||
                                        weekFixture.home === teamFixture.away ||
                                        weekFixture.away === teamFixture.away
                                    );
                                });
                            const index = weeksToChooseFrom.findIndex(
                                (x) => x[0] === week
                            );
                            weeksToChooseFrom.splice(index, 1);
                        }
                    }
                    count++;
                    if (count > 46) {
                        break;
                    }
                } while (found);

                weeksToChooseFrom = [...seasonWeeks];
                count = 0;
                if (found) {
                    do {
                        weekIndex = Math.floor(
                            Math.random() * weeksToChooseFrom.length
                        );
                        if (weeksToChooseFrom[weekIndex]) {
                            week = weeksToChooseFrom[weekIndex][0];
                            if (weeks.get(week).midweek.fixtures[league.id]) {
                                found = weeks
                                    .get(week)
                                    .midweek.fixtures[
                                        league.id
                                    ].find((weekFixture) => {
                                        return (
                                            weekFixture.home ===
                                                teamFixture.home ||
                                            weekFixture.away ===
                                                teamFixture.home ||
                                            weekFixture.home ===
                                                teamFixture.away ||
                                            weekFixture.away ===
                                                teamFixture.away
                                        );
                                    });
                                const index = weeksToChooseFrom.findIndex(
                                    (x) => x[0] === week
                                );
                                weeksToChooseFrom.splice(index, 1);
                            }
                        }
                        count++;
                        if (count > 46) {
                            break;
                        }
                    } while (found);
                    if (!weeks.get(week).midweek.fixtures[league.id]) {
                        weeks.get(week).midweek.fixtures[league.id] = [];
                    }
                    weeks
                        .get(week)
                        .midweek.fixtures[league.id].push(teamFixture);
                } else {
                    if (!weeks.get(week).weekend.fixtures[league.id]) {
                        weeks.get(week).weekend.fixtures[league.id] = [];
                    }
                    weeks
                        .get(week)
                        .weekend.fixtures[league.id].push(teamFixture);
                }
            });
        });
    });
};

const generateTeams = () => {
    defaultTeams.forEach((x) => {
        teams.set(x.id, generateTeam(x, x.league));
    });
};

const generateLeagues = () => {
    defaultLeagues.forEach((league) => {
        const x = new League(league);
        leagues.set(x.id, x);
    });
};

const assignTeamsToLeagues = () => {
    leagues.forEach((league) => {
        teams.forEach((team) => {
            if (team.league === league.id) {
                league.teams.push(team);
            }
        });
    });
};

const nextAction = () => {
    let leaguesStillPlaying = [];
    leagues.forEach((league) => {
        if (!league.isSeasonOver()) {
            leaguesStillPlaying.push(league.id);
        }
    });

    if (leaguesStillPlaying.length === 0) {
        newSeason();
    } else {
        simulateMatchDay();
    }
};

const simulateMatchDay = () => {
    leagues.forEach((league) => {
        league.simulateMatchDay();
    });
    currentHistoryDay = currentHistoryDay++;
    if (isMidweek) {
        isMidweek = false;
        currentWeek++;
    } else {
        isMidweek = true;
    }
    currentResultLeague = yourTeamLeagueId;
    displayMatchDayResults();
    setNextActionButtonText();
};

const displayMatchDayResults = () => {
    let resultDiv = document.getElementById('match-result');
    resultDiv.innerHTML = `<h3>Season ${seasonNumber} - Week ${currentWeek} (${isMidweek ? 'Midweek' : 'Weekend'}) Results:</h3>`;
    resultDiv.innerHTML += `
        <div class="league-tabs">
            <button onclick="currentResultLeague='eng-prem';displayMatchDayResults()">Premier League</button>
            <button onclick="currentResultLeague='eng-champ';displayMatchDayResults()">Championship</button>
            <button onclick="currentResultLeague='eng-l1';displayMatchDayResults()">League One</button>
            <button onclick="currentResultLeague='eng-l2';displayMatchDayResults()">League Two</button>
        </div>
    `;
    let tableHTML = `
        <table>
            <thead>
                <tr>
                    <th>Home Team</th>
                    <th>Score</th>
                    <th>Away Team</th>
                    <th>Attendance</th>
                </tr>
            </thead>
            <tbody>
    `;
    let results = leagues.get(currentResultLeague).getTodayResults();
    results.forEach((result) => {
        const yourTeamName = teams.get(yourTeamId).name;
        let isYourTeam =
            result.homeTeam === yourTeamName ||
            result.awayTeam === yourTeamName;
        tableHTML += `
            <tr ${isYourTeam ? 'class="your-team-result"' : ''}>
                <td>${result.homeTeam}</td>
                <td>${result.homeScore} - ${result.awayScore}</td>
                <td>${result.awayTeam}</td>
                <td>${result.attendance}</td>
            </tr>
        `;
    });
    tableHTML += `</tbody></table>`;
    resultDiv.innerHTML += tableHTML;
};

const setNextActionButtonText = () => {
    let leaguesStillPlaying = [];
    leagues.forEach((league) => {
        if (!league.isSeasonOver()) {
            leaguesStillPlaying.push(league.id);
        }
    });
    const button = document.getElementById('next-action-button');
    let buttonText;
    if (leaguesStillPlaying.length === 0) {
        buttonText = 'Begin to new season';
    } else if (isMidweek) {
        buttonText = 'Continue to weekend';
    } else {
        buttonText = 'Continue to midweek';
    }
    button.innerText = buttonText;
};

const newSeason = () => {
    leagues.forEach((league) => {
        let standings = league.getStandings();
        let promoted = [];
        let relegated = [];
        let playoff = [];
        let promotionTarget = null;
        let relegationTarget = null;

        if (league.promotion !== null) {
            promotionTarget = leagues.get(league.promotion.id);
            if (league.promotion.automatic) {
                promoted = league.promotion.automatic.map(
                    (x) => standings[x - 1]
                );
            }
            if (league.promotion.playoff) {
                playoff = league.promotion.playoff.map((x) => standings[x - 1]);
            }
            if (playoff.length > 0) {
                let playoffWinner = simulatePlayoff(playoff);
                promoted.push(playoffWinner);
            }
        }

        if (league.relegation !== null) {
            relegationTarget = leagues.get(league.relegation.id);
            if (league.relegation.automatic) {
                relegated = league.relegation.automatic.map(
                    (x) => standings[x - 1]
                );
            }
        }

        standings.forEach((team, index) => {
            // Allocate prize money
            team.budget += league.prizeMoney[index];

            // Reset the league
            team.points = 0;
            team.played = 0;
            team.wins = 0;
            team.draws = 0;
            team.losses = 0;

            // Handle age increase
            let retirees = new Map();
            team.players.forEach((player) => {
                player.age += 1;
                player.value = calculateValue(player.skills, player.age);
                if (player.age > 35) {
                    retirees.set(player.id, player);
                }
            });

            // Handle retirees
            retirees.forEach((player) => {
                team.removePlayer(player);
                player.team = 'retired';
                let youth = generateYouthPlayer(player.position, team.id);
                team.addPlayer(youth);
            });
        });

        // Promotions
        if (promotionTarget) {
            league.teams = league.teams.filter(
                (team) => !promoted.includes(team)
            );
            promotionTarget.teams = promotionTarget.teams.concat(promoted);
        }

        // Relegations
        if (relegationTarget) {
            league.teams = league.teams.filter(
                (team) => !relegated.includes(team)
            );
            relegationTarget.teams = relegationTarget.teams.concat(relegated);
        }
    });

    setTeamIndex();
    leagues.forEach((league) => {
        league.matchDay = 0;
        league.history = [];
        league.matchDays = league.generateMatchDays();
    });
    currentHistoryDay = 0;
    currentFutureDay = 0;
    generateTransferList();
    seasonNumber++;
    currentWeek = 0;
    isMidweek = false;
    generateWeeks();

    let resultDiv = document.getElementById('match-result');
    resultDiv.innerHTML = `<h3>Season ${seasonNumber} Started!</h3>`;
    hideAllPopups();
    setNextActionButtonText();
};

const setTeamIndex = () => {
    yourTeamLeagueId = teams.get(yourTeamId).league;
};

const saveGame = () => {
    const gameState = {
        leagues,
        yourTeamLeagueId,
        seasonNumber,
        transferList,
        yourTeamId,
        currentHistoryDay,
        currentFutureDay,
        currentResultLeague,
        currentWeek,
        isMidweek,
    };

    const jsonString = JSON.stringify(gameState, null, 2); // Pretty-print for readability
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `football-manager-save-${seasonNumber}.json`; // Dynamic filename
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url); // Clean up
};

const loadGame = () => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (e) {
        try {
            const save = JSON.parse(e.target.result);
            leagues = save.leagues.map((l) => Object.assign(new League(l), l));
            leagues.forEach((l) => {
                l.teams = l.teams.map((t) => Object.assign(new Team(t), t));
                l.teams.forEach((t) => {
                    t.players
                        .map((p) => Object.assign(new Player(), p))
                        .forEach((p) => t.players.push(t));
                });
            });
            yourTeamLeagueId = save.yourTeamLeagueId;
            seasonNumber = save.seasonNumber;
            yourTeamId = save.yourTeamId;
            currentHistoryDay = save.currentHistoryDay;
            currentFutureDay = save.currentFutureDay;
            currentResultLeague = save.currentResultLeague;
            currentWeek = save.currentWeek;
            isMidweek = save.isMidweek;
            transferList = save.transferList.map((p) =>
                Object.assign(new Player(), p)
            );

            // TODO: Figure out loading leagues, teams, players, matches etc
            /*
            leagues.forEach((l) =>
                l.teams.forEach((t) => teams.set(t.id, t))
            );
            */
            setNextActionButtonText(); // Update UI
            document.getElementById('match-result').innerHTML =
                `<h3>Loaded Season ${seasonNumber}</h3>`;
        } catch (err) {
            alert('Error loading save file: ' + err.message);
        }
    };
    reader.readAsText(file);
};

// TODO: Disabled for now
// window.onload = function () { loadGame(); /* existing code */ };
