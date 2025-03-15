let yourTeamId = 'eng-swindon';

let yourTeamLeagueId = 0;
let currentHistoryDay = 0;
let currentFutureDay = 0;
let seasonNumber = 1;
let currentResultLeague = 0;
let currentMatchDay = 0;

let leagues = new Map();
let teams = new Map();
let players = new Map();
let transferList = new Map();

const setup = () => {
    generateTeams();
    generateLeagues();
    assignTeamsToLeagues();
    generateMatchDays();
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

const generateMatchDays = () => {
    leagues.forEach((league) => {
        league.matchDays = league.generateMatchDays();
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
    currentMatchDay++;
    currentResultLeague = yourTeamLeagueId;
    displayMatchDayResults();
    setNextActionButtonText();
};

const displayMatchDayResults = () => {
    let resultDiv = document.getElementById('match-result');
    resultDiv.innerHTML = `<h3>Season ${seasonNumber} - Match Day ${currentMatchDay} Results:</h3>`;
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
    const leagueArray = [];
    for (const [leagueId, league] of leagues.entries()) {
        leagueArray.push(league);
    }
    const button = document.getElementById('next-action-button');
    button.innerText = leagueArray.every((league) => league.isSeasonOver())
        ? 'Next Season'
        : 'Next Match Day';
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
    currentMatchDay = 0;

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
        currentMatchDay,
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
            currentMatchDay = save.currentMatchDay;
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
