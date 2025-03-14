const defaultLeagues = [
    {
        id: 'eng-prem',
        name: 'Premier League',
        country: 'England',
        tier: 1,
        size: 20,
        win: {
            champions: [1],
            championsLeague: [2, 3, 4],
            europaLeague: [5, 6],
        },
        promotion: null,
        relegation: { automatic: [18, 19, 20], playoff: [], id: 'eng-champ' },
        prizeMoney: [
            50, 45, 40, 35, 30, 28, 26, 24, 22, 20, 18, 16, 14, 12, 10, 9, 8, 7,
            6, 5,
        ],
    },
    {
        id: 'eng-champ',
        name: 'EFL Championship',
        country: 'England',
        tier: 2,
        size: 24,
        promotion: { automatic: [1, 2], playoff: [3, 4, 5, 6], id: 'eng-prem' },
        relegation: { automatic: [22, 23, 24], playoff: [], id: 'eng-l1' },
        prizeMoney: [
            20, 18, 16, 14, 12, 10, 9, 8, 7, 6, 5, 4, 3, 2.5, 2, 1.9, 1.8, 1.7,
            1.6, 1.5, 1.4, 1.3, 1.2, 1.1,
        ],
    },
    {
        id: 'eng-l1',
        name: 'EFL League One',
        country: 'England',
        tier: 3,
        size: 24,
        promotion: {
            automatic: [1, 2],
            playoff: [3, 4, 5, 6],
            id: 'eng-champ',
        },
        relegation: { automatic: [21, 22, 23, 24], playoff: [], id: 'eng-l2' },
        prizeMoney: [
            10, 9, 8, 7, 6, 5, 4.5, 4, 3.5, 3, 2.5, 2, 1.8, 1.6, 1.5, 1.4, 1.3,
            1.2, 1.1, 1, 1, 1, 1, 1,
        ],
    },
    {
        id: 'eng-l2',
        name: 'EFL League Two',
        country: 'England',
        tier: 4,
        size: 24,
        promotion: {
            automatic: [1, 2, 3],
            playoff: [4, 5, 6, 7],
            id: 'eng-l1',
        },
        relegation: null,
        prizeMoney: [
            5, 4.5, 4, 3.5, 3, 2.5, 2, 1.8, 1.6, 1.4, 1.2, 1, 1, 1, 1, 1, 1, 1,
            1,
        ],
    },
];

