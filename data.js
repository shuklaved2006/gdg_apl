// CRICKET ANALYTICS PLATFORM - IPL 2026 EDITION DATABASE

// Past matches database (Real IPL 2026 Playoff Results)
const pastMatches = [
  {
    id: "past_1",
    teams: "RCB vs Gujarat Titans (Qualifier 1)",
    shortName: "RCB vs GT",
    date: "2026-05-26",
    venue: "Narendra Modi Stadium, Ahmedabad",
    format: "T20",
    score: "GT 182/6 (20.0) | RCB 185/4 (19.2)",
    result: "RCB won by 6 wickets",
    highlights: "Virat Kohli 78(49), Yash Dayal 3/28. RCB advanced directly to the Final."
  },
  {
    id: "past_2",
    teams: "Rajasthan Royals vs Sunrisers Hyderabad (Eliminator)",
    shortName: "RR vs SRH",
    date: "2026-05-27",
    venue: "M. Chinnaswamy Stadium, Bengaluru",
    format: "T20",
    score: "RR 172/8 (20.0) | SRH 175/3 (18.4)",
    result: "SRH won by 7 wickets",
    highlights: "Travis Head 64(38), Pat Cummins 2/24. RR eliminated from the tournament."
  },
  {
    id: "past_3",
    teams: "Gujarat Titans vs Sunrisers Hyderabad (Qualifier 2)",
    shortName: "GT vs SRH",
    date: "2026-05-29",
    venue: "Narendra Modi Stadium, Ahmedabad",
    format: "T20",
    score: "GT 201/4 (20.0) | SRH 165/9 (18.2)",
    result: "Gujarat Titans won by 36 runs",
    highlights: "Shubman Gill 104(55), Rashid Khan 3/19. GT qualified for the Final."
  }
];

// Upcoming matches database (Real India tour schedule for June 2026)
const upcomingMatches = [
  {
    id: "up_1",
    teams: "India vs Afghanistan (One-off Test)",
    shortName: "IND vs AFG",
    date: "2026-06-05",
    time: "09:30 IST",
    venue: "Mullanpur Stadium, Chandigarh",
    format: "Test Match",
    pitchReport: "Fresh red-soil pitch, expected to assist pacers on Days 1-2, spinner turf from Day 3."
  },
  {
    id: "up_2",
    teams: "India vs Afghanistan (1st ODI)",
    shortName: "IND vs AFG",
    date: "2026-06-12",
    time: "13:30 IST",
    venue: "MA Chidambaram Stadium, Chennai",
    format: "50-50",
    pitchReport: "Dry pitch, heavy spin-friendly conditions. Spinners will be the key fantasy picks."
  },
  {
    id: "up_3",
    teams: "Ireland vs India (1st T20I)",
    shortName: "IRE vs IND",
    date: "2026-06-26",
    time: "16:00 Local (20:30 IST)",
    venue: "Stormont Cricket Ground, Belfast",
    format: "T20",
    pitchReport: "Green surface, fast outfield, windy conditions helping swing bowlers."
  }
];

