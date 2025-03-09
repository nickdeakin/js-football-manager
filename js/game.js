const yourTeamName = 'Grok United';
let leagues = [
    new League(
        teamNames.slice(0, 20).map((name) => generateTeam(name, 0)),
        0
    ),
    new League(
        teamNames.slice(20, 40).map((name) => generateTeam(name, 1)),
        1
    ),
    new League(
        teamNames.slice(40, 60).map((name) => generateTeam(name, 2)),
        2
    ),
    new League(
        teamNames.slice(60, 80).map((name) => generateTeam(name, 3)),
        3
    ),
];
let yourTeamLeagueIndex = 0;
let currentHistoryDay = 0;
let currentFutureDay = 0;
let transferList = [];
let seasonNumber = 1;
let currentResultLeague = 0;

function nextAction() {
    if (leagues.every((league) => league.isSeasonOver())) {
        newSeason();
    } else {
        simulateMatchDay();
    }
}

function simulateMatchDay() {
    leagues.forEach((league) => league.simulateMatchDay());
    currentHistoryDay = leagues[yourTeamLeagueIndex].history.length - 1;
    displayMatchDayResults();
    setNextActionButtonText();
}

function displayMatchDayResults() {
    let resultDiv = document.getElementById('match-result');
    let matchDay = leagues[yourTeamLeagueIndex].matchDay;
    resultDiv.innerHTML = `<h3>Season ${seasonNumber} - Match Day ${matchDay} Results:</h3>`;
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
        const prizeMoney =
            league.tier === 0
                ? [
                      50, 45, 40, 35, 30, 28, 26, 24, 22, 20, 18, 16, 14, 12,
                      10, 9, 8, 7, 6, 5,
                  ]
                : league.tier === 1
                  ? [
                        20, 18, 16, 14, 12, 10, 9, 8, 7, 6, 5, 4, 3, 2.5, 2,
                        1.8, 1.6, 1.4, 1.2, 1,
                    ]
                  : league.tier === 2
                    ? [
                          10, 9, 8, 7, 6, 5, 4.5, 4, 3.5, 3, 2.5, 2, 1.8, 1.6,
                          1.4, 1.2, 1, 0.9, 0.8, 0.7,
                      ]
                    : [
                          5, 4.5, 4, 3.5, 3, 2.5, 2, 1.8, 1.6, 1.4, 1.2, 1, 0.9,
                          0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2,
                      ];
        standings.forEach((team, index) => {
            team.budget += prizeMoney[index];
            team.points = 0;
            team.played = 0;
            team.wins = 0;
            team.draws = 0;
            team.losses = 0;

            let retirees = [];
            team.players.forEach((player, index) => {
                player.age += 1;
                player.value = calculateValue(player.skills, player.age);
                if (player.age > 35) retirees.push(index);
            });
            for (let i = retirees.length - 1; i >= 0; i--) {
                let retiredPlayer = team.removePlayer(retirees[i]);
                let youth = generateYouthPlayer(retiredPlayer.position);
                team.addPlayer(youth);
            }
        });

        if (league.tier === 0) {
            let relegated = standings.slice(-3);
            let promoted = leagues[1].getStandings();
            let autoPromoted = promoted.slice(0, 2);
            let playoffTeams = promoted.slice(2, 6);
            let playoffWinner = simulatePlayoff(playoffTeams);
            league.teams = standings
                .slice(0, -3)
                .concat(autoPromoted)
                .concat([playoffWinner]);
            leagues[1].teams = promoted
                .filter((t) => !autoPromoted.includes(t) && t !== playoffWinner)
                .concat(relegated);
        } else if (league.tier === 1) {
            let relegated = standings.slice(-3);
            let promoted = leagues[2].getStandings();
            let autoPromoted = promoted.slice(0, 2);
            let playoffTeams = promoted.slice(2, 6);
            let playoffWinner = simulatePlayoff(playoffTeams);
            league.teams = standings
                .slice(0, -3)
                .concat(autoPromoted)
                .concat([playoffWinner]);
            leagues[2].teams = promoted
                .filter((t) => !autoPromoted.includes(t) && t !== playoffWinner)
                .concat(relegated);
        } else if (league.tier === 2) {
            let relegated = standings.slice(-3);
            let promoted = leagues[3].getStandings();
            let autoPromoted = promoted.slice(0, 3);
            let playoffTeams = promoted.slice(3, 7);
            let playoffWinner = simulatePlayoff(playoffTeams);
            league.teams = standings
                .slice(0, -3)
                .concat(autoPromoted)
                .concat([playoffWinner]);
            leagues[3].teams = promoted
                .filter((t) => !autoPromoted.includes(t) && t !== playoffWinner)
                .concat(relegated);
        }
    });

    yourTeamLeagueIndex = leagues.findIndex((league) =>
        league.teams.some((team) => team.name === yourTeamName)
    );
    leagues.forEach((league) => {
        league.matchDay = 0;
        league.history = [];
        league.matchDays = league.generateMatchDays();
    });
    currentHistoryDay = 0;
    currentFutureDay = 0;
    generateTransferList();
    seasonNumber++;
    let resultDiv = document.getElementById('match-result');
    resultDiv.innerHTML = `<h3>Season ${seasonNumber} Started!</h3>`;
    hideAllPopups();
    setNextActionButtonText();
}
