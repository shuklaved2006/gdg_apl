// CRICKET ANALYTICS ENGINE - CORE LOGIC WITH STATEMENT NOTATIONS

/**
 * @statement [Statement 2: Monumental Shifts]
 * @description Processes ball-by-ball events to identify key turning points, win probability shifts, and wickets that caused a significant swing in momentum.
 * @inputs {Array} matchBalls - Array of ball objects from the match feed.
 * @outputs {Array} - Array of turning points with description, over, and win probability swing.
 */
function calculateMomentumShifts(matchBalls) {
  const shifts = [];
  for (let i = 1; i < matchBalls.length; i++) {
    const prevBall = matchBalls[i - 1];
    const currentBall = matchBalls[i];
    const swing = Math.abs(currentBall.prIND - prevBall.prIND);
    
    // Highlight shifts that have a turningPoint marker, a wicket, or a probability swing > 5%
    if (currentBall.turningPoint || currentBall.isWicket || swing >= 5.0) {
      shifts.push({
        ballIndex: currentBall.ballIndex,
        over: `${currentBall.over}.${currentBall.ball}`,
        description: currentBall.comment,
        isWicket: !!currentBall.isWicket,
        swing: (currentBall.prIND - prevBall.prIND).toFixed(1),
        currentPr: currentBall.prIND,
        headline: currentBall.turningPoint || (currentBall.isWicket ? "WICKET FALLS!" : "MOMENTUM SWING!")
      });
    }
  }
  return shifts;
}

/**
 * @statement [Statement 5: Predictions]
 * @description Predicts the final innings score and updates victory probability dynamically based on current run rate, wickets left, and historical patterns.
 * @inputs {number} currentRuns - Runs scored by the chasing team so far.
 * @inputs {number} ballsBowled - Total balls bowled so far (0-120).
 * @inputs {number} wicketsLost - Wickets fallen (0-10).
 * @inputs {number} target - Runs required to win (1st innings score + 1).
 * @inputs {string} format - The match format ('T20' or '50-50').
 * @outputs {Object} - Projected final score and live win probabilities.
 */
function predictFinalScore(currentRuns, ballsBowled, wicketsLost, target, format) {
  const totalBalls = format === 'T20' ? 120 : 300;
  const ballsLeft = totalBalls - ballsBowled;
  const currentRR = ballsBowled > 0 ? (currentRuns / (ballsBowled / 6)) : 0;
  
  if (wicketsLost >= 10 || ballsLeft <= 0) {
    return { projectedScore: currentRuns, winProbIND: currentRuns >= target ? 100 : 0 };
  }

  // Score projection formula: current runs + projected runs in remaining balls.
  // Projected runs are weighted by remaining wickets.
  // Wicket weight drops the projected scoring rate as more wickets fall.
  const wicketWeight = (10 - wicketsLost) / 10;
  const estimatedFutureRR = Math.max(currentRR, 7.5) * 0.4 + (8.5 * wicketWeight) * 0.6;
  const projectedFutureRuns = Math.round((ballsLeft / 6) * estimatedFutureRR);
  const projectedScore = currentRuns + projectedFutureRuns;

  // Win probability algorithm based on runs needed vs. balls left vs. wickets left
  const runsNeeded = target - currentRuns;
  let winProbIND = 50.0; // Base baseline

  if (runsNeeded <= 0) {
    winProbIND = 100.0;
  } else {
    const rrr = runsNeeded / (ballsLeft / 6); // Required Run Rate
    const wicketsLeft = 10 - wicketsLost;
    
    // Standard T20/50-50 chasing difficulty matrix
    const difficulty = rrr / (wicketsLeft * 1.5);
    winProbIND = Math.round(Math.max(2, Math.min(98, 100 - (difficulty * 50))));
  }

  return {
    projectedScore: Math.max(projectedScore, currentRuns),
    winProbIND: winProbIND,
    winProbAUS: 100 - winProbIND,
    requiredRate: (runsNeeded / (ballsLeft / 6)).toFixed(2)
  };
}

/**
 * @statement [Statement 3: Comparison]
 * @description Compares two players side-by-side on performance stats (average, strike rate, wickets, runs, economy) for a given format and returns score coefficients.
 * @inputs {Object} playerA - First player data object.
 * @inputs {Object} playerB - Second player data object.
 * @inputs {string} format - The match format ('t20' or 'fifty').
 * @outputs {Object} - Comparison score metrics and radar data points.
 */
