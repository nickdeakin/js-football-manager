// js/ui.js (top)
let uiCurrentHistoryDay = 0;
let uiCurrentFutureDay = 0;

function showMyTeamPopup() {
    showTeamPopup(yourTeamId);
}

function showTeamPopup(teamId) {
    let team = teams.get(teamId);
    let league = leagues.get(team.league);
    let popup = document.getElementById('team-popup');
    let overlay = document.getElementById('popup-overlay');
    let avgRating = team.getTeamSkill().toFixed(1);

    let html = `
        <div class="popup-header">
            <h3>${team.name} (${league.name})</h3>
            <span class="close-btn" onclick="hideTeamPopup()">X</span>
        </div>
        <p><strong>Formation:</strong> ${team.formation}</p>
        <p><strong>Average Starting XI Rating:</strong> ${avgRating}</p>
        <p><strong>Budget:</strong> £${team.budget.toFixed(1)}M</p>
        <p><strong>Weekly Wage Bill:</strong> £${team.wageBill}K</p>
        <p><strong>Stadium:</strong> ${team.stadium.name} (${team.stadium.capacity})</p>
        <p><strong>Popularity:</strong> ${team.popularity}</p>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Position</th>
                    <th>Avg Skill</th>
                    <th>Age</th>
                    <th>Value</th>
                    <th>Wage</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td colspan="6"><h4>Starting XI:</h4></td>
                </tr>
    `;
    team.players.slice(0, 11).forEach((player, index) => {
        html += `
            <tr>
                <td><span class="player-link" onclick="showPlayerPopup('${player.id}')">${player.name}</span></td>
                <td>${player.position}</td>
                <td>${player.getAverageSkill().toFixed(1)}</td>
                <td>${player.age}</td>
                <td>£${player.value}M</td>
                <td>£${player.wage}K</td>
            </tr>
        `;
    });

    html += `
                <tr>
                    <td colspan="6"><h4>Substitutes:</h4></td>
                </tr>
    `;
    team.players.slice(11, 16).forEach((player, index) => {
        html += `
            <tr>
                <td><span class="player-link" onclick="showPlayerPopup('${player.id}'))">${player.name}</span></td>
                <td>${player.position}</td>
                <td>${player.getAverageSkill().toFixed(1)}</td>
                <td>${player.age}</td>
                <td>£${player.value}M</td>
                <td>£${player.wage}K</td>
            </tr>
        `;
    });

    html += `
                <tr>
                    <td colspan="6"><h4>Reserves:</h4></td>
                </tr>
    `;
    team.players.slice(16).forEach((player, index) => {
        html += `
            <tr>
                <td><span class="player-link" onclick="showPlayerPopup('${player.id}'))">${player.name}</span></td>
                <td>${player.position}</td>
                <td>${player.getAverageSkill().toFixed(1)}</td>
                <td>${player.age}</td>
                <td>£${player.value}M</td>
                <td>£${player.wage}K</td>
            </tr>
        `;
    });

    html += `</tbody></table>`;
    popup.innerHTML = html;
    popup.style.display = 'block';
    overlay.style.display = 'block';
}

function hideTeamPopup() {
    document.getElementById('team-popup').style.display = 'none';
    document.getElementById('popup-overlay').style.display = 'none';
}

function showTransferPopup() {
    let popup = document.getElementById('transfer-popup');
    let overlay = document.getElementById('popup-overlay');
    let yourTeam = teams.get(yourTeamId);
    let html = `
        <div class="popup-header">
            <h3>Transfer Market (Your Budget: £${yourTeam.budget.toFixed(1)}M)</h3>
            <span class="close-btn" onclick="hideTransferPopup()">X</span>
        </div>
    `;
    if (transferList.length === 0) {
        html += '<p>No players available for transfer.</p>';
    } else {
        html += `
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Position</th>
                        <th>Avg Skill</th>
                        <th>Age</th>
                        <th>Value</th>
                        <th>Wage</th>
                    </tr>
                </thead>
                <tbody>
        `;
        transferList.forEach((player) => {
            html += `
                <tr>
                    <td><span class="player-link" onclick="showPlayerPopup(${player.id})">${player.name}</span></td>
                    <td>${player.position}</td>
                    <td>${player.getAverageSkill().toFixed(1)}</td>
                    <td>${player.age}</td>
                    <td>£${player.value}M</td>
                    <td>£${player.wage}K</td>
                </tr>
            `;
        });
        html += `</tbody></table>`;
    }
    popup.innerHTML = html;
    popup.style.display = 'block';
    overlay.style.display = 'block';
}

