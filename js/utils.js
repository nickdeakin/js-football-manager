const calculateValue = (skills, age) => {
    let avgSkill = Object.values(skills).reduce((sum, val) => sum + val, 0) / 6;
    let baseValue = (avgSkill - 40) * 0.5;
    let ageMultiplier =
        age < 25
            ? 0.5 + (age - 18) * 0.0714
            : age <= 30
              ? 1.0
              : 1.0 - (age - 30) * 0.0714;
    return Math.max(baseValue * ageMultiplier, 0).toFixed(1);
};

const calculateWage = (skills) => {
    let avgSkill = Object.values(skills).reduce((sum, val) => sum + val, 0) / 6;
    return Math.floor((avgSkill - 40) * 2);
};

const generateSkills = (min, max) => {
    return {
        passing: Math.floor(Math.random() * (max - min + 1)) + min,
        tackling: Math.floor(Math.random() * (max - min + 1)) + min,
        pace: Math.floor(Math.random() * (max - min + 1)) + min,
        heading: Math.floor(Math.random() * (max - min + 1)) + min,
        stamina: Math.floor(Math.random() * (max - min + 1)) + min,
        shooting: Math.floor(Math.random() * (max - min + 1)) + min,
    };
};

const generateTeam = (teamObject, league) => {
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
    const skillsRange = skillRanges.find((x) => x.league === league);

    team.addPlayer(
        generatePlayer({ position: 'Goalkeeper', skillsRange, team: team.id })
    );

    for (let i = 0; i < formation.def; i++) {
        team.addPlayer(
            generatePlayer({ position: 'Defender', skillsRange, team: team.id })
        );
    }

    for (let i = 0; i < formation.mid; i++) {
        team.addPlayer(
            generatePlayer({
                position: 'Midfielder',
                skillsRange,
                team: team.id,
            })
        );
    }

    for (let i = 0; i < formation.fwd; i++) {
        team.addPlayer(
            generatePlayer({ position: 'Forward', skillsRange, team: team.id })
        );
    }

    team.addPlayer(
        generatePlayer({ position: 'Goalkeeper', skillsRange, team: team.id })
    );

    for (let i = 0; i < 2; i++) {
        team.addPlayer(
            generatePlayer({ position: 'Defender', skillsRange, team: team.id })
        );
    }

    team.addPlayer(
        generatePlayer({ position: 'Midfielder', skillsRange, team: team.id })
    );

    team.addPlayer(
        generatePlayer({ position: 'Forward', skillsRange, team: team.id })
    );

    for (let i = 0; i < 3; i++) {
        team.addPlayer(generatePlayer({ skillsRange, team: team.id }));
    }

    return team;
};

const generateTransferList = () => {
    transferList.clear();
    for (let i = 0; i < 10; i++) {
        let skills = generateSkills(40, 100);
        const player = generatePlayer({ skills });
        transferList.set(player.id, player);
    }
};

const generateYouthPlayer = (position, teamId) => {
    let skills = generateSkills(50, 80);
    let age = 18;
    return generatePlayer({ skills, position, name, age, team: teamId });
};

const generatePlayer = ({
    id,
    skills,
    skillsRange,
    position,
    name,
    age,
    nationality,
    team,
}) => {
    const _age = age ?? Math.floor(Math.random() * 18) + 18;
    let _skills =
        skills ?? generateSkills(skillsRange.sub[0], skillsRange.sub[1]);
    let _value = calculateValue(_skills, _age);
    let _wage = calculateWage(_skills);
    const player = new Player({
        id: id ?? generatePlayerId(),
        name:
            name ??
            `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`,
        position:
            position ?? positions[Math.floor(Math.random() * positions.length)],
        skills: _skills,
        value: _value,
        wage: _wage,
        age: _age,
        nationality:
            nationality ??
            nationalities[Math.floor(Math.random() * nationalities.length)],
        team,
    });

    players.set(player.id, player);

    return player;
};

const generatePlayerId = () => {
    let id;
    let circuitBreaker = 0;
    const limit = 10000;
    do {
        const randomId = Math.floor(Math.random() * 16777216);
        id = randomId.toString(16).padStart(6, '0');
        circuitBreaker++;
    } while (players.has(id) || circuitBreaker > limit);

    return id;
};

const simulatePlayoff = (teams) => {
    let semi1 = new Match().simulate({ home: teams[0], away: teams[3] });
    let semi2 = new Match().simulate({ home: teams[1], away: teams[2] });
    let winner1 = semi1.homeScore > semi1.awayScore ? teams[0] : teams[3];
    let winner2 = semi2.homeScore > semi2.awayScore ? teams[1] : teams[2];
    let final = new Match().simulate({ home: winner1, away: winner2 });
    return final.homeScore > final.awayScore ? winner1 : winner2;
};
