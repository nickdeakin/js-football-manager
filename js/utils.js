function calculateValue(skills, age) {
    let avgSkill = Object.values(skills).reduce((sum, val) => sum + val, 0) / 6;
    let baseValue = (avgSkill - 40) * 0.5;
    let ageMultiplier =
        age < 25
            ? 0.5 + (age - 18) * 0.0714
            : age <= 30
              ? 1.0
              : 1.0 - (age - 30) * 0.0714;
    return Math.max(baseValue * ageMultiplier, 0).toFixed(1);
}

function calculateWage(skills) {
    let avgSkill = Object.values(skills).reduce((sum, val) => sum + val, 0) / 6;
    return Math.floor((avgSkill - 40) * 2);
}

function generateSkills(min, max) {
    return {
        passing: Math.floor(Math.random() * (max - min + 1)) + min,
        tackling: Math.floor(Math.random() * (max - min + 1)) + min,
        pace: Math.floor(Math.random() * (max - min + 1)) + min,
        heading: Math.floor(Math.random() * (max - min + 1)) + min,
        stamina: Math.floor(Math.random() * (max - min + 1)) + min,
        shooting: Math.floor(Math.random() * (max - min + 1)) + min,
    };
}

function generateTeam(name, leagueTier) {
    const formation = formations[Math.floor(Math.random() * formations.length)];
    const stadiumRanges = [
        [20000, 70000], // Premier League
        [15000, 45000], // Championship
        [10000, 35000], // League One
        [10000, 25000], // League Two
    ];
    const budgetRanges = [
        [50, 250], // Premier League
        [10, 100], // Championship
        [5, 25], // League One
        [0, 10], // League Two
    ];
    const skillRanges = [
        { xi: [70, 100], sub: [60, 90], res: [50, 80] }, // Premier League
        { xi: [60, 90], sub: [50, 80], res: [40, 70] }, // Championship
        { xi: [50, 80], sub: [40, 70], res: [30, 60] }, // League One
        { xi: [40, 70], sub: [30, 60], res: [20, 50] }, // League Two
    ];
    const stadiumCapacity =
        Math.floor(
            Math.random() *
                (stadiumRanges[leagueTier][1] -
                    stadiumRanges[leagueTier][0] +
                    1)
        ) + stadiumRanges[leagueTier][0];
    const popularity =
        leagueTier === 0
            ? Math.floor(Math.random() * 31) + 70
            : leagueTier === 1
              ? Math.floor(Math.random() * 41) + 40
              : leagueTier === 2
                ? Math.floor(Math.random() * 41) + 30
                : Math.floor(Math.random() * 41) + 20;
    const budget =
        Math.floor(
            Math.random() *
                (budgetRanges[leagueTier][1] - budgetRanges[leagueTier][0] + 1)
        ) + budgetRanges[leagueTier][0];
    let team = new Team(
        name,
        formation.name,
        leagueTier,
        stadiumCapacity,
        popularity,
        budget
    );
    const skills = skillRanges[leagueTier];

    team.addPlayer(
        new Player(
            `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`,
            'Goalkeeper',
            generateSkills(skills.xi[0], skills.xi[1]),
            0,
            0,
            Math.floor(Math.random() * 18) + 18,
            nationalities[Math.floor(Math.random() * nationalities.length)]
        )
    );
    team.players[0].value = calculateValue(
        team.players[0].skills,
        team.players[0].age
    );
    team.players[0].wage = calculateWage(team.players[0].skills);

    for (let i = 0; i < formation.def; i++) {
        let playerSkills = generateSkills(skills.xi[0], skills.xi[1]);
        let age = Math.floor(Math.random() * 18) + 18;
        team.addPlayer(
            new Player(
                `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`,
                'Defender',
                playerSkills,
                calculateValue(playerSkills, age),
                calculateWage(playerSkills),
                age,
                nationalities[Math.floor(Math.random() * nationalities.length)]
            )
        );
    }

    for (let i = 0; i < formation.mid; i++) {
        let playerSkills = generateSkills(skills.xi[0], skills.xi[1]);
        let age = Math.floor(Math.random() * 18) + 18;
        team.addPlayer(
            new Player(
                `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`,
                'Midfielder',
                playerSkills,
                calculateValue(playerSkills, age),
                calculateWage(playerSkills),
                age,
                nationalities[Math.floor(Math.random() * nationalities.length)]
            )
        );
    }

    for (let i = 0; i < formation.fwd; i++) {
        let playerSkills = generateSkills(skills.xi[0], skills.xi[1]);
        let age = Math.floor(Math.random() * 18) + 18;
        team.addPlayer(
            new Player(
                `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`,
                'Forward',
                playerSkills,
                calculateValue(playerSkills, age),
                calculateWage(playerSkills),
                age,
                nationalities[Math.floor(Math.random() * nationalities.length)]
            )
        );
    }

    team.addPlayer(
        new Player(
            `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`,
            'Goalkeeper',
            generateSkills(skills.sub[0], skills.sub[1]),
            0,
            0,
            Math.floor(Math.random() * 18) + 18,
            nationalities[Math.floor(Math.random() * nationalities.length)]
        )
    );
    team.players[team.players.length - 1].value = calculateValue(
        team.players[team.players.length - 1].skills,
        team.players[team.players.length - 1].age
    );
    team.players[team.players.length - 1].wage = calculateWage(
        team.players[team.players.length - 1].skills
    );

    for (let i = 0; i < 2; i++) {
        let playerSkills = generateSkills(skills.sub[0], skills.sub[1]);
        let age = Math.floor(Math.random() * 18) + 18;
        team.addPlayer(
            new Player(
                `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`,
                'Defender',
                playerSkills,
                calculateValue(playerSkills, age),
                calculateWage(playerSkills),
                age,
                nationalities[Math.floor(Math.random() * nationalities.length)]
            )
        );
    }

    team.addPlayer(
        new Player(
            `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`,
            'Midfielder',
            generateSkills(skills.sub[0], skills.sub[1]),
            0,
            0,
            Math.floor(Math.random() * 18) + 18,
            nationalities[Math.floor(Math.random() * nationalities.length)]
        )
    );
    team.players[team.players.length - 1].value = calculateValue(
        team.players[team.players.length - 1].skills,
        team.players[team.players.length - 1].age
    );
    team.players[team.players.length - 1].wage = calculateWage(
        team.players[team.players.length - 1].skills
    );

    team.addPlayer(
        new Player(
            `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`,
            'Forward',
            generateSkills(skills.sub[0], skills.sub[1]),
            0,
            0,
            Math.floor(Math.random() * 18) + 18,
            nationalities[Math.floor(Math.random() * nationalities.length)]
        )
    );
    team.players[team.players.length - 1].value = calculateValue(
        team.players[team.players.length - 1].skills,
        team.players[team.players.length - 1].age
    );
    team.players[team.players.length - 1].wage = calculateWage(
        team.players[team.players.length - 1].skills
    );

    for (let i = 0; i < 3; i++) {
        let randomPosition = [
            'Goalkeeper',
            'Defender',
            'Midfielder',
            'Forward',
        ][Math.floor(Math.random() * 4)];
        let playerSkills = generateSkills(skills.res[0], skills.res[1]);
        let age = Math.floor(Math.random() * 18) + 18;
        team.addPlayer(
            new Player(
                `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`,
                randomPosition,
                playerSkills,
                calculateValue(playerSkills, age),
                calculateWage(playerSkills),
                age,
                nationalities[Math.floor(Math.random() * nationalities.length)]
            )
        );
    }

    return team;
}