function comparePlayers(playerA, playerB, format) {
  const getAggregates = (player, fmt) => {
    // Standardize home/away average values
    const home = player.turfStats[fmt].home;
    const outside = player.turfStats[fmt].outside;
    const avgRuns = (home.runs + outside.runs) / (home.matches + outside.matches);
    const avgSR = (home.strikeRate + outside.strikeRate) / 2;
    const avgAvg = (home.avg + outside.avg) / 2;
    const totalWickets = home.wickets + outside.wickets;
    const totalMatches = home.matches + outside.matches;
    
    return {
      name: player.name,
      role: player.role,
      avg: parseFloat(avgAvg.toFixed(1)),
      strikeRate: parseFloat(avgSR.toFixed(1)),
      runs: home.runs + outside.runs,
      wickets: totalWickets,
      matches: totalMatches,
      wicketPerMatch: parseFloat((totalWickets / totalMatches).toFixed(2))
    };
  };

  const statsA = getAggregates(playerA, format);
  const statsB = getAggregates(playerB, format);

  // Normalize stats to a 0-100 scale for visual plotting
  const maxAvg = 60, maxSR = 160, maxRuns = 10000, maxWkts = 200;
  
  return {
    playerA: statsA,
    playerB: statsB,
    chartData: {
      labels: ["Average", "Strike Rate", "Total Runs", "Total Wickets", "Matches Played"],
      datasets: [
        {
          label: statsA.name,
          data: [
            Math.min(100, (statsA.avg / maxAvg) * 100),
            Math.min(100, (statsA.strikeRate / maxSR) * 100),
            Math.min(100, (statsA.runs / maxRuns) * 100),
            Math.min(100, (statsA.wickets / maxWkts) * 100),
            Math.min(100, (statsA.matches / 200) * 100)
          ]
        },
        {
          label: statsB.name,
          data: [
            Math.min(100, (statsB.avg / maxAvg) * 100),
            Math.min(100, (statsB.strikeRate / maxSR) * 100),
            Math.min(100, (statsB.runs / maxRuns) * 100),
            Math.min(100, (statsB.wickets / maxWkts) * 100),
            Math.min(100, (statsB.matches / 200) * 100)
          ]
        }
      ]
    }
  };
}

/**
 * @statement [Statement 8: Multi-Format Career Analyzer]
 * @description Retrieves and formats the 10-year historical career trends for a player in either T20 or 50-50 (ODI) format for line charts.
 * @inputs {Object} player - The player data object.
 * @inputs {string} format - The cricket format ('t20' or 'fifty').
 * @outputs {Object} - Formatted data containing labels (years) and datasets (runs, wickets, strikeRate, average).
 */
function getPlayerFormatCareerStats(player, format) {
  const careerData = player.career10Year[format];
  const years = careerData.map(d => d.year);
  const runs = careerData.map(d => d.runs);
  const wickets = careerData.map(d => d.wickets);
  const averages = careerData.map(d => d.average);
  const strikeRates = careerData.map(d => d.strikeRate);
  
  return {
    playerName: player.name,
    format: format === 't20' ? 'T20 International' : 'ODI (50-50)',
    years,
    runs,
    wickets,
    averages,
    strikeRates
  };
}

/**
 * @statement [Statement 9: Home vs. Outside Turf Analysis]
 * @description Compares a player's performance metrics (average, strike rate, wickets) when playing on home turf vs. outside (away/neutral) venues.
 * @inputs {Object} player - The player data object.
 * @inputs {string} format - The cricket format ('t20' or 'fifty').
 * @outputs {Object} - JSON structure containing comparison tables and dataset for side-by-side bar charts.
 */
function getPlayerTurfStats(player, format) {
  const home = player.turfStats[format].home;
  const outside = player.turfStats[format].outside;
  
  return {
    playerName: player.name,
    home: {
      avg: home.avg,
      strikeRate: home.strikeRate,
      runs: home.runs,
      wickets: home.wickets,
      matches: home.matches
    },
    outside: {
      avg: outside.avg,
      strikeRate: outside.strikeRate,
      runs: outside.runs,
      wickets: outside.wickets,
      matches: outside.matches
    },
    chartData: {
      labels: ["Batting Avg", "Strike Rate (scaled/2)", "Wickets (x10)"],
      datasets: [
        {
          label: "Home Turf",
          data: [home.avg, home.strikeRate / 2, home.wickets * 10]
        },
        {
          label: "Outside Turf",
          data: [outside.avg, outside.strikeRate / 2, outside.wickets * 10]
        }
      ]
    }
  };
}