const defaultTeams = [
    {
        id: 'eng-bournemouth',
        name: 'AFC Bournemouth',
        stadium: { name: 'Dean Court', capacity: 11307 },
        league: 'eng-prem',
    },
    {
        id: 'eng-arsenal',
        name: 'Arsenal',
        stadium: { name: 'Emirates Stadium', capacity: 60704 },
        league: 'eng-prem',
    },
    {
        id: 'eng-astonvilla',
        name: 'Aston Villa',
        stadium: { name: 'Villa Park', capacity: 42657 },
        league: 'eng-prem',
    },
    {
        id: 'eng-brentford',
        name: 'Brentford',
        stadium: { name: 'Brentford Community Stadium', capacity: 17250 },
        league: 'eng-prem',
    },
    {
        id: 'eng-brighton',
        name: 'Brighton & Hove Albion',
        stadium: { name: 'Falmer Stadium', capacity: 31876 },
        league: 'eng-prem',
    },
    {
        id: 'eng-chelsea',
        name: 'Chelsea',
        stadium: { name: 'Stamford Bridge', capacity: 40173 },
        league: 'eng-prem',
    },
    {
        id: 'eng-crystalpalace',
        name: 'Crystal Palace',
        stadium: { name: 'Selhurst Park', capacity: 25486 },
        league: 'eng-prem',
    },
    {
        id: 'eng-everton',
        name: 'Everton',
        stadium: { name: 'Goodison Park', capacity: 39572 },
        league: 'eng-prem',
    },
    {
        id: 'eng-fulham',
        name: 'Fulham',
        stadium: { name: 'Craven Cottage', capacity: 28800 },
        league: 'eng-prem',
    },
    {
        id: 'eng-ipswich',
        name: 'Ipswich Town',
        stadium: { name: 'Portman Road', capacity: 30056 },
        league: 'eng-prem',
    },
    {
        id: 'eng-leicester',
        name: 'Leicester City',
        stadium: { name: 'King Power Stadium', capacity: 32259 },
        league: 'eng-prem',
    },
    {
        id: 'eng-liverpool',
        name: 'Liverpool',
        stadium: { name: 'Anfield', capacity: 61276 },
        league: 'eng-prem',
    },
    {
        id: 'eng-manchestercity',
        name: 'Manchester City',
        stadium: { name: 'City of Manchester Stadium', capacity: 53400 },
        league: 'eng-prem',
    },
    {
        id: 'eng-manchesterunited',
        name: 'Manchester United',
        stadium: { name: 'Old Trafford', capacity: 74310 },
        league: 'eng-prem',
    },
    {
        id: 'eng-newcastle',
        name: 'Newcastle United',
        stadium: { name: "St James' Park", capacity: 52305 },
        league: 'eng-prem',
    },
    {
        id: 'eng-nottinghamforest',
        name: 'Nottingham Forest',
        stadium: { name: 'City Ground', capacity: 30455 },
        league: 'eng-prem',
    },
    {
        id: 'eng-southampton',
        name: 'Southampton',
        stadium: { name: "St Mary's Stadium", capacity: 32384 },
        league: 'eng-prem',
    },
    {
        id: 'eng-spurs',
        name: 'Tottenham Hotspur',
        stadium: { name: 'Tottenham Hotspur Stadium', capacity: 62850 },
        league: 'eng-prem',
    },
    {
        id: 'eng-westham',
        name: 'West Ham United',
        stadium: { name: 'London Stadium', capacity: 62500 },
        league: 'eng-prem',
    },
    {
        id: 'eng-wolves',
        name: 'Wolverhampton Wanderers',
        stadium: { name: 'Molineux Stadium', capacity: 31750 },
        league: 'eng-prem',
    },
    {
        id: 'eng-blackburn',
        name: 'Blackburn Rovers',
        stadium: { name: 'Ewood Park', capacity: 31367 },
        league: 'eng-champ',
    },
    {
        id: 'eng-bristolcity',
        name: 'Bristol City',
        stadium: { name: 'Ashton Gate Stadium', capacity: 27000 },
        league: 'eng-champ',
    },
    {
        id: 'eng-burnley',
        name: 'Burnley',
        stadium: { name: 'Turf Moor', capacity: 21944 },
        league: 'eng-champ',
    },
    {
        id: 'eng-cardiff',
        name: 'Cardiff City',
        stadium: { name: 'Cardiff City Stadium', capacity: 33280 },
        league: 'eng-champ',
    },
    {
        id: 'eng-coventry',
        name: 'Coventry City',
        stadium: {
            name: 'Coventry Building Society Arena',
            capacity: 32609,
        },
        league: 'eng-champ',
    },
    {
        id: 'eng-derby',
        name: 'Derby County',
        stadium: { name: 'Pride Park Stadium', capacity: 32956 },
        league: 'eng-champ',
    },
    {
        id: 'eng-hull',
        name: 'Hull City',
        stadium: { name: 'MKM Stadium', capacity: 25586 },
        league: 'eng-champ',
    },
    {
        id: 'eng-leeds',
        name: 'Leeds United',
        stadium: { name: 'Elland Road', capacity: 37608 },
        league: 'eng-champ',
    },
    {
        id: 'eng-luton',
        name: 'Luton Town',
        stadium: { name: 'Kenilworth Road', capacity: 12000 },
        league: 'eng-champ',
    },
    {
        id: 'eng-middlesbrough',
        name: 'Middlesbrough',
        stadium: { name: 'Riverside Stadium', capacity: 34742 },
        league: 'eng-champ',
    },
    {
        id: 'eng-millwall',
        name: 'Millwall',
        stadium: { name: 'The Den', capacity: 20146 },
        league: 'eng-champ',
    },
    {
        id: 'eng-Norwich',
        name: 'Norwich City',
        stadium: { name: 'Carrow Road', capacity: 27359 },
        league: 'eng-champ',
    },
    {
        id: 'eng-oxfordunited',
        name: 'Oxford United',
        stadium: { name: 'Kassam Stadium', capacity: 12500 },
        league: 'eng-champ',
    },
    {
        id: 'eng-plymouth',
        name: 'Plymouth Argyle',
        stadium: { name: 'Home Park', capacity: 17900 },
        league: 'eng-champ',
    },
    {
        id: 'eng-portsmouth',
        name: 'Portsmouth',
        stadium: { name: 'Fratton Park', capacity: 20899 },
        league: 'eng-champ',
    },
    {
        id: 'eng-preston',
        name: 'Preston North End',
        stadium: { name: 'Deepdale', capacity: 23404 },
        league: 'eng-champ',
    },
    {
        id: 'eng-qpr',
        name: 'Queens Park Rangers',
        stadium: { name: 'Loftus Road', capacity: 18439 },
        league: 'eng-champ',
    },
    {
        id: 'eng-sheffieldunited',
        name: 'Sheffield United',
        stadium: { name: 'Bramall Lane', capacity: 32050 },
        league: 'eng-champ',
    },
    {
        id: 'eng-sheffieldwednesday',
        name: 'Sheffield Wednesday',
        stadium: { name: 'Hillsborough Stadium', capacity: 39732 },
        league: 'eng-champ',
    },
    {
        id: 'eng-stoke',
        name: 'Stoke City',
        stadium: { name: 'bet365 Stadium', capacity: 30089 },
        league: 'eng-champ',
    },
    {
        id: 'eng-sunderland',
        name: 'Sunderland',
        stadium: { name: 'Stadium of Light', capacity: 48707 },
        league: 'eng-champ',
    },
    {
        id: 'eng-swansea',
        name: 'Swansea City',
        stadium: { name: 'Swansea.com Stadium', capacity: 21088 },
        league: 'eng-champ',
    },
    {
        id: 'eng-watford',
        name: 'Watford',
        stadium: { name: 'Vicarage Road', capacity: 22200 },
        league: 'eng-champ',
    },
    {
        id: 'eng-wba',
        name: 'West Bromwich Albion',
        stadium: { name: 'The Hawthorns', capacity: 26850 },
        league: 'eng-champ',
    },
    {
        id: 'eng-barnsley',
        name: 'Barnsley',
        stadium: { name: 'Oakwell', capacity: 23287 },
        league: 'eng-l1',
    },
    {
        id: 'eng-birmingham',
        name: 'Birmingham City',
        stadium: { name: "St Andrew's", capacity: 29409 },
        league: 'eng-l1',
    },
    {
        id: 'eng-blackpool',
        name: 'Blackpool',
        stadium: { name: 'Bloomfield Road', capacity: 16616 },
        league: 'eng-l1',
    },
    {
        id: 'eng-bolton',
        name: 'Bolton Wanderers',
        stadium: { name: 'Toughsheet Community Stadium', capacity: 28723 },
        league: 'eng-l1',
    },
    {
        id: 'eng-bristolrovers',
        name: 'Bristol Rovers',
        stadium: { name: 'Memorial Stadium', capacity: 12534 },
        league: 'eng-l1',
    },
    {
        id: 'eng-burton',
        name: 'Burton Albion',
        stadium: { name: 'Pirelli Stadium', capacity: 6912 },
        league: 'eng-l1',
    },
    {
        id: 'eng-cambridge',
        name: 'Cambridge United',
        stadium: { name: 'Abbey Stadium', capacity: 8127 },
        league: 'eng-l1',
    },
    {
        id: 'eng-charlton',
        name: 'Charlton Athletic',
        stadium: { name: 'The Valley', capacity: 27111 },
        league: 'eng-l1',
    },
    {
        id: 'eng-crawley',
        name: 'Crawley Town',
        stadium: { name: 'Broadfield Stadium', capacity: 5996 },
        league: 'eng-l1',
    },
    {
        id: 'eng-exeter',
        name: 'Exeter City',
        stadium: { name: 'St. James Park', capacity: 8720 },
        league: 'eng-l1',
    },
    {
        id: 'eng-huddersfield',
        name: 'Huddersfield Town',
        stadium: { name: 'Kirklees Stadium', capacity: 24121 },
        league: 'eng-l1',
    },
    {
        id: 'eng-leytonorient',
        name: 'Leyton Orient',
        stadium: { name: 'Brisbane Road', capacity: 9271 },
        league: 'eng-l1',
    },
    {
        id: 'eng-lincoln',
        name: 'Lincoln City',
        stadium: { name: 'Sincil Bank', capacity: 10669 },
        league: 'eng-l1',
    },
    {
        id: 'eng-mansfield',
        name: 'Mansfield Town',
        stadium: { name: 'Field Mill', capacity: 9186 },
        league: 'eng-l1',
    },
    {
        id: 'eng-northampton',
        name: 'Northampton Town',
        stadium: { name: 'Sixfields Stadium', capacity: 8200 },
        league: 'eng-l1',
    },
    {
        id: 'eng-peterborough',
        name: 'Peterborough United',
        stadium: { name: 'London Road Stadium', capacity: 13511 },
        league: 'eng-l1',
    },
    {
        id: 'eng-reading',
        name: 'Reading',
        stadium: { name: 'Madejski Stadium', capacity: 24161 },
        league: 'eng-l1',
    },
    {
        id: 'eng-rotherham',
        name: 'Rotherham United',
        stadium: { name: 'New York Stadium', capacity: 12021 },
        league: 'eng-l1',
    },
    {
        id: 'eng-shrewsbury',
        name: 'Shrewsbury Town',
        stadium: { name: 'New Meadow', capacity: 9875 },
        league: 'eng-l1',
    },
    {
        id: 'eng-stevenage',
        name: 'Stevenage',
        stadium: { name: 'Broadhall Way', capacity: 7800 },
        league: 'eng-l1',
    },
    {
        id: 'eng-stockport',
        name: 'Stockport County',
        stadium: { name: 'Edgeley Park', capacity: 10852 },
        league: 'eng-l1',
    },
    {
        id: 'eng-wigan',
        name: 'Wigan Athletic',
        stadium: { name: 'Brick Community Stadium', capacity: 25138 },
        league: 'eng-l1',
    },
    {
        id: 'eng-wrexham',
        name: 'Wrexham',
        stadium: { name: 'Racecourse Ground', capacity: 13341 },
        league: 'eng-l1',
    },
    {
        id: 'eng-wycombe',
        name: 'Wycombe Wanderers',
        stadium: { name: 'Adams Park', capacity: 10137 },
        league: 'eng-l1',
    },
    {
        id: 'eng-accrington',
        name: 'Accrington Stanley',
        stadium: { name: 'Crown Ground', capacity: 5450 },
        league: 'eng-l2',
    },
    {
        id: 'eng-acfwimbledon',
        name: 'AFC Wimbledon',
        stadium: { name: 'Plough Lane', capacity: 9369 },
        league: 'eng-l2',
    },
    {
        id: 'eng-barrow',
        name: 'Barrow',
        stadium: { name: 'Holker Street', capacity: 6500 },
        league: 'eng-l2',
    },
    {
        id: 'eng-bradford',
        name: 'Bradford City',
        stadium: { name: 'Valley Parade', capacity: 24840 },
        league: 'eng-l2',
    },
    {
        id: 'eng-bromley',
        name: 'Bromley',
        stadium: { name: 'Hayes Lane', capacity: 5300 },
        league: 'eng-l2',
    },
    {
        id: 'eng-carlisle',
        name: 'Carlisle United',
        stadium: { name: 'Brunton Park', capacity: 17949 },
        league: 'eng-l2',
    },
    {
        id: 'eng-cheltenham',
        name: 'Cheltenham Town',
        stadium: { name: 'Whaddon Road', capacity: 7066 },
        league: 'eng-l2',
    },
    {
        id: 'eng-chesterfield',
        name: 'Chesterfield',
        stadium: { name: 'SMH Group Stadium', capacity: 10504 },
        league: 'eng-l2',
    },
    {
        id: 'eng-colchester',
        name: 'Colchester United',
        stadium: { name: 'Colchester Community Stadium', capacity: 10105 },
        league: 'eng-l2',
    },
    {
        id: 'eng-crewe',
        name: 'Crewe Alexander',
        stadium: { name: 'Gresty Road', capacity: 10153 },
        league: 'eng-l2',
    },
    {
        id: 'eng-doncaster',
        name: 'Doncaster Rovers',
        stadium: { name: 'Eco-Power Stadium', capacity: 15231 },
        league: 'eng-l2',
    },
    {
        id: 'eng-fleetwood',
        name: 'Fleetwood Town',
        stadium: { name: 'Highbury Stadium', capacity: 5327 },
        league: 'eng-l2',
    },
    {
        id: 'eng-gillingham',
        name: 'Gillingham',
        stadium: { name: 'Priestfield Stadium', capacity: 11582 },
        league: 'eng-l2',
    },
    {
        id: 'eng-grimsby',
        name: 'Grimsby Town',
        stadium: { name: 'Blundell Park', capacity: 9052 },
        league: 'eng-l2',
    },
    {
        id: 'eng-harrogate',
        name: 'Harrogate Town',
        stadium: { name: 'Wetherby Road', capacity: 5000 },
        league: 'eng-l2',
    },
    {
        id: 'eng-mkdons',
        name: 'Milton Keynes Dons',
        stadium: { name: 'Stadium MK', capacity: 30500 },
        league: 'eng-l2',
    },
    {
        id: 'eng-morecambe',
        name: 'Morecambe',
        stadium: { name: 'Mazuma Mobile Stadium', capacity: 6476 },
        league: 'eng-l2',
    },
    {
        id: 'eng-newport',
        name: 'Newport County',
        stadium: { name: 'Rodney Parade', capacity: 7850 },
        league: 'eng-l2',
    },
    {
        id: 'eng-nottscounty',
        name: 'Notts County',
        stadium: { name: 'Meadow Lane', capacity: 19841 },
        league: 'eng-l2',
    },
    {
        id: 'eng-portvale',
        name: 'Port Vale',
        stadium: { name: 'Vale Park', capacity: 15036 },
        league: 'eng-l2',
    },
    {
        id: 'eng-salford',
        name: 'Salford City',
        stadium: { name: 'Moor Lane', capacity: 5108 },
        league: 'eng-l2',
    },
    {
        id: 'eng-swindon',
        name: 'Swindon Town',
        stadium: { name: 'County Ground', capacity: 15728 },
        league: 'eng-l2',
    },
    {
        id: 'eng-tranmere',
        name: 'Tranmere Rovers',
        stadium: { name: 'Prenton Park', capacity: 16789 },
        league: 'eng-l2',
    },
    {
        id: 'eng-walsall',
        name: 'Walsall',
        stadium: { name: 'Bescot Stadium', capacity: 11300 },
        league: 'eng-l2',
    },
];

