let yourTeamName = 'Swindon Town';

let yourTeamLeagueIndex = 0;
let yourTeamIndex = 0;
let currentHistoryDay = 0;
let currentFutureDay = 0;
let transferList = [];
let seasonNumber = 1;
let currentResultLeague = 0;
let currentMatchDay = 0;

let leagues = defaultLeagues.map(league => new League(league));
leagues.forEach(league => {
    league.teams = defaultTeams.filter(team => team.league === league.id).map(team => generateTeam(team, league.id));
    league.matchDays = league.generateMatchDays();
});

let allTeams = new Map();
leagues.forEach(l => l.teams.forEach(t => allTeams.set(t.id,t)));

function nextAction() {
    if (leagues.every((league) => league.isSeasonOver())) {
        newSeason();
    } else {
        simulateMatchDay();
    }
}

function simulateMatchDay() {
    leagues.forEach((league) => league.simulateMatchDay());
    currentHistoryDay = currentHistoryDay++;
    currentMatchDay++;
    currentResultLeague = yourTeamLeagueIndex;
    displayMatchDayResults();
    setNextActionButtonText();
}

function displayMatchDayResults() {
    let resultDiv = document.getElementById('match-result');
    resultDiv.innerHTML = `<h3>Season ${seasonNumber} - Match Day ${currentMatchDay} Results:</h3>`;
    resultDiv.innerHTML += `
        <div class="league-tabs">
            <button onclick="currentResultLeague=0;displayMatchDayResults()">Premier League</button>
            <button onclick="currentResultLeague=1;displayMatchDayResults()">Championship</button>
            <button onclick="currentResultLeague=2;displayMatchDayResults()">League One</button>
            <button onclick="currentResultLeague=3;displayMatchDayResults()">League Two</button>
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
    let results = leagues[currentResultLeague].getTodayResults();
    results.forEach((result) => {
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
}

function setNextActionButtonText() {
    const button = document.getElementById('next-action-button');
    button.innerText = leagues.every((league) => league.isSeasonOver())
        ? 'Next Season'
        : 'Next Match Day';
}

function newSeason() {
    leagues.forEach((league) => {
        let standings = league.getStandings();
        let promoted = [];
        let relegated = [];
        let playoff = [];
        let promotionTarget = null;
        let relegationTarget = null;

        if (league.promotion !== null) {
            promotionTarget = leagues.find(
                (x) => x.id === league.promotion.id
            );
            if (league.promotion.automatic) {
                promoted = league.promotion.automatic.map((x) => standings[x - 1]);
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
            relegationTarget = leagues.find(
                (x) => x.id === league.relegation.id
            );
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
            let retirees = [];
            team.players.forEach((player, index) => {
                player.age += 1;
                player.value = calculateValue(player.skills, player.age);
                if (player.age > 35) retirees.push(index);
            });

            // Handle retirees
            for (let i = retirees.length - 1; i >= 0; i--) {
                // Player retires
                let retiredPlayer = team.removePlayer(retirees[i]);
                // Youth player takes their place
                let youth = generateYouthPlayer(retiredPlayer.position);
                team.addPlayer(youth);
            }
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

    allTeams = new Map();
    leagues.forEach(l => l.teams.forEach(t => allTeams.set(t.id,t)));

    let resultDiv = document.getElementById('match-result');
    resultDiv.innerHTML = `<h3>Season ${seasonNumber} Started!</h3>`;
    hideAllPopups();
    setNextActionButtonText();
}

function setTeamIndex() {
    yourTeamLeagueIndex = leagues.findIndex((league) =>
        league.teams.some((team) => team.name === yourTeamName)
    );
    yourTeamIndex = leagues[yourTeamLeagueIndex].teams.findIndex(
        (team) => team.name === yourTeamName
    );
}

function saveGame() {
    const gameState = {
        leagues,
        yourTeamName,
        yourTeamLeagueIndex,
        seasonNumber,
        transferList,
        yourTeamIndex,
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
}

function loadGame() {
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
            yourTeamName = save.yourTeamName;
            yourTeamLeagueIndex = save.yourTeamLeagueIndex;
            seasonNumber = save.seasonNumber;
            yourTeamIndex = save.yourTeamIndex;
            currentHistoryDay = save.currentHistoryDay;
            currentFutureDay = save.currentFutureDay;
            currentResultLeague = save.currentResultLeague;
            currentMatchDay = save.currentMatchDay;
            transferList = save.transferList.map((p) =>
                Object.assign(new Player(), p)
            );
            allTeams = new Map();
            leagues.forEach(l => l.teams.forEach(t => allTeams.set(t.id,t)));
            setNextActionButtonText(); // Update UI
            document.getElementById('match-result').innerHTML =
                `<h3>Loaded Season ${seasonNumber}</h3>`;
        } catch (err) {
            alert('Error loading save file: ' + err.message);
        }
    };
    reader.readAsText(file);
}

// TODO: Disabled for now
// window.onload = function () { loadGame(); /* existing code */ };