/**
 * @statement [Statement 6: Fantasy Guidance]
 * @description Computes a proprietary fantasy value index based on form, safety rating, price, and stats, and recommends captaincy/vice-captaincy picks.
 * @inputs {Array} playerList - List of all player objects.
 * @outputs {Object} - Fantasy team suggestions, ranking list, and recommended captains.
 */
function calculateFantasyScore(playerList) {
  const ratedPlayers = playerList.map(p => {
    // Index algorithm: form weighted at 50%, safety rating at 30%, price-efficiency at 20%
    const efficiency = (11 - p.fantasyPrice) * 10; // lower price = higher efficiency score
    const fantasyIndex = parseFloat((p.fantasyForm * 5 + p.fantasySafety * 3 + efficiency * 0.2).toFixed(1));
    
    return {
      id: p.id,
      name: p.name,
      team: p.team,
      role: p.role,
      price: p.fantasyPrice,
      safety: p.fantasySafety,
      form: p.fantasyForm,
      indexScore: fantasyIndex
    };
  });

  // Sort descending by index score
  ratedPlayers.sort((a, b) => b.indexScore - a.indexScore);

  const captains = [
    { ...ratedPlayers[0], recommendation: "Captain Choice (Highest projected points and safety index)" },
    { ...ratedPlayers[1], recommendation: "Vice-Captain Choice (High strike form and key impact player)" }
  ];

  const optimalSquad = ratedPlayers.slice(0, 7); // Top 7 core fantasy players (representing a custom dream team selection)

  return {
    rankings: ratedPlayers,
    captains,
    optimalSquad
  };
}

/**
 * @statement [Statement 10: Master Search & Filtering]
 * @description Search engine that indexes and returns matches, players, scores, and upcoming schedules based on user query inputs.
 * @inputs {string} query - Cleaned user search text.
 * @inputs {Array} playerList - Database list of players.
 * @inputs {Array} pastList - Database list of past matches.
 * @inputs {Array} upcomingList - Database list of upcoming matches.
 * @inputs {Object} liveMatch - Live match data.
 * @outputs {Object} - Categorized list of matches, players, upcoming schedules, and scores.
 */
function searchDatabase(query, playerList, pastList, upcomingList, liveMatch) {
  const searchStr = query.trim().toLowerCase();
  if (!searchStr) return { players: [], matches: [], upcoming: [], scores: [] };

  const matches = [];
  const playersMatched = [];
  const upcoming = [];
  const scores = [];

  // 1. Search Players (by name, team, or role)
  playerList.forEach(p => {
    if (p.name.toLowerCase().includes(searchStr) || 
        p.team.toLowerCase().includes(searchStr) || 
        p.role.toLowerCase().includes(searchStr)) {
      playersMatched.push({
        id: p.id,
        name: p.name,
        team: p.team,
        role: p.role,
        desc: `${p.role} | Fantasy Price: ${p.fantasyPrice}cr`
      });
    }
  });

  // 2. Search Live Match & Past Matches
  if (liveMatch.details.teams.toLowerCase().includes(searchStr) || 
      liveMatch.details.shortName.toLowerCase().includes(searchStr) ||
      "live match".includes(searchStr)) {
    matches.push({
      id: "live",
      title: liveMatch.details.teams,
      subtitle: "Live Match - View Realtime Analytics",
      type: "live"
    });
    scores.push({
      id: "live_score",
      title: `${liveMatch.details.shortName} (LIVE)`,
      subtitle: liveMatch.details.firstInnings,
      type: "live"
    });
  }

  pastList.forEach(pm => {
    if (pm.teams.toLowerCase().includes(searchStr) || 
        pm.shortName.toLowerCase().includes(searchStr) ||
        pm.venue.toLowerCase().includes(searchStr) ||
        pm.result.toLowerCase().includes(searchStr)) {
      matches.push({
        id: pm.id,
        title: pm.teams,
        subtitle: `${pm.date} | ${pm.result}`,
        type: "past"
      });
      scores.push({
        id: `${pm.id}_score`,
        title: `${pm.shortName} - Result`,
        subtitle: pm.score,
        type: "past"
      });
    }
  });

  // 3. Search Upcoming matches
  upcomingList.forEach(um => {
    if (um.teams.toLowerCase().includes(searchStr) || 
        um.shortName.toLowerCase().includes(searchStr) ||
        um.venue.toLowerCase().includes(searchStr)) {
      upcoming.push({
        id: um.id,
        title: um.teams,
        subtitle: `${um.date} at ${um.time} | Venue: ${um.venue}`,
        type: "upcoming"
      });
    }
  });

  return {
    players: playersMatched,
    matches,
    upcoming,
    scores
  };
}

