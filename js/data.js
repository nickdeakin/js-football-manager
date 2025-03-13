const defaultTeams = {
    premier: [
        {
            name: 'AFC Bournemouth',
            stadium: { name: 'Dean Court', capacity: 11307 },
        },
        {
            name: 'Arsenal',
            stadium: { name: 'Emirates Stadium', capacity: 60704 },
        },
        {
            name: 'Aston Villa',
            stadium: { name: 'Villa Park', capacity: 42657 },
        },
        {
            name: 'Brentford',
            stadium: { name: 'Brentford Community Stadium', capacity: 17250 },
        },
        {
            name: 'Brighton & Hove Albion',
            stadium: { name: 'Falmer Stadium', capacity: 31876 },
        },
        {
            name: 'Chelsea',
            stadium: { name: 'Stamford Bridge', capacity: 40173 },
        },
        {
            name: 'Crystal Palace',
            stadium: { name: 'Selhurst Park', capacity: 25486 },
        },
        {
            name: 'Everton',
            stadium: { name: 'Goodison Park', capacity: 39572 },
        },
        {
            name: 'Fulham',
            stadium: { name: 'Craven Cottage', capacity: 28800 },
        },
        {
            name: 'Ipswich Town',
            stadium: { name: 'Portman Road', capacity: 30056 },
        },
        {
            name: 'Leicester City',
            stadium: { name: 'King Power Stadium', capacity: 32259 },
        },
        { name: 'Liverpool', stadium: { name: 'Anfield', capacity: 61276 } },
        {
            name: 'Manchester City',
            stadium: { name: 'City of Manchester Stadium', capacity: 53400 },
        },
        {
            name: 'Manchester United',
            stadium: { name: 'Old Trafford', capacity: 74310 },
        },
        {
            name: 'Newcastle United',
            stadium: { name: "St James' Park", capacity: 52305 },
        },
        {
            name: 'Nottingham Forest',
            stadium: { name: 'City Ground', capacity: 30455 },
        },
        {
            name: 'Southampton',
            stadium: { name: "St Mary's Stadium", capacity: 32384 },
        },
        {
            name: 'Tottenham Hotspur',
            stadium: { name: 'Tottenham Hotspur Stadium', capacity: 62850 },
        },
        {
            name: 'West Ham United',
            stadium: { name: 'London Stadium', capacity: 62500 },
        },
        {
            name: 'Wolverhampton Wanderers',
            stadium: { name: 'Molineux Stadium', capacity: 31750 },
        },
    ],
    championship: [
        {
            name: 'Blackburn Rovers',
            stadium: { name: 'Ewood Park', capacity: 31367 },
        },
        {
            name: 'Bristol City',
            stadium: { name: 'Ashton Gate Stadium', capacity: 27000 },
        },
        { name: 'Burnley', stadium: { name: 'Turf Moor', capacity: 21944 } },
        {
            name: 'Cardiff City',
            stadium: { name: 'Cardiff City Stadium', capacity: 33280 },
        },
        {
            name: 'Coventry City',
            stadium: {
                name: 'Coventry Building Society Arena',
                capacity: 32609,
            },
        },
        {
            name: 'Derby County',
            stadium: { name: 'Pride Park Stadium', capacity: 32956 },
        },
        {
            name: 'Hull City',
            stadium: { name: 'MKM Stadium', capacity: 25586 },
        },
        {
            name: 'Leeds United',
            stadium: { name: 'Elland Road', capacity: 37608 },
        },
        {
            name: 'Luton Town',
            stadium: { name: 'Kenilworth Road', capacity: 12000 },
        },
        {
            name: 'Middlesbrough',
            stadium: { name: 'Riverside Stadium', capacity: 34742 },
        },
        { name: 'Millwall', stadium: { name: 'The Den', capacity: 20146 } },
        {
            name: 'Norwich City',
            stadium: { name: 'Carrow Road', capacity: 27359 },
        },
        {
            name: 'Oxford United',
            stadium: { name: 'Kassam Stadium', capacity: 12500 },
        },
        {
            name: 'Plymouth Argyle',
            stadium: { name: 'Home Park', capacity: 17900 },
        },
        {
            name: 'Portsmouth',
            stadium: { name: 'Fratton Park', capacity: 20899 },
        },
        {
            name: 'Preston North End',
            stadium: { name: 'Deepdale', capacity: 23404 },
        },
        {
            name: 'Queens Park Rangers',
            stadium: { name: 'Loftus Road', capacity: 18439 },
        },
        {
            name: 'Sheffield United',
            stadium: { name: 'Bramall Lane', capacity: 32050 },
        },
        {
            name: 'Sheffield Wednesday',
            stadium: { name: 'Hillsborough Stadium', capacity: 39732 },
        },
        {
            name: 'Stoke City',
            stadium: { name: 'bet365 Stadium', capacity: 30089 },
        },
        {
            name: 'Sunderland',
            stadium: { name: 'Stadium of Light', capacity: 48707 },
        },
        {
            name: 'Swansea City',
            stadium: { name: 'Swansea.com Stadium', capacity: 21088 },
        },
        {
            name: 'Watford',
            stadium: { name: 'Vicarage Road', capacity: 22200 },
        },
        {
            name: 'West Bromwich Albion',
            stadium: { name: 'The Hawthorns', capacity: 26850 },
        },
    ],
    league1: [
        { name: 'Barnsley', stadium: { name: 'Oakwell', capacity: 23287 } },
        {
            name: 'Birmingham City',
            stadium: { name: "St Andrew's", capacity: 29409 },
        },
        {
            name: 'Blackpool',
            stadium: { name: 'Bloomfield Road', capacity: 16616 },
        },
        {
            name: 'Bolton Wanderers',
            stadium: { name: 'Toughsheet Community Stadium', capacity: 28723 },
        },
        {
            name: 'Bristol Rovers',
            stadium: { name: 'Memorial Stadium', capacity: 12534 },
        },
        {
            name: 'Burton Albion',
            stadium: { name: 'Pirelli Stadium', capacity: 6912 },
        },
        {
            name: 'Cambridge United',
            stadium: { name: 'Abbey Stadium', capacity: 8127 },
        },
        {
            name: 'Charlton Athletic',
            stadium: { name: 'The Valley', capacity: 27111 },
        },
        {
            name: 'Crawley Town',
            stadium: { name: 'Broadfield Stadium', capacity: 5996 },
        },
        {
            name: 'Exeter City',
            stadium: { name: 'St. James Park', capacity: 8720 },
        },
        {
            name: 'Huddersfield Town',
            stadium: { name: 'Kirklees Stadium', capacity: 24121 },
        },
        {
            name: 'Leyton Orient',
            stadium: { name: 'Brisbane Road', capacity: 9271 },
        },
        {
            name: 'Lincoln City',
            stadium: { name: 'Sincil Bank', capacity: 10669 },
        },
        {
            name: 'Mansfield Town',
            stadium: { name: 'Field Mill', capacity: 9186 },
        },
        {
            name: 'Northampton Town',
            stadium: { name: 'Sixfields Stadium', capacity: 8200 },
        },
        {
            name: 'Peterborough United',
            stadium: { name: 'London Road Stadium', capacity: 13511 },
        },
        {
            name: 'Reading',
            stadium: { name: 'Madejski Stadium', capacity: 24161 },
        },
        {
            name: 'Rotherham United',
            stadium: { name: 'New York Stadium', capacity: 12021 },
        },
        {
            name: 'Shrewsbury Town',
            stadium: { name: 'New Meadow', capacity: 9875 },
        },
        {
            name: 'Stevenage',
            stadium: { name: 'Broadhall Way', capacity: 7800 },
        },
        {
            name: 'Stockport County',
            stadium: { name: 'Edgeley Park', capacity: 10852 },
        },
        {
            name: 'Wigan Athletic',
            stadium: { name: 'Brick Community Stadium', capacity: 25138 },
        },
        {
            name: 'Wrexham',
            stadium: { name: 'Racecourse Ground', capacity: 13341 },
        },
        {
            name: 'Wycombe Wanderers',
            stadium: { name: 'Adams Park', capacity: 10137 },
        },
    ],
    league2: [
        {
            name: 'Accrington Stanley',
            stadium: { name: 'Crown Ground', capacity: 5450 },
        },
        {
            name: 'AFC Wimbledon',
            stadium: { name: 'Plough Lane', capacity: 9369 },
        },
        { name: 'Barrow', stadium: { name: 'Holker Street', capacity: 6500 } },
        {
            name: 'Bradford City',
            stadium: { name: 'Valley Parade', capacity: 24840 },
        },
        { name: 'Bromley', stadium: { name: 'Hayes Lane', capacity: 5300 } },
        {
            name: 'Carlisle United',
            stadium: { name: 'Brunton Park', capacity: 17949 },
        },
        {
            name: 'Cheltenham Town',
            stadium: { name: 'Whaddon Road', capacity: 7066 },
        },
        {
            name: 'Chesterfield',
            stadium: { name: 'SMH Group Stadium', capacity: 10504 },
        },
        {
            name: 'Colchester United',
            stadium: { name: 'Colchester Community Stadium', capacity: 10105 },
        },
        {
            name: 'Crewe Alexander',
            stadium: { name: 'Gresty Road', capacity: 10153 },
        },
        {
            name: 'Doncaster Rovers',
            stadium: { name: 'Eco-Power Stadium', capacity: 15231 },
        },
        {
            name: 'Fleetwood Town',
            stadium: { name: 'Highbury Stadium', capacity: 5327 },
        },
        {
            name: 'Gillingham',
            stadium: { name: 'Priestfield Stadium', capacity: 11582 },
        },
        {
            name: 'Grimsby Town',
            stadium: { name: 'Blundell Park', capacity: 9052 },
        },
        {
            name: 'Harrogate Town',
            stadium: { name: 'Wetherby Road', capacity: 5000 },
        },
        {
            name: 'Milton Keynes Dons',
            stadium: { name: 'Stadium MK', capacity: 30500 },
        },
        {
            name: 'Morecambe',
            stadium: { name: 'Mazuma Mobile Stadium', capacity: 6476 },
        },
        {
            name: 'Newport County',
            stadium: { name: 'Rodney Parade', capacity: 7850 },
        },
        {
            name: 'Notts County',
            stadium: { name: 'Meadow Lane', capacity: 19841 },
        },
        { name: 'Port Vale', stadium: { name: 'Vale Park', capacity: 15036 } },
        {
            name: 'Salford City',
            stadium: { name: 'Moor Lane', capacity: 5108 },
        },
        {
            name: 'Swindon Town',
            stadium: { name: 'County Ground', capacity: 15728 },
        },
        {
            name: 'Tranmere Rovers',
            stadium: { name: 'Prenton Park', capacity: 16789 },
        },
        {
            name: 'Walsall',
            stadium: { name: 'Bescot Stadium', capacity: 11300 },
        },
    ],
};

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