const firstNames = [
    'Alex',
    'Ben',
    'Chris',
    'Dave',
    'Evan',
    'Frank',
    'Gino',
    'Hank',
    'Ivan',
    'Jack',
    'Kevin',
    'Leo',
    'Miles',
    'Ned',
    'Nick',
    'Oli',
    'Patrick',
    'Quinn',
    'Ron',
    'Sam',
    'Trevor',
    'Stan',
    'Vince',
    'Wes',
    'Xander',
    'Zack',
    'Zane',
];

const lastNames = [
    'Smith',
    'Johnson',
    'Brown',
    'Deakin',
    'Taylor',
    'Wilson',
    'Davis',
    'Clark',
    'Lewis',
    'Walker',
    'Hall',
    'Young',
    'King',
    'Wright',
    'Hill',
    'Scott',
    'Green',
];

const positions = ['Goalkeeper', 'Defender', 'Midfielder', 'Forward'];

const nationalities = [
    'England',
    'Spain',
    'Germany',
    'France',
    'Italy',
    'Brazil',
    'Argentina',
    'Portugal',
    'Netherlands',
    'Belgium',
    'Scotland',
    'Wales',
    'Ireland',
    'Sweden',
    'Norway',
];

const formations = [
    { name: '4-4-2', gk: 1, def: 4, mid: 4, fwd: 2 },
    { name: '4-3-3', gk: 1, def: 4, mid: 3, fwd: 3 },
    { name: '3-5-2', gk: 1, def: 3, mid: 5, fwd: 2 },
    { name: '4-2-3-1', gk: 1, def: 4, mid: 5, fwd: 1 },
];

const budgetRanges = [
    { league: 'eng-prem', range: [50, 250] }, // Premier League
    { league: 'eng-champ', range: [10, 100] }, // Championship
    { league: 'eng-l1', range: [5, 25] }, // League One
    { league: 'eng-l2', range: [0, 10] }, // League Two
];

const skillRanges = [
    { league: 'eng-prem', xi: [70, 100], sub: [60, 90], res: [50, 80] }, // Premier League
    { league: 'eng-champ', xi: [60, 90], sub: [50, 80], res: [40, 70] }, // Championship
    { league: 'eng-l1', xi: [50, 80], sub: [40, 70], res: [30, 60] }, // League One
    { league: 'eng-l2', xi: [40, 70], sub: [30, 60], res: [20, 50] }, // League Two
];
