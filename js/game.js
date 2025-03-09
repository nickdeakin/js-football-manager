const yourTeamName = 'Grok United';
let leagues = [
    new League(
        teamNames.slice(0, 20).map((name) => generateTeam(name, 0)),
        0
    ), // Premier League: 20 teams
    new League(
        teamNames.slice(20, 44).map((name) => generateTeam(name, 1)),
        1
    ), // Championship: 24 teams
    new League(
        teamNames.slice(44, 68).map((name) => generateTeam(name, 2)),
        2
    ), // League One: 24 teams
    new League(
        teamNames.slice(68, 92).map((name) => generateTeam(name, 3)),
        3
    ), // League Two: 24 teams
];
let yourTeamLeagueIndex = 0;
let currentWeek = 0; // 0-51 (52 weeks)
let currentType = 'weekend'; // "weekend" or "midweek"
let seasonNumber = 1;
let transferList = [];
let grokCup = null; // Will hold the cup competition
let postponedLeagueMatches = []; // [ { leagueIndex, team1Index, team2Index, week } ]

// Grok Cup setup
function initializeGrokCup() {
    let allTeams = leagues.flatMap((league) => league.teams);
    grokCup = {
        teams: allTeams.slice(), // 92 teams
        round: 1,
        fixtures: [],
        results: [],
    };
    scheduleGrokCupRound(1);
}

// Schedule a Grok Cup round
function scheduleGrokCupRound(round) {
    let teams = grokCup.teams;
    if (teams.length <= 1) return;

    grokCup.fixtures = [];
    let cupWeek = { 1: 1, 2: 8, 3: 16, 4: 24, 5: 32, 6: 40 }[round];

    // Shuffle teams
    for (let i = teams.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [teams[i], teams[j]] = [teams[j], teams[i]];
    }

    // Pair teams, handle byes if odd number
    for (let i = 0; i < teams.length; i += 2) {
        if (i + 1 < teams.length) {
            grokCup.fixtures.push({
                team1: teams[i],
                team2: teams[i + 1],
                week: cupWeek,
            });
        } else {
            grokCup.fixtures.push({
                team1: teams[i],
                team2: null,
                week: cupWeek,
            }); // Bye
        }
    }
}

// Simulate Grok Cup matches for the current week
function simulateGrokCupMatches(week) {
    let currentFixtures = grokCup.fixtures.filter((f) => f.week === week);
    if (currentFixtures.length === 0) return [];

    let results = [];
    let nextRoundTeams = [];
    currentFixtures.forEach((fixture) => {
        if (fixture.team2 === null) {
            nextRoundTeams.push(fixture.team1); // Bye
            results.push({
                homeTeam: fixture.team1.name,
                awayTeam: 'Bye',
                homeScore: '-',
                awayScore: '-',
                attendance: 0,
            });
        } else {
            let match = new Match(fixture.team1, fixture.team2);
            let result = match.simulate();
            results.push(result);
            let winner =
                result.homeScore > result.awayScore
                    ? fixture.team1
                    : fixture.team2;
            nextRoundTeams.push(winner);
        }
    });

    grokCup.results.push({
        round: grokCup.round,
        week: week,
        matches: results,
    });
    grokCup.teams = nextRoundTeams;
    grokCup.round++;
    if (grokCup.teams.length > 1) scheduleGrokCupRound(grokCup.round);

    return results;
}

function nextAction() {
    currentWeek++;
    if (currentWeek > 51) {
        if (
            leagues.every(
                (league) => league.matchDay >= league.matchDays.length
            ) &&
            grokCup.teams.length <= 1
        ) {
            newSeason();
            return;
        }
        currentWeek = 0; // Loop back if season not over
    }

    if (currentType === 'weekend') {
        simulateWeekend();
        currentType = 'midweek';
    } else {
        simulateMidweek();
        currentType = 'weekend';
    }
    updateUI();
}