function generateTransferList() {
    transferList = [];
    const positions = ['Goalkeeper', 'Defender', 'Midfielder', 'Forward'];
    for (let i = 0; i < 10; i++) {
        let skills = generateSkills(40, 100);
        let position = positions[Math.floor(Math.random() * positions.length)];
        let age = Math.floor(Math.random() * 18) + 18;
        transferList.push(
            new Player(
                `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`,
                position,
                skills,
                calculateValue(skills, age),
                calculateWage(skills),
                age,
                nationalities[Math.floor(Math.random() * nationalities.length)]
            )
        );
    }
}

function generateYouthPlayer(position) {
    let skills = generateSkills(50, 80);
    let age = 18;
    return new Player(
        `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`,
        position,
        skills,
        calculateValue(skills, age),
        calculateWage(skills),
        age,
        nationalities[Math.floor(Math.random() * nationalities.length)]
    );
}

function simulatePlayoff(teams) {
    let semi1 = new Match(teams[0], teams[3]).simulate();
    let semi2 = new Match(teams[1], teams[2]).simulate();
    let winner1 = semi1.homeScore > semi1.awayScore ? teams[0] : teams[3];
    let winner2 = semi2.homeScore > semi2.awayScore ? teams[1] : teams[2];
    let final = new Match(winner1, winner2).simulate();
    return final.homeScore > final.awayScore ? winner1 : winner2;
}