// Players database with real IPL 2026 franchises (RCB and GT focus)
const players = [
  {
    id: "virat_kohli",
    name: "Virat Kohli",
    team: "RCB",
    role: "Batsman",
    fantasyPrice: 10.5,
    fantasySafety: 9.9,
    fantasyForm: 9.8,
    img: "https://images.unsplash.com/photo-1531415080290-bc98545ab2ef?w=200&h=200&fit=crop",
    turfStats: {
      t20: {
        home: { avg: 56.4, strikeRate: 145.2, runs: 2850, matches: 78 },
        outside: { avg: 49.8, strikeRate: 138.6, runs: 2120, matches: 65 }
      },
      fifty: {
        home: { avg: 58.2, strikeRate: 95.4, runs: 4200, matches: 90 },
        outside: { avg: 54.1, strikeRate: 91.2, runs: 3950, matches: 85 }
      }
    },
    career10Year: {
      t20: [
        { year: 2017, runs: 450, wickets: 0, average: 45.0, strikeRate: 138.5, economy: 0 },
        { year: 2018, runs: 512, wickets: 0, average: 51.2, strikeRate: 142.1, economy: 0 },
        { year: 2019, runs: 488, wickets: 0, average: 48.8, strikeRate: 135.0, economy: 0 },
        { year: 2020, runs: 420, wickets: 0, average: 42.0, strikeRate: 132.5, economy: 0 },
        { year: 2021, runs: 480, wickets: 0, average: 48.0, strikeRate: 136.2, economy: 0 },
        { year: 2022, runs: 580, wickets: 0, average: 58.0, strikeRate: 140.0, economy: 0 },
        { year: 2023, runs: 620, wickets: 0, average: 62.0, strikeRate: 144.2, economy: 0 },
        { year: 2024, runs: 741, wickets: 0, average: 61.8, strikeRate: 154.7, economy: 0 },
        { year: 2025, runs: 680, wickets: 0, average: 56.6, strikeRate: 148.2, economy: 0 },
        { year: 2026, runs: 710, wickets: 0, average: 64.5, strikeRate: 152.0, economy: 0 }
      ],
      fifty: [
        { year: 2017, runs: 980, wickets: 0, average: 65.3, strikeRate: 92.5, economy: 0 },
        { year: 2018, runs: 1020, wickets: 0, average: 72.8, strikeRate: 98.1, economy: 0 },
        { year: 2019, runs: 890, wickets: 0, average: 59.3, strikeRate: 94.6, economy: 0 },
        { year: 2020, runs: 420, wickets: 0, average: 42.0, strikeRate: 88.5, economy: 0 },
        { year: 2021, runs: 510, wickets: 0, average: 51.0, strikeRate: 90.0, economy: 0 },
        { year: 2022, runs: 720, wickets: 0, average: 48.0, strikeRate: 91.2, economy: 0 },
        { year: 2023, runs: 1250, wickets: 0, average: 78.1, strikeRate: 96.5, economy: 0 },
        { year: 2024, runs: 810, wickets: 0, average: 57.8, strikeRate: 93.4, economy: 0 },
        { year: 2025, runs: 790, wickets: 0, average: 56.4, strikeRate: 92.1, economy: 0 },
        { year: 2026, runs: 850, wickets: 0, average: 60.7, strikeRate: 95.0, economy: 0 }
      ]
    }
  },
  {
    id: "shubman_gill",
    name: "Shubman Gill",
    team: "GT",
    role: "Batsman",
    fantasyPrice: 10.0,
    fantasySafety: 9.6,
    fantasyForm: 9.5,
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
    turfStats: {
      t20: {
        home: { avg: 48.5, strikeRate: 146.8, runs: 1890, matches: 45 },
        outside: { avg: 41.2, strikeRate: 137.4, runs: 1250, matches: 38 }
      },
      fifty: {
        home: { avg: 62.4, strikeRate: 99.2, runs: 2100, matches: 38 },
        outside: { avg: 53.8, strikeRate: 94.5, runs: 1650, matches: 32 }
      }
    },
    career10Year: {
      t20: [
        { year: 2017, runs: 80, wickets: 0, average: 20.0, strikeRate: 115.0, economy: 0 },
        { year: 2018, runs: 203, wickets: 0, average: 33.8, strikeRate: 146.0, economy: 0 },
        { year: 2019, runs: 296, wickets: 0, average: 32.8, strikeRate: 124.3, economy: 0 },
        { year: 2020, runs: 440, wickets: 0, average: 33.8, strikeRate: 117.9, economy: 0 },
        { year: 2021, runs: 478, wickets: 0, average: 29.8, strikeRate: 118.9, economy: 0 },
        { year: 2022, runs: 483, wickets: 0, average: 34.5, strikeRate: 132.3, economy: 0 },
        { year: 2023, runs: 890, wickets: 0, average: 59.3, strikeRate: 157.8, economy: 0 },
        { year: 2024, runs: 426, wickets: 0, average: 38.7, strikeRate: 147.4, economy: 0 },
        { year: 2025, runs: 580, wickets: 0, average: 48.3, strikeRate: 142.1, economy: 0 },
        { year: 2026, runs: 652, wickets: 0, average: 54.3, strikeRate: 149.5, economy: 0 }
      ],
      fifty: [
        { year: 2017, runs: 0, wickets: 0, average: 0, strikeRate: 0, economy: 0 },
        { year: 2018, runs: 0, wickets: 0, average: 0, strikeRate: 0, economy: 0 },
        { year: 2019, runs: 16, wickets: 0, average: 8.0, strikeRate: 50.0, economy: 0 },
        { year: 2020, runs: 49, wickets: 0, average: 24.5, strikeRate: 74.2, economy: 0 },
        { year: 2021, runs: 0, wickets: 0, average: 0, strikeRate: 0, economy: 0 },
        { year: 2022, runs: 638, wickets: 0, average: 70.8, strikeRate: 102.5, economy: 0 },
        { year: 2023, runs: 1584, wickets: 0, average: 63.3, strikeRate: 105.4, economy: 0 },
        { year: 2024, runs: 520, wickets: 0, average: 52.0, strikeRate: 98.4, economy: 0 },
        { year: 2025, runs: 610, wickets: 0, average: 55.4, strikeRate: 96.0, economy: 0 },
        { year: 2026, runs: 720, wickets: 0, average: 60.0, strikeRate: 99.2, economy: 0 }
      ]
    }
  },
  {
    id: "rashid_khan",
    name: "Rashid Khan",
    team: "GT",
    role: "All-Rounder",
    fantasyPrice: 9.5,
    fantasySafety: 9.7,
    fantasyForm: 9.6,
    img: "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=200&h=200&fit=crop",
    turfStats: {
      t20: {
        home: { avg: 22.8, strikeRate: 135.4, wickets: 110, matches: 84 },
        outside: { avg: 19.5, strikeRate: 126.8, wickets: 135, matches: 92 }
      },
      fifty: {
        home: { avg: 24.5, strikeRate: 92.4, wickets: 90, matches: 64 },
        outside: { avg: 22.1, strikeRate: 88.0, wickets: 105, matches: 72 }
      }
    },
    career10Year: {
      t20: [
        { year: 2017, runs: 95, wickets: 25, average: 14.2, strikeRate: 13.8, economy: 6.52 },
        { year: 2018, runs: 120, wickets: 32, average: 15.1, strikeRate: 14.1, economy: 6.64 },
        { year: 2019, runs: 85, wickets: 21, average: 18.0, strikeRate: 16.5, economy: 6.72 },
        { year: 2020, runs: 110, wickets: 20, average: 17.5, strikeRate: 15.2, economy: 6.30 },
        { year: 2021, runs: 140, wickets: 28, average: 16.2, strikeRate: 14.8, economy: 6.45 },
        { year: 2022, runs: 180, wickets: 24, average: 19.8, strikeRate: 18.2, economy: 6.60 },
        { year: 2023, runs: 210, wickets: 30, average: 15.4, strikeRate: 14.5, economy: 6.54 },
        { year: 2024, runs: 160, wickets: 25, average: 17.8, strikeRate: 15.9, economy: 6.80 },
        { year: 2025, runs: 185, wickets: 22, average: 18.2, strikeRate: 16.0, economy: 6.75 },
        { year: 2026, runs: 225, wickets: 28, average: 16.0, strikeRate: 14.2, economy: 6.62 }
      ],
      fifty: [
        { year: 2017, wickets: 28, runs: 180, average: 21.2, strikeRate: 28.5, economy: 4.21 },
        { year: 2018, wickets: 35, runs: 210, average: 19.5, strikeRate: 26.0, economy: 4.12 },
        { year: 2019, wickets: 24, runs: 150, average: 23.4, strikeRate: 30.2, economy: 4.45 },
        { year: 2020, wickets: 12, runs: 90, average: 26.8, strikeRate: 34.5, economy: 4.50 },
        { year: 2021, wickets: 18, runs: 115, average: 22.1, strikeRate: 29.8, economy: 4.28 },
        { year: 2022, wickets: 22, runs: 160, average: 24.0, strikeRate: 31.0, economy: 4.35 },
        { year: 2023, wickets: 38, runs: 280, average: 18.6, strikeRate: 24.2, economy: 4.18 },
        { year: 2024, wickets: 20, runs: 130, average: 25.1, strikeRate: 32.5, economy: 4.60 },
        { year: 2025, wickets: 25, runs: 170, average: 22.4, strikeRate: 29.0, economy: 4.42 },
        { year: 2026, wickets: 30, runs: 195, average: 20.8, strikeRate: 27.5, economy: 4.30 }
      ]
    }
  },
  {
    id: "glenn_maxwell",
    name: "Glenn Maxwell",
    team: "RCB",
    role: "All-Rounder",
    fantasyPrice: 9.0,
    fantasySafety: 8.4,
    fantasyForm: 8.8,
    img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop",
    turfStats: {
      t20: {
        home: { avg: 34.2, strikeRate: 156.4, wickets: 25, matches: 40 },
        outside: { avg: 29.5, strikeRate: 148.8, wickets: 28, matches: 38 }
      },
      fifty: {
        home: { avg: 36.8, strikeRate: 125.2, wickets: 35, matches: 56 },
        outside: { avg: 31.4, strikeRate: 118.5, wickets: 38, matches: 58 }
      }
    },
    career10Year: {
      t20: [
        { year: 2017, runs: 280, wickets: 8, average: 28.0, strikeRate: 151.0, economy: 8.12 },
        { year: 2018, runs: 350, wickets: 10, average: 35.0, strikeRate: 155.4, economy: 7.95 },
        { year: 2019, runs: 290, wickets: 9, average: 29.0, strikeRate: 148.0, economy: 8.00 },
        { year: 2020, runs: 180, wickets: 5, average: 22.5, strikeRate: 142.1, economy: 8.35 },
        { year: 2021, runs: 513, wickets: 6, average: 42.7, strikeRate: 144.1, economy: 8.10 },
        { year: 2022, runs: 301, wickets: 9, average: 27.4, strikeRate: 132.8, economy: 7.42 },
        { year: 2023, runs: 400, wickets: 12, average: 33.3, strikeRate: 166.7, economy: 7.82 },
        { year: 2024, runs: 220, wickets: 8, average: 18.3, strikeRate: 150.0, economy: 8.15 },
        { year: 2025, runs: 310, wickets: 10, average: 25.8, strikeRate: 148.5, economy: 7.90 },
        { year: 2026, runs: 340, wickets: 11, average: 28.3, strikeRate: 152.4, economy: 7.85 }
      ],
      fifty: [
        { year: 2017, runs: 380, wickets: 12, average: 31.7, strikeRate: 120.2, economy: 5.54 },
        { year: 2018, runs: 410, wickets: 15, average: 34.2, strikeRate: 122.8, economy: 5.48 },
        { year: 2019, runs: 450, wickets: 14, average: 37.5, strikeRate: 125.0, economy: 5.40 },
        { year: 2020, runs: 210, wickets: 6, average: 26.3, strikeRate: 118.2, economy: 5.75 },
        { year: 2021, runs: 280, wickets: 10, average: 31.1, strikeRate: 121.0, economy: 5.50 },
        { year: 2022, runs: 330, wickets: 13, average: 30.0, strikeRate: 123.5, economy: 5.42 },
        { year: 2023, runs: 610, wickets: 20, average: 50.8, strikeRate: 138.4, economy: 5.25 },
        { year: 2024, runs: 430, wickets: 12, average: 35.8, strikeRate: 128.0, economy: 5.46 },
        { year: 2025, runs: 390, wickets: 11, average: 32.5, strikeRate: 124.2, economy: 5.41 },
        { year: 2026, runs: 480, wickets: 15, average: 40.0, strikeRate: 132.8, economy: 5.38 }
      ]
    }
  },
  {
    id: "mohammed_shami",
    name: "Mohammed Shami",
    team: "GT",
    role: "Bowler",
    fantasyPrice: 9.5,
    fantasySafety: 9.3,
    fantasyForm: 9.2,
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
    turfStats: {
      t20: {
        home: { avg: 20.4, strikeRate: 16.2, wickets: 64, matches: 45 },
        outside: { avg: 23.5, strikeRate: 18.0, wickets: 58, matches: 42 }
      },
      fifty: {
        home: { avg: 23.8, strikeRate: 26.5, wickets: 115, matches: 68 },
        outside: { avg: 26.2, strikeRate: 28.8, wickets: 88, matches: 58 }
      }
    },
    career10Year: {
      t20: [
        { year: 2017, runs: 10, wickets: 15, average: 23.5, strikeRate: 18.2, economy: 7.82 },
        { year: 2018, runs: 12, wickets: 18, average: 21.0, strikeRate: 17.0, economy: 7.65 },
        { year: 2019, runs: 15, wickets: 22, average: 19.8, strikeRate: 16.2, economy: 7.50 },
        { year: 2020, runs: 8, wickets: 20, average: 16.5, strikeRate: 14.5, economy: 7.20 },
        { year: 2021, runs: 5, wickets: 19, average: 20.2, strikeRate: 16.8, economy: 7.68 },
        { year: 2022, runs: 20, wickets: 20, average: 24.4, strikeRate: 18.5, economy: 7.92 },
        { year: 2023, runs: 28, wickets: 28, average: 18.6, strikeRate: 15.0, economy: 7.46 },
        { year: 2024, runs: 0, wickets: 0, average: 0, strikeRate: 0, economy: 0 }, // Injured some part
        { year: 2025, runs: 18, wickets: 23, average: 20.5, strikeRate: 16.2, economy: 7.58 },
        { year: 2026, runs: 22, wickets: 25, average: 19.1, strikeRate: 15.5, economy: 7.48 }
      ],
      fifty: [
        { year: 2017, wickets: 15, runs: 40, average: 28.5, strikeRate: 32.0, economy: 5.34 },
        { year: 2018, wickets: 18, runs: 25, average: 26.2, strikeRate: 30.5, economy: 5.15 },
        { year: 2019, wickets: 42, runs: 30, average: 22.8, strikeRate: 25.2, economy: 5.42 },
        { year: 2020, wickets: 12, runs: 45, average: 35.4, strikeRate: 38.0, economy: 5.80 },
        { year: 2021, wickets: 15, runs: 20, average: 27.5, strikeRate: 30.8, economy: 5.35 },
        { year: 2022, wickets: 22, runs: 55, average: 25.0, strikeRate: 28.4, economy: 5.28 },
        { year: 2023, wickets: 55, runs: 60, average: 15.2, strikeRate: 18.6, economy: 4.88 },
        { year: 2024, wickets: 8, runs: 10, average: 32.5, strikeRate: 36.0, economy: 5.40 },
        { year: 2025, wickets: 28, runs: 18, average: 21.4, strikeRate: 24.5, economy: 5.12 },
        { year: 2026, wickets: 32, runs: 25, average: 19.9, strikeRate: 23.0, economy: 5.18 }
      ]
    }
  },
  {
    id: "faf_du_plessis",
    name: "Faf du Plessis",
    team: "RCB",
    role: "Batsman",
    fantasyPrice: 9.5,
    fantasySafety: 9.1,
    fantasyForm: 8.8,
    img: "https://images.unsplash.com/photo-1628157582853-a796fa650a6a?w=200&h=200&fit=crop",
    turfStats: {
      t20: {
        home: { avg: 41.2, strikeRate: 139.8, runs: 1920, matches: 58 },
        outside: { avg: 36.8, strikeRate: 132.5, runs: 1650, matches: 52 }
      },
      fifty: {
        home: { avg: 48.5, strikeRate: 88.2, runs: 2950, matches: 66 },
        outside: { avg: 43.1, strikeRate: 85.6, runs: 2400, matches: 60 }
      }
    },
    career10Year: {
      t20: [
        { year: 2017, runs: 380, wickets: 0, average: 38.0, strikeRate: 128.5, economy: 0 },
        { year: 2018, runs: 420, wickets: 0, average: 42.0, strikeRate: 131.0, economy: 0 },
        { year: 2019, runs: 390, wickets: 0, average: 39.0, strikeRate: 130.2, economy: 0 },
        { year: 2020, runs: 449, wickets: 0, average: 40.8, strikeRate: 140.7, economy: 0 },
        { year: 2021, runs: 633, wickets: 0, average: 45.2, strikeRate: 138.2, economy: 0 },
        { year: 2022, runs: 468, wickets: 0, average: 31.2, strikeRate: 127.5, economy: 0 },
        { year: 2023, runs: 730, wickets: 0, average: 56.1, strikeRate: 153.6, economy: 0 },
        { year: 2024, runs: 438, wickets: 0, average: 29.2, strikeRate: 131.9, economy: 0 },
        { year: 2025, runs: 410, wickets: 0, average: 34.2, strikeRate: 135.0, economy: 0 },
        { year: 2026, runs: 460, wickets: 0, average: 38.3, strikeRate: 138.5, economy: 0 }
      ],
      fifty: [
        { year: 2017, runs: 810, wickets: 0, average: 57.8, strikeRate: 88.5, economy: 0 },
        { year: 2018, runs: 620, wickets: 0, average: 51.7, strikeRate: 86.2, economy: 0 },
        { year: 2019, runs: 690, wickets: 0, average: 62.7, strikeRate: 89.0, economy: 0 },
        { year: 2020, runs: 120, wickets: 0, average: 40.0, strikeRate: 82.5, economy: 0 },
        { year: 2021, runs: 0, wickets: 0, average: 0, strikeRate: 0, economy: 0 },
        { year: 2022, runs: 0, wickets: 0, average: 0, strikeRate: 0, economy: 0 },
        { year: 2023, runs: 0, wickets: 0, average: 0, strikeRate: 0, economy: 0 },
        { year: 2024, runs: 0, wickets: 0, average: 0, strikeRate: 0, economy: 0 },
        { year: 2025, runs: 0, wickets: 0, average: 0, strikeRate: 0, economy: 0 },
        { year: 2026, runs: 0, wickets: 0, average: 0, strikeRate: 0, economy: 0 }
      ]
    }
  },
  {
    id: "dinesh_karthik",
    name: "Dinesh Karthik",
    team: "RCB",
    role: "Batsman",
    fantasyPrice: 8.5,
    fantasySafety: 8.9,
    fantasyForm: 9.3,
    img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&h=200&fit=crop",
    turfStats: {
      t20: {
        home: { avg: 31.4, strikeRate: 148.5, runs: 1150, matches: 54 },
        outside: { avg: 26.8, strikeRate: 139.2, runs: 950, matches: 48 }
      },
      fifty: {
        home: { avg: 32.5, strikeRate: 85.4, runs: 1200, matches: 45 },
        outside: { avg: 29.1, strikeRate: 80.2, runs: 1050, matches: 42 }
      }
    },
    career10Year: {
      t20: [
        { year: 2017, runs: 180, wickets: 0, average: 22.5, strikeRate: 125.0, economy: 0 },
        { year: 2018, runs: 210, wickets: 0, average: 42.0, strikeRate: 140.4, economy: 0 }, // Nidahas trophy year
        { year: 2019, runs: 250, wickets: 0, average: 31.2, strikeRate: 135.2, economy: 0 },
        { year: 2020, runs: 169, wickets: 0, average: 14.1, strikeRate: 126.1, economy: 0 },
        { year: 2021, runs: 223, wickets: 0, average: 22.3, strikeRate: 131.1, economy: 0 },
        { year: 2022, runs: 330, wickets: 0, average: 55.0, strikeRate: 183.3, economy: 0 }, // Finisher role RCB
        { year: 2023, runs: 140, wickets: 0, average: 11.6, strikeRate: 134.6, economy: 0 },
        { year: 2024, runs: 326, wickets: 0, average: 36.2, strikeRate: 187.3, economy: 0 },
        { year: 2025, runs: 280, wickets: 0, average: 28.0, strikeRate: 165.2, economy: 0 },
        { year: 2026, runs: 315, wickets: 0, average: 45.0, strikeRate: 178.6, economy: 0 }
      ],
      fifty: [
        { year: 2017, runs: 150, wickets: 0, average: 37.5, strikeRate: 82.0, economy: 0 },
        { year: 2018, runs: 210, wickets: 0, average: 42.0, strikeRate: 84.5, economy: 0 },
        { year: 2019, runs: 90, wickets: 0, average: 18.0, strikeRate: 75.0, economy: 0 },
        { year: 2020, runs: 0, wickets: 0, average: 0, strikeRate: 0, economy: 0 },
        { year: 2021, runs: 0, wickets: 0, average: 0, strikeRate: 0, economy: 0 },
        { year: 2022, runs: 0, wickets: 0, average: 0, strikeRate: 0, economy: 0 },
        { year: 2023, runs: 0, wickets: 0, average: 0, strikeRate: 0, economy: 0 },
        { year: 2024, runs: 0, wickets: 0, average: 0, strikeRate: 0, economy: 0 },
        { year: 2025, runs: 0, wickets: 0, average: 0, strikeRate: 0, economy: 0 },
        { year: 2026, runs: 0, wickets: 0, average: 0, strikeRate: 0, economy: 0 }
      ]
    }
  }
];