function hideTransferPopup() {
    document.getElementById('transfer-popup').style.display = 'none';
    document.getElementById('popup-overlay').style.display = 'none';
}

function showPlayerPopup(playerId) {
    const player = players.get(playerId);
    const isYourTeam = player.team === yourTeamId;
    const team = teams.get(player.team);

    let popup = document.getElementById('player-popup');
    let overlay = document.getElementById('popup-overlay');
    let html = `
        <div class="popup-header">
            <h3>${player.name}</h3>
            <span class="close-btn" onclick="hidePlayerPopup()">X</span>
        </div>
        <table>
            <tr><th>Attribute</th><th>Value</th></tr>
            <tr><td>Age</td><td>${player.age}</td></tr>
            <tr><td>Team</td><td>${team ? team.name : 'None'}</td></tr>
            <tr><td>Nationality</td><td>${player.nationality}</td></tr>
            <tr><td>Position</td><td>${player.position}</td></tr>
            <tr><td>Value</td><td>£${player.value}M</td></tr>
            <tr><td>Wage</td><td>£${player.wage}K</td></tr>
        </table>
        <table>
            <tr><th>Skill</th><th>Value</th></tr>
            <tr><td>Passing</td><td>${player.skills.passing}</td></tr>
            <tr><td>Tackling</td><td>${player.skills.tackling}</td></tr>
            <tr><td>Pace</td><td>${player.skills.pace}</td></tr>
            <tr><td>Heading</td><td>${player.skills.heading}</td></tr>
            <tr><td>Stamina</td><td>${player.skills.stamina}</td></tr>
            <tr><td>Shooting</td><td>${player.skills.shooting}</td></tr>
        </table>
    `;
    if (isYourTeam) {
        html += `<button onclick="sellPlayerFromPopup(${playerId});hidePlayerPopup()">Sell Player</button>`;
    } else if (!team) {
        html += `<button onclick="buyPlayerFromPopup(${playerId});hidePlayerPopup()">Buy Player</button>`;
    }
    popup.innerHTML = html;
    popup.style.display = 'block';
    overlay.style.display = 'block';
}

function hidePlayerPopup() {
    document.getElementById('player-popup').style.display = 'none';
    document.getElementById('popup-overlay').style.display = 'none';
}

function sellPlayerFromPopup(teamIndex, playerIndex) {
    let team = leagues[yourTeamLeagueIndex].teams[teamIndex];
    let player = team.removePlayer(playerIndex);
    team.budget += parseFloat(player.value);
    showTeamPopup(teamIndex);
}

function buyPlayerFromPopup(transferIndex) {
    let player = transferList[transferIndex];
    let yourTeam = leagues[yourTeamLeagueIndex].teams[0];
    if (yourTeam.budget >= player.value && yourTeam.players.length < 25) {
        yourTeam.addPlayer(player);
        yourTeam.budget -= parseFloat(player.value);
        transferList.splice(transferIndex, 1);
        showTransferPopup();
    } else {
        alert('Not enough budget or squad space (max 25 players)!');
    }
}

