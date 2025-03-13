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

function generateTeam(teamObject, league) {
    const formation = formations[Math.floor(Math.random() * formations.length)];

    // TODO: Not happy about this
    const popularity =
        league === 'eng-prem'
            ? Math.floor(Math.random() * 31) + 70
            : league === 'eng-champ'
              ? Math.floor(Math.random() * 41) + 40
              : league === 'eng-l1'
                ? Math.floor(Math.random() * 41) + 30
                : Math.floor(Math.random() * 41) + 20;

    const budgetRange = budgetRanges.find((x) => x.league === league);
    const budget =
        Math.floor(
            Math.random() * (budgetRange.range[1] - budgetRange.range[0] + 1)
        ) + budgetRange.range[0];

    let team = new Team({
        id: teamObject.id,
        name: teamObject.name,
        formation: formation.name,
        league,
        stadium: teamObject.stadium,
        popularity: popularity,
        budget,
    });
    const skills = skillRanges.find((x) => x.league === league);

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
    let semi1 = new Match().simulate({ home: teams[0], away: teams[3] });
    let semi2 = new Match().simulate({ home: teams[1], away: teams[2] });
    let winner1 = semi1.homeScore > semi1.awayScore ? teams[0] : teams[3];
    let winner2 = semi2.homeScore > semi2.awayScore ? teams[1] : teams[2];
    let final = new Match().simulate({ home: winner1, away: winner2 });
    return final.homeScore > final.awayScore ? winner1 : winner2;
}