// Active Match ball-by-ball simulated feed
// IPL 2026 FINAL: RCB vs Gujarat Titans (GT) at Ahmedabad.
// GT Bat first and score 192/5 (20 overs)
// RCB is chasing 193 to win the IPL Final!
const liveMatchData = {
  details: {
    teams: "RCB vs Gujarat Titans (IPL 2026 Final)",
    shortName: "RCB vs GT",
    format: "T20",
    venue: "Narendra Modi Stadium, Ahmedabad",
    date: "Today",
    target: 193,
    firstInnings: "GT 192/5 (20.0)"
  },
  // Detailed RCB chase simulation (30 balls key milestones)
  balls: [
    { ballIndex: 1, over: 0, ball: 1, batsman: "Virat Kohli", bowler: "Mohammed Shami", runs: 1, wickets: 0, cumulativeRuns: 1, cumulativeWickets: 0, prIND: 48.0, comment: "Shami bowls a beauty on off. Kohli taps to cover for a quick single." },
    { ballIndex: 2, over: 0, ball: 4, batsman: "Faf du Plessis", bowler: "Mohammed Shami", runs: 4, wickets: 0, cumulativeRuns: 6, cumulativeWickets: 0, prIND: 50.0, comment: "FOUR! Faf steps inside the line and clips it past square leg. RCB under way!" },
    { ballIndex: 3, over: 1, ball: 3, batsman: "Faf du Plessis", bowler: "Spencer Johnson", runs: 6, wickets: 0, cumulativeRuns: 15, cumulativeWickets: 0, prIND: 53.0, comment: "SIX! Massive! Johnson bowls short and Faf hooks it over deep square leg!" },
    { ballIndex: 4, over: 2, ball: 3, batsman: "Faf du Plessis", bowler: "Mohammed Shami", runs: 0, wickets: 1, cumulativeRuns: 19, cumulativeWickets: 1, prIND: 40.0, comment: "OUT! In the air and caught! Shami strikes. Faf tries to clear mid-off but gets a toe-end to Shubman Gill. Faf du Plessis c Gill b Shami 12 (9).", isWicket: true, turningPoint: "WICKET! skipper Faf departs early. Major blow to RCB in the chase!" },
    { ballIndex: 5, over: 3, ball: 2, batsman: "Rajat Patidar", bowler: "Spencer Johnson", runs: 4, wickets: 1, cumulativeRuns: 27, cumulativeWickets: 1, prIND: 42.0, comment: "FOUR! Patidar stands tall and punches it past extra cover. Cracking shot." },
    { ballIndex: 6, over: 4, ball: 5, batsman: "Virat Kohli", bowler: "Rashid Khan", runs: 6, wickets: 1, cumulativeRuns: 43, cumulativeWickets: 1, prIND: 47.0, comment: "SIX! Smashed! Kohli reads the googly early, gets down on one knee, and clears deep mid-wicket!" },
    { ballIndex: 7, over: 5, ball: 6, batsman: "Rajat Patidar", bowler: "Rashid Khan", runs: 4, wickets: 1, cumulativeRuns: 55, cumulativeWickets: 1, prIND: 51.0, comment: "FOUR! Boundary to end the Powerplay. RCB are 55/1. Required rate is 9.85 rpo.", turningPoint: "POWERPLAY COMPLETED. RCB recovers to 55/1, keeping up with the 193 target." },
    { ballIndex: 8, over: 7, ball: 3, batsman: "Rajat Patidar", bowler: "Noor Ahmad", runs: 6, wickets: 1, cumulativeRuns: 72, cumulativeWickets: 1, prIND: 55.0, comment: "SIX! Slog sweep over cow corner by Patidar. Clean strike!" },
    { ballIndex: 9, over: 8, ball: 4, batsman: "Rajat Patidar", bowler: "Mohit Sharma", runs: 0, wickets: 2, cumulativeRuns: 79, cumulativeWickets: 2, prIND: 42.0, comment: "OUT! Caught in the deep! Mohit Sharma deceives Patidar with a slower ball cutter. Caught by David Miller. Rajat Patidar c Miller b Mohit 22 (17).", isWicket: true, turningPoint: "WICKET! Mohit Sharma dismisses Patidar. GT regains the momentum." },
    { ballIndex: 10, over: 9, ball: 5, batsman: "Glenn Maxwell", bowler: "Rashid Khan", runs: 6, wickets: 2, cumulativeRuns: 92, cumulativeWickets: 2, prIND: 48.0, comment: "SIX! Maxwell opens his account in style! Launches Rashid 102 meters back into the stands." },
    { ballIndex: 11, over: 11, ball: 2, batsman: "Glenn Maxwell", bowler: "Rashid Khan", runs: 0, wickets: 3, cumulativeRuns: 104, cumulativeWickets: 3, prIND: 34.0, comment: "OUT! Clean bowled! Rashid gets the big fish. Maxwell misses a reverse-sweep and the ball crashes into off stump. Glenn Maxwell b Rashid 15 (8).", isWicket: true, turningPoint: "WICKET! Rashid Khan bowls Glenn Maxwell. RCB down to 34% win probability." },
    { ballIndex: 12, over: 12, ball: 4, batsman: "Virat Kohli", bowler: "Mohit Sharma", runs: 4, wickets: 3, cumulativeRuns: 116, cumulativeWickets: 3, prIND: 40.0, comment: "FOUR! Kohli flicks it past short fine leg to bring up his FIFTY! 51 off 34 balls. The King stands tall.", turningPoint: "FIFTY! Kohli leads the counter-attack for RCB in the IPL Final." },
    { ballIndex: 13, over: 13, ball: 6, batsman: "Mahipal Lomror", bowler: "Noor Ahmad", runs: 6, wickets: 3, cumulativeRuns: 131, cumulativeWickets: 3, prIND: 48.0, comment: "SIX! Smashed over long-off! Lomror brings RCB back into the game. 62 needed off 36 balls.", turningPoint: "SIX! Lomror slams Noor Ahmad, reducing required rate to 10.3 rpo." },
    { ballIndex: 14, over: 14, ball: 3, batsman: "Virat Kohli", bowler: "Mohammed Shami", runs: 4, wickets: 3, cumulativeRuns: 137, cumulativeWickets: 3, prIND: 50.0, comment: "FOUR! Stand and deliver! Kohli drives Shami on the up through covers." },
    { ballIndex: 15, over: 15, ball: 6, batsman: "Virat Kohli", bowler: "Spencer Johnson", runs: 2, wickets: 3, cumulativeRuns: 145, cumulativeWickets: 3, prIND: 52.0, comment: "Excellent running. RCB is 145/3, needing 48 runs off the final 24 balls." },
    { ballIndex: 16, over: 16, ball: 5, batsman: "Virat Kohli", bowler: "Mohammed Shami", runs: 0, wickets: 4, cumulativeRuns: 150, cumulativeWickets: 4, prIND: 30.0, comment: "OUT! Unbelievable scenes! Kohli is caught at deep mid-wicket. He goes for the pull but holes out to Shubman Gill. Kohli c Gill b Shami 82 (51).", isWicket: true, turningPoint: "WICKET! Virat Kohli falls to Shami. Gujarat Titans are ecstatic as win probability swings GT (+22%)." },
    { ballIndex: 17, over: 17, ball: 3, batsman: "Dinesh Karthik", bowler: "Mohit Sharma", runs: 6, wickets: 4, cumulativeRuns: 159, cumulativeWickets: 4, prIND: 38.0, comment: "SIX! Smashed over deep square leg! Classic DK pull shot under extreme pressure!" },
    { ballIndex: 18, over: 18, ball: 2, batsman: "Mahipal Lomror", bowler: "Rashid Khan", runs: 4, wickets: 4, cumulativeRuns: 167, cumulativeWickets: 4, prIND: 42.0, comment: "FOUR! Lomror sweeps Rashid behind square. 26 runs needed off 10 balls." },
    { ballIndex: 19, over: 18, ball: 5, batsman: "Mahipal Lomror", bowler: "Rashid Khan", runs: 0, wickets: 5, cumulativeRuns: 171, cumulativeWickets: 5, prIND: 28.0, comment: "OUT! Caught at long-on! Rashid has another. Lomror tries to clear the boundary but finds Tewatia. Mahipal Lomror c Tewatia b Rashid 16 (12).", isWicket: true, turningPoint: "WICKET! Rashid Khan gets Lomror. RCB needs 22 off 7 balls, GT dominates." },
    { ballIndex: 20, over: 18, ball: 6, batsman: "Swapnil Singh", bowler: "Rashid Khan", runs: 2, wickets: 5, cumulativeRuns: 173, cumulativeWickets: 5, prIND: 30.0, comment: "Sprinted hard. Swapnil works it to deep midwicket and returns for two. 20 off 6 balls." },
    { ballIndex: 21, over: 19, ball: 1, batsman: "Dinesh Karthik", bowler: "Mohit Sharma", runs: 6, wickets: 5, cumulativeRuns: 179, cumulativeWickets: 5, prIND: 45.0, comment: "SIX! Sensationally struck! DK pulls a slower bouncer over deep mid-wicket. 14 needed off 5 balls!" },
    { ballIndex: 22, over: 19, ball: 2, batsman: "Dinesh Karthik", bowler: "Mohit Sharma", runs: 4, wickets: 5, cumulativeRuns: 183, cumulativeWickets: 5, prIND: 60.0, comment: "FOUR! Inside edge past the keeper! DK gets luck, but RCB gets four runs. 10 needed off 4!" },
    { ballIndex: 23, over: 19, ball: 3, batsman: "Dinesh Karthik", bowler: "Mohit Sharma", runs: 2, wickets: 5, cumulativeRuns: 185, cumulativeWickets: 5, prIND: 68.0, comment: "Unbelievable speed! DK drives to long-on and they sprint back for the second run. 8 off 3." },
    { ballIndex: 24, over: 19, ball: 4, batsman: "Dinesh Karthik", bowler: "Mohit Sharma", runs: 0, wickets: 5, cumulativeRuns: 185, cumulativeWickets: 5, prIND: 50.0, comment: "Dot ball! A pinpoint yorker from Mohit. DK blocks. Tension peaks. 8 needed off 2 balls!" },
    { ballIndex: 25, over: 19, ball: 5, batsman: "Dinesh Karthik", bowler: "Mohit Sharma", runs: 6, wickets: 5, cumulativeRuns: 191, cumulativeWickets: 5, prIND: 92.0, comment: "SIX! OH MY GOODNESS! Smashed straight down the ground! DK finishes in style! Scores level!", turningPoint: "SIX! Dinesh Karthik hits Mohit straight over his head. Scores level!" },
    { ballIndex: 26, over: 19, ball: 6, batsman: "Dinesh Karthik", bowler: "Mohit Sharma", runs: 2, wickets: 5, cumulativeRuns: 193, cumulativeWickets: 5, prIND: 100.0, comment: "TWO RUNS! DK pushes to deep cover and sprints back! RCB wins! RCB WINS IPL 2026!", turningPoint: "RCB WINS IPL 2026! Dinesh Karthik finishes the chase on the final ball!" }
  ]
};