function simulateWeekend() {
    let cupWeek = [1, 8, 16, 24, 32, 40].includes(currentWeek);
    if (cupWeek) {
        let cupResults = simulateGrokCupMatches(currentWeek);
        displayCupResults(cupResults);
        postponeLeagueMatches(currentWeek);
    } else {
        leagues.forEach((league, index) => {
            if (league.matchDay < league.matchDays.length) {
                league.simulateMatchDay();
            }
        });
        displayMatchDayResults();
    }
}

function simulateMidweek() {
    let postponed = postponedLeagueMatches.filter(
        (m) => m.week === currentWeek
    );
    if (postponed.length > 0) {
        let results = [];
        postponed.forEach((match) => {
            let league = leagues[match.leagueIndex];
            let team1 = league.teams[match.team1Index];
            let team2 = league.teams[match.team2Index];
            let sim = new Match(team1, team2).simulate();
            results.push(sim);
        });
        postponedLeagueMatches = postponedLeagueMatches.filter(
            (m) => m.week !== currentWeek
        );
        displayPostponedResults(results);
    }
}

function postponeLeagueMatches(week) {
    leagues.forEach((league, leagueIndex) => {
        if (league.matchDay < league.matchDays.length) {
            let fixtures = league.matchDays[league.matchDay];
            fixtures.forEach(([team1, team2], i) => {
                if (
                    grokCup.fixtures.some(
                        (f) =>
                            f.week === week &&
                            (f.team1 === team1 ||
                                f.team2 === team1 ||
                                f.team1 === team2 ||
                                f.team2 === team2)
                    )
                ) {
                    postponedLeagueMatches.push({
                        leagueIndex,
                        team1Index: league.teams.indexOf(team1),
                        team2Index: league.teams.indexOf(team2),
                        week: week + 1,
                    });
                } else {
                    new Match(team1, team2).simulate(); // Play non-clashing matches
                }
            });
            league.matchDay++;
        }
    });
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
                : [
                      20, 18, 16, 14, 12, 10, 9, 8, 7, 6, 5, 4, 3, 2.5, 2, 1.8,
                      1.6, 1.4, 1.2, 1, 0.8, 0.6, 0.4, 0.2,
                  ];
        standings.forEach((team, index) => {
            team.budget += prizeMoney[index] || 0;
            team.points = 0;
            team.played = 0;
            team.wins = 0;
            team.draws = 0;
            team.losses = 0;
            let retirees = [];
            team.players.forEach((player, i) => {
                player.age += 1;
                player.value = calculateValue(player.skills, player.age);
                if (player.age > 35) retirees.push(i);
            });
            for (let i = retirees.length - 1; i >= 0; i--) {
                let retired = team.removePlayer(retirees[i]);
                team.addPlayer(generateYouthPlayer(retired.position));
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
        } else if (league.tier === 1 || league.tier === 2) {
            let relegated = standings.slice(-3);
            let promoted = leagues[league.tier + 1].getStandings();
            let autoPromoted = promoted.slice(0, 2);
            let playoffTeams = promoted.slice(2, 6);
            let playoffWinner = simulatePlayoff(playoffTeams);
            league.teams = standings
                .slice(0, -3)
                .concat(autoPromoted)
                .concat([playoffWinner]);
            leagues[league.tier + 1].teams = promoted
                .filter((t) => !autoPromoted.includes(t) && t !== playoffWinner)
                .concat(relegated);
        } else if (league.tier === 3) {
            league.teams = standings; // No relegation from League Two
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
    currentWeek = 0;
    currentType = 'weekend';
    seasonNumber++;
    grokCup = null;
    postponedLeagueMatches = [];
    initializeGrokCup();
    document.getElementById('match-result').innerHTML =
        `<h3>Season ${seasonNumber} Started!</h3>`;
    hideAllPopups();
    updateUI();
}

function updateUI() {
    let button = document.getElementById('next-action-button');
    button.innerText = `Next ${currentType === 'weekend' ? 'Weekend' : 'Midweek'} (Week ${currentWeek + 1})`;
    if (
        currentWeek === 51 &&
        leagues.every((league) => league.matchDay >= league.matchDays.length) &&
        grokCup.teams.length <= 1
    ) {
        button.innerText = 'Next Season';
    }
}

// Initial setup
initializeGrokCup();