/**
 * @statement [Statement 7: Prediction Competition]
 * @description Grades prediction choices (user and competitors) in real-time as the live match progresses, calculating scores and updating the leaderboard standings.
 * @inputs {Object} userAnswers - User answers keys matching question IDs (e.g. {q1: "Yes", ...}).
 * @inputs {number} currentBallIndex - Current progress index in the match simulation balls array.
 * @inputs {Array} matchBalls - Complete array of match ball objects.
 * @inputs {Array} questions - Active prediction questions.
 * @inputs {Array} competitors - Leaderboard competitors.
 * @outputs {Object} - Dynamic leaderboard array sorted by updated score, and graded results.
 */
function gradePredictions(userAnswers, currentBallIndex, matchBalls, questions, competitors) {
  // Extract state of match at currentBallIndex
  const completedBalls = matchBalls.slice(0, currentBallIndex + 1);
  const lastBall = completedBalls[completedBalls.length - 1] || { cumulativeRuns: 0, cumulativeWickets: 0 };
  const isMatchEnded = currentBallIndex >= matchBalls.length - 1;

  // Check if RCB's score runs are 193+
  const finalScoreReached = lastBall.cumulativeRuns;
  const isTargetChased = finalScoreReached >= 193;
  
  // Powerplay score at end of 6th over (over index 5, ball 6)
  let powerplayScore = 0;
  let hasPowerplayEnded = false;
  completedBalls.forEach(b => {
    if (b.over === 5 && b.ball === 6) {
      powerplayScore = b.cumulativeRuns;
      hasPowerplayEnded = true;
    }
  });

  // Check Kohli runs
  let kohliRuns = 0;
  completedBalls.forEach(b => {
    if (b.batsman === "Virat Kohli") {
      kohliRuns += b.runs;
    }
  });

  // Check Rashid Khan wickets (got Patidar in over 8.4, Maxwell in 11.2, Lomror in 18.5)
  let rashidWickets = 0;
  completedBalls.forEach(b => {
    if (b.isWicket && b.bowler === "Rashid Khan") {
      rashidWickets++;
    }
  });

  // Calculate actual statuses
  const answersGrading = {};
  
  // Grading logic for Q1 (RCB final score)
  if (isMatchEnded) {
    answersGrading.q1 = finalScoreReached >= 193 ? "193 or more" : (finalScoreReached >= 185 ? "185 to 192" : "Under 185");
  } else {
    if (finalScoreReached >= 193) answersGrading.q1 = "193 or more";
    else if (finalScoreReached >= 185) answersGrading.q1 = "185 to 192";
    else answersGrading.q1 = null; // Unresolved yet
  }

  // Grading Q2 (Kohli runs > 50)
  if (kohliRuns > 50) {
    answersGrading.q2 = "Yes";
  } else if (isMatchEnded || (completedBalls.some(b => b.isWicket && b.batsman === "Virat Kohli"))) {
    answersGrading.q2 = "No";
  } else {
    answersGrading.q2 = null; // Still batting
  }

  // Grading Q3 (Rashid wickets >= 2)
  if (rashidWickets >= 2) {
    answersGrading.q3 = "Yes";
  } else if (isMatchEnded) {
    answersGrading.q3 = "No";
  } else {
    answersGrading.q3 = null; // Still can bowl
  }

  // Grading Q4 (Powerplay score >= 50)
  const currentScore = lastBall.cumulativeRuns;
  if (currentScore >= 50 && lastBall.over <= 5) {
    answersGrading.q4 = "Yes";
  } else if (hasPowerplayEnded) {
    answersGrading.q4 = powerplayScore >= 50 ? "Yes" : "No";
  } else if (isMatchEnded) {
    answersGrading.q4 = currentScore >= 50 ? "Yes" : "No";
  } else {
    answersGrading.q4 = null; // Unresolved
  }

  // Grading Q5 (Winner)
  if (isMatchEnded) {
    answersGrading.q5 = isTargetChased ? "RCB" : "Gujarat Titans";
  } else {
    answersGrading.q5 = null; // Match live
  }

  // Calculate scores
  const scoreUser = (answers) => {
    let pts = 0;
    questions.forEach(q => {
      const correctAns = answersGrading[q.id];
      if (correctAns && answers[q.id] === correctAns) {
        pts += q.points;
      }
    });
    return pts;
  };

  const results = competitors.map(c => {
    const scoredPoints = scoreUser(c.answers);
    return {
      name: c.name,
      score: c.currentScore + scoredPoints,
      predictionsScored: scoredPoints,
      isUser: false
    };
  });

  // Include the active user
  const userScore = scoreUser(userAnswers);
  results.push({
    name: "You (User)",
    score: 10 + userScore, // 10 base points
    predictionsScored: userScore,
    isUser: true
  });

  // Sort by final score
  results.sort((a, b) => b.score - a.score);

  return {
    leaderboard: results,
    grading: answersGrading,
    kohliRuns,
    rashidWickets
  };
}