// Prediction competition config for IPL 2026 Final
const predictionConfig = {
  matchId: "ipl_final_2026",
  questions: [
    {
      id: "q1",
      text: "What will be RCB's final score at the end of the chase?",
      options: ["Under 185", "185 to 192", "193 or more"],
      correctAnswer: "193 or more",
      points: 20
    },
    {
      id: "q2",
      text: "Will Virat Kohli score more than 50 runs?",
      options: ["Yes", "No"],
      correctAnswer: "Yes", // scored 82
      points: 10
    },
    {
      id: "q3",
      text: "Will Rashid Khan take 2 or more wickets?",
      options: ["Yes", "No"],
      correctAnswer: "Yes", // got Patidar & Maxwell
      points: 10
    },
    {
      id: "q4",
      text: "Will RCB score 50 or more runs in the Powerplay (first 6 overs)?",
      options: ["Yes", "No"],
      correctAnswer: "Yes", // they were 55/1
      points: 10
    },
    {
      id: "q5",
      text: "Who will win the IPL 2026 Final?",
      options: ["RCB", "Gujarat Titans"],
      correctAnswer: "RCB",
      points: 15
    }
  ],
  competitors: [
    { name: "CricketGuru99", currentScore: 40, answers: { q1: "193 or more", q2: "Yes", q3: "No", q4: "Yes", q5: "RCB" } },
    { name: "SpinMaster", currentScore: 35, answers: { q1: "185 to 192", q2: "Yes", q3: "Yes", q4: "No", q5: "Gujarat Titans" } },
    { name: "DhoniFan77", currentScore: 45, answers: { q1: "193 or more", q2: "Yes", q3: "Yes", q4: "Yes", q5: "RCB" } },
    { name: "BoundariesGalore", currentScore: 30, answers: { q1: "Under 185", q2: "No", q3: "Yes", q4: "Yes", q5: "Gujarat Titans" } },
    { name: "GooglyMaster", currentScore: 25, answers: { q1: "185 to 192", q2: "No", q3: "No", q4: "Yes", q5: "RCB" } }
  ]
};

// Make data available globally or as module depending on environment
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { pastMatches, upcomingMatches, players, liveMatchData, predictionConfig };
}