function showResultsPopup(leagueId = yourTeamLeagueId) {
    let popup = document.getElementById('results-popup');
    let overlay = document.getElementById('popup-overlay');
    let league = leagues.get(leagueId);
    const yourTeam = teams.get(yourTeamId);
    uiCurrentHistoryDay = Math.min(
        uiCurrentHistoryDay,
        league.history.length - 1
    );
    popup.innerHTML = `
        <div class="popup-header">
            <h3>Results - ${league.name}</h3>
            <span class="close-btn" onclick="hideResultsPopup()">X</span>
        </div>
        <div class="league-tabs">
            <button onclick="showResultsPopup('eng-prem')">Premier League</button>
            <button onclick="showResultsPopup('eng-champ')">Championship</button>
            <button onclick="showResultsPopup('eng-l1')">League One</button>
            <button onclick="showResultsPopup('eng-l2')">League Two</button>
        </div>
    `;
    let controlsHTML = '';
    let contentHTML = '';
    if (league.history.length === 0) {
        contentHTML = '<p>No matches played yet.</p>';
    } else {
        for (let i = 0; i < league.history.length; i++) {
            controlsHTML += `<button onclick="currentHistoryDay=${i};showResultsPopup('${league.id}')">Day ${i + 1}</button>`;
        }
        let day = league.history[currentHistoryDay];
        contentHTML = `
            <h4>Match Day ${day.matchDay}:</h4>
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
        day.results.forEach((result) => {
            let isYourTeam =
                result.homeTeam === yourTeam.name ||
                result.awayTeam === yourTeam.name;
            contentHTML += `
                <tr ${isYourTeam ? 'class="your-team-result"' : ''}>
                    <td>${result.homeTeam}</td>
                    <td>${result.homeScore} - ${result.awayScore}</td>
                    <td>${result.awayTeam}</td>
                    <td>${result.attendance}</td>
                </tr>
            `;
        });
        contentHTML += `</tbody></table>`;
    }
    popup.innerHTML += `<div>${controlsHTML}</div><div>${contentHTML}</div>`;
    popup.style.display = 'block';
    overlay.style.display = 'block';
}

function hideResultsPopup() {
    document.getElementById('results-popup').style.display = 'none';
    document.getElementById('popup-overlay').style.display = 'none';
}

function showFixturesPopup(leagueId = yourTeamLeagueId) {
    let popup = document.getElementById('fixtures-popup');
    let overlay = document.getElementById('popup-overlay');
    let league = leagues.get(leagueId);
    let futureFixtures = league.getFutureFixtures();
    let yourTeam = teams.get(yourTeamId);
    uiCurrentFutureDay = Math.min(
        uiCurrentFutureDay,
        futureFixtures.length - 1
    );
    popup.innerHTML = `
        <div class="popup-header">
            <h3>Fixtures - ${league.name}</h3>
            <span class="close-btn" onclick="hideFixturesPopup()">X</span>
        </div>
        <div class="league-tabs">
            <button onclick="showFixturesPopup('eng-prem')">Premier League</button>
            <button onclick="showFixturesPopup('eng-champ')">Championship</button>
            <button onclick="showFixturesPopup('eng-l1')">League One</button>
            <button onclick="showFixturesPopup('eng-l2')">League Two</button>
        </div>
    `;
    let controlsHTML = '';
    let contentHTML = '';
    if (futureFixtures.length === 0) {
        contentHTML = '<p>Season Over!</p>';
    } else {
        currentFutureDay = Math.min(
            currentFutureDay,
            futureFixtures.length - 1
        );
        for (let i = 0; i < futureFixtures.length; i++) {
            controlsHTML += `<button onclick="currentFutureDay=${i};showFixturesPopup('${league.id}')">Day ${futureFixtures[i].matchDay}</button>`;
        }
        let day = futureFixtures[currentFutureDay];
        contentHTML = `
            <h4>Match Day ${day.matchDay}:</h4>
            <table>
                <thead>
                    <tr>
                        <th>Home Team</th>
                        <th></th>
                        <th>Away Team</th>
                    </tr>
                </thead>
                <tbody>
        `;
        day.fixtures.forEach((fixture) => {
            const [home, away] = fixture.split(' vs ');
            let isYourTeam = home === yourTeam.name || away === yourTeam.name;
            contentHTML += `
                <tr ${isYourTeam ? 'class="your-team-result"' : ''}>
                    <td>${home}</td>
                    <td>vs</td>
                    <td>${away}</td>
                </tr>
            `;
        });
        contentHTML += `</tbody></table>`;
    }
    popup.innerHTML += `<div>${controlsHTML}</div><div>${contentHTML}</div>`;
    popup.style.display = 'block';
    overlay.style.display = 'block';
}

function hideFixturesPopup() {
    document.getElementById('fixtures-popup').style.display = 'none';
    document.getElementById('popup-overlay').style.display = 'none';
}

function showTablePopup(leagueId = yourTeamLeagueId) {
    let popup = document.getElementById('table-popup');
    let overlay = document.getElementById('popup-overlay');
    let league = leagues.get(leagueId);
    let standings = league.getStandings();
    popup.innerHTML = `
        <div class="popup-header">
            <h3>${league.name} Table</h3>
            <span class="close-btn" onclick="hideTablePopup()">X</span>
        </div>
        <div class="league-tabs">
            <button onclick="showTablePopup('eng-prem')">Premier League</button>
            <button onclick="showTablePopup('eng-champ')">Championship</button>
            <button onclick="showTablePopup('eng-l1')">League One</button>
            <button onclick="showTablePopup('eng-l2')">League Two</button>
        </div>
    `;
    let tableHTML = `
        <table>
            <thead>
                <tr>
                    <th class="team-column">Team</th>
                    <th>P</th>
                    <th>W</th>
                    <th>D</th>
                    <th>L</th>
                    <th>Pts</th>
                </tr>
            </thead>
            <tbody>
    `;
    standings.forEach((team, index) => {
        const position = index + 1;
        let rowClass = '';
        if (league.win) {
            if (league.win.champions.indexOf(position) > -1) {
                rowClass = 'champions';
                if (
                    league.win.champions[league.win.champions.length - 1] ===
                    position
                ) {
                    rowClass += ' __last';
                }
            }
            if (league.win.championsLeague.indexOf(position) > -1) {
                rowClass = 'champions-league';
                if (
                    league.win.championsLeague[
                        league.win.championsLeague.length - 1
                    ] === position
                ) {
                    rowClass += ' __last';
                }
            }
            if (league.win.europaLeague.indexOf(position) > -1) {
                rowClass = 'europa-league';
                if (
                    league.win.europaLeague[
                        league.win.europaLeague.length - 1
                    ] === position
                ) {
                    rowClass += ' __last';
                }
            }
        }
        if (league.promotion) {
            if (league.promotion.automatic.indexOf(position) > -1) {
                rowClass = 'auto-promotion';
                if (
                    league.promotion.automatic[
                        league.promotion.automatic.length - 1
                    ] === position
                ) {
                    rowClass += ' __last';
                }
            }
            if (league.promotion.playoff.indexOf(position) > -1) {
                rowClass = 'playoff';
                if (
                    league.promotion.playoff[
                        league.promotion.playoff.length - 1
                    ] === position
                ) {
                    rowClass += ' __last';
                }
            }
        }
        if (league.relegation) {
            if (league.relegation.automatic.indexOf(position) > -1) {
                rowClass = 'relegation';
                if (league.relegation.automatic[0] === position) {
                    rowClass += ' __first';
                }
            }
        }
        if (team.id === yourTeamId) rowClass = 'your-team';
        tableHTML += `
            <tr class="${rowClass}">
                <td class="team-column"><span class="team-link" onclick="showTeamPopup('${team.id}');hideTablePopup()">${team.name}</span></td>
                <td>${team.played}</td>
                <td>${team.wins}</td>
                <td>${team.draws}</td>
                <td>${team.losses}</td>
                <td>${team.points}</td>
            </tr>
        `;
    });
    tableHTML += `</tbody></table>`;
    popup.innerHTML += tableHTML;
    popup.style.display = 'block';
    overlay.style.display = 'block';
}

function hideTablePopup() {
    document.getElementById('table-popup').style.display = 'none';
    document.getElementById('popup-overlay').style.display = 'none';
}

function hideAllPopups() {
    hideTeamPopup();
    hideTransferPopup();
    hideResultsPopup();
    hideFixturesPopup();
    hideTablePopup();
    hidePlayerPopup();
}

// Initial setup
generateTransferList();
window.onload = function () {
    document.getElementById('match-result').innerHTML =
        `<h3>Welcome to Football Manager - Season ${seasonNumber}</h3>`;
    setup();
    setTeamIndex();
    setTimeout(() => {
        setNextActionButtonText();
    });
};