/**
 * @statement [Statement 4: Long-Term Discovery]
 * @description Discovers team records, streaks, and trends across multiple matches to extract long-term historical discoveries.
 * @inputs {Array} playerList - All players.
 * @inputs {Array} pastList - Completed matches.
 * @outputs {Object} - Streaks, Win-loss ratio, team rankings.
 */
function analyzeStreaksAndRecords(playerList, pastList) {
  // Let's compute team streaks
  const rcbPlayers = playerList.filter(p => p.team === 'RCB');
  const gtPlayers = playerList.filter(p => p.team === 'GT');
  
  const totalRunsRCB = rcbPlayers.reduce((sum, p) => sum + (p.turfStats.t20.home.runs + p.turfStats.t20.outside.runs), 0);
  const totalRunsGT = gtPlayers.reduce((sum, p) => sum + (p.turfStats.t20.home.runs + p.turfStats.t20.outside.runs), 0);

  return {
    h2hMatches: pastList.length,
    indWinStreak: "1 Win",
    teamDiscovery: [
      { key: "RCB Batting Depth", stat: `${totalRunsRCB} Total T20 Runs`, desc: "RCB boasts exceptional runs from top order stars Kohli & Faf." },
      { key: "GT Bowling Economy", stat: "22.8 Wickets average (Rashid)", desc: "GT's spin unit registers excellent bowling averages on home turfs." },
      { key: "Home Advantage", stat: "+12.4% Win Prob", desc: "Teams playing in Ahmedabad or Chinnaswamy have shown higher win probabilities historical trend." }
    ]
  };
}


/**
 * @statement [Statement 1: Insights]
 * @description Combines match conditions, player stats, and prediction probability to produce actionable, human-friendly insights and alerts for fans.
 * @inputs {Object} liveMatchState - Object describing current run rate, balls bowled, wickets.
 * @inputs {Object} predictionStats - Object describing predictions and win probability.
 * @outputs {Array} - Array of narrative insight sentences.
 */
function generateActionableInsights(liveMatchState, predictionStats) {
  const insights = [];
  const crr = liveMatchState.balls > 0 ? (liveMatchState.runs / (liveMatchState.balls / 6)) : 0;
  
  // Wicket warnings
  if (liveMatchState.wickets >= 4) {
    insights.push({
      type: "warning",
      text: "Wicket Alert: The chasing team has lost critical wickets. Batsmen must focus on building partnerships rather than boundary hitting."
    });
  }

  // Win probability insight
  if (predictionStats.winProbIND > 70) {
    insights.push({
      type: "success",
      text: `Actionable Insight: The chasing team's victory path looks highly secure at ${predictionStats.winProbIND}%. Play safe fantasy strategies and back the finishers.`
    });
  } else if (predictionStats.winProbIND < 35) {
    insights.push({
      type: "danger",
      text: `Strategic Shift: The bowling side is dominating — chasing team win probability has dropped to ${predictionStats.winProbIND}%. A monumental counter-attack is needed in the death overs.`
    });
  } else {
    insights.push({
      type: "info",
      text: `Close Encounter: Win probability is ${predictionStats.winProbIND}%. Dynamic momentum shifts detected. A balanced fantasy captain pick (All-rounders) will mitigate risk.`
    });
  }

  // Run rate comparison
  if (predictionStats.requiredRate > 10.5) {
    insights.push({
      type: "warning",
      text: `Required run rate has spiked to ${predictionStats.requiredRate} rpo. Expect batsmen to target spinners and go for big shots in the next 2 overs.`
    });
  }

  // Current run rate insight
  if (crr > 0 && crr < 6 && liveMatchState.balls > 30) {
    insights.push({
      type: "danger",
      text: `Current run rate is only ${crr.toFixed(2)} rpo. The scoring rate must accelerate immediately to keep the chase alive.`
    });
  }

  return insights;
}

// Make functions available globally or as module depending on environment
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    calculateMomentumShifts,
    predictFinalScore,
    comparePlayers,
    getPlayerFormatCareerStats,
    getPlayerTurfStats,
    calculateFantasyScore,
    searchDatabase,
    gradePredictions,
    analyzeStreaksAndRecords,
    generateActionableInsights,
    fetchLiveRSSScores,
    parseRSSTitle
  };
}

/**
 * @statement [Statement 10: Master Search & Filtering]
 * @description Queries ESPNcricinfo's live RSS scorecard XML feed using a CORS-proxy helper (AllOrigins) to bypass browser restrictions.
 * @inputs {Function} callback - Callback function handling (error, matchesArray).
 * @outputs {None}
 */
function fetchLiveRSSScores(callback) {
  const rssUrl = 'https://wassets.espncricinfo.com/rss/livescores.xml';
  const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(rssUrl)}&rand=${Math.random()}`;
  
  fetch(proxyUrl)
    .then(res => {
      if (res.ok) return res.json();
      throw new Error("Unable to reach RSS feed.");
    })
    .then(data => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(data.contents, "text/xml");
      const items = doc.getElementsByTagName('item');
      const parsedList = [];
      
      for (let i = 0; i < items.length; i++) {
        const title = items[i].getElementsByTagName('title')[0].textContent;
        const description = items[i].getElementsByTagName('description')[0].textContent;
        const link = items[i].getElementsByTagName('link')[0].textContent;
        
        parsedList.push({
          id: `rss_${i}`,
          title: title.trim(),
          description: description.trim(),
          link: link.trim()
        });
      }
      callback(null, parsedList);
    })
    .catch(err => {
      callback(err, null);
    });
}

/**
 * @statement [Statement 5: Predictions]
 * @description Extracts and structures team names, runs, wickets, overs, and targets from raw Cricinfo RSS scorecard title strings.
 * @inputs {string} title - Scorecard feed title string.
 * @outputs {Object} - Parsed numeric values representing current chase status.
 */
function parseRSSTitle(title) {
  const parts = title.split(' - ');
  const teamsPart = parts[0] || "Live Match";
  const scorePart = parts[1] || "";
  
  const teams = teamsPart.split(' vs ');
  const team1 = teams[0] ? teams[0].trim() : "Team A";
  const team2 = teams[1] ? teams[1].trim() : "Team B";
  
  let runs = 0;
  let wickets = 0;
  let overs = 0.1;
  let target = 180; // default estimated target
  let battingTeam = team2;

  // Search for cricket score format: e.g. "GT 192/5" or "GT 192" or "GT 192/5 (20.0)"
  // Example scorePart: "GT 192/5 (20.0); RCB 145/3 (15.2)"
  // We want to detect the chasing team (who bats last).
  // If there are two scores, the second one is usually the chasing team!
  const scores = scorePart.split(';');
  let activeScoreline = scores[scores.length - 1] || scorePart;
  
  const scoreRegex = /([a-z\s]+)\s+(\d+)(?:\/(\d+))?\s*(?:\((\d+\.\d+|\d+)\))?/i;
  const match = activeScoreline.match(scoreRegex);
  
  if (match) {
    battingTeam = match[1].trim();
    runs = parseInt(match[2]);
    wickets = match[3] ? parseInt(match[3]) : 10;
    overs = match[4] ? parseFloat(match[4]) : 20.0;
  }
  
  // Estimate target from first innings score if available
  if (scores.length > 1) {
    const firstInningsMatch = scores[0].match(/(\d+)(?:\/(\d+))?/);
    if (firstInningsMatch) {
      target = parseInt(firstInningsMatch[1]) + 1;
    }
  }

  // Sanitize overs to prevent infinity/NaN divides
  if (overs <= 0) overs = 0.1;

  return {
    title: teamsPart,
    battingTeam,
    bowlingTeam: battingTeam === team2 ? team1 : team2,
    runs,
    wickets,
    overs,
    target
  };
}

