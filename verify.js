// VERIFICATION TEST SUITE FOR CRICKET ANALYTICS FUNCTIONS

const { pastMatches, upcomingMatches, players, liveMatchData, predictionConfig } = require('./data.js');
const {
  calculateMomentumShifts,
  predictFinalScore,
  comparePlayers,
  getPlayerFormatCareerStats,
  getPlayerTurfStats,
  calculateFantasyScore,
  searchDatabase,
  gradePredictions,
  analyzeStreaksAndRecords,
  generateActionableInsights
} = require('./analytics.js');

console.log("=== CRICPLUS CORE ALGORITHM VERIFICATION ===");

let passedTests = 0;
let failedTests = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`[PASS] ${message}`);
    passedTests++;
  } else {
    console.error(`[FAIL] ${message}`);
    failedTests++;
  }
}

try {
  // Test 1: Final Score and Probability Predictions
  const pred = predictFinalScore(100, 60, 3, 179, 'T20'); // 10 overs done (60 balls), 100 runs, 3 wickets down, chasing 179
  assert(pred.projectedScore >= 100, "Projected score is greater or equal to current score");
  assert(pred.winProbIND > 0 && pred.winProbIND < 100, "Win probability is within reasonable bounds (0-100%)");
  assert(pred.requiredRate === "7.90", `Required rate matches expected calculation (got ${pred.requiredRate}, expected 7.90)`);

  // Test 2: Momentum Shift Detections
  const shifts = calculateMomentumShifts(liveMatchData.balls);
  assert(shifts.length > 0, "Momentum tracker successfully identifies turning points");
  const firstShift = shifts[0];
  assert(firstShift.hasOwnProperty('swing'), "Turning point has a swing percentage property");

  // Test 3: Player Comparison
  const kohli = players.find(p => p.id === 'virat_kohli');
  const rohit = players.find(p => p.id === 'rohit_sharma');
  const comp = comparePlayers(kohli, rohit, 't20');
  assert(comp.playerA.name === "Virat Kohli", "Player A is Kohli");
  assert(comp.playerB.name === "Rohit Sharma", "Player B is Rohit");
  assert(comp.chartData.datasets[0].data.length === 5, "Radar comparison has exactly 5 axes");

  // Test 4: Career Trends
  const career = getPlayerFormatCareerStats(kohli, 't20');
  assert(career.years.length === 10, "10-year career length is exactly 10 years");
  assert(career.years[0] === 2017 && career.years[9] === 2026, "Career trends span 2017 to 2026");

  // Test 5: Home vs Away Turf Stats
  const turf = getPlayerTurfStats(kohli, 't20');
  assert(turf.home.runs > 0, "Home turf runs are extracted");
  assert(turf.outside.runs > 0, "Outside turf runs are extracted");

  // Test 6: Fantasy Optimizer Guidance
  const fantasy = calculateFantasyScore(players);
  assert(fantasy.rankings.length === players.length, "All players are graded in fantasy rankings");
  assert(fantasy.captains.length === 2, "Captain and Vice-captain are recommended");
  assert(fantasy.captains[0].indexScore >= fantasy.captains[1].indexScore, "Captain has higher or equal score than Vice-Captain");

  // Test 7: Master Search Engine
  const searchKohli = searchDatabase("Kohli", players, pastMatches, upcomingMatches, liveMatchData);
  assert(searchKohli.players.length === 1 && searchKohli.players[0].name === "Virat Kohli", "Search 'Kohli' returns Virat Kohli");
  
  const searchLive = searchDatabase("live", players, pastMatches, upcomingMatches, liveMatchData);
  assert(searchLive.matches.length > 0 && searchLive.matches[0].type === "live", "Search 'live' returns active match center");

  // Test 8: Prediction Competition Leaderboard
  const userAns = { q1: "179 or more", q2: "Yes", q3: "Yes", q4: "Yes", q5: "India" };
  const grading = gradePredictions(
    userAns,
    29, // Index 29 is scores level ball, close to end
    liveMatchData.balls,
    predictionConfig.questions,
    predictionConfig.competitors
  );
  assert(grading.leaderboard.length === 6, "Leaderboard includes user + 5 competitors (6 total)");
  assert(grading.leaderboard[0].score >= grading.leaderboard[5].score, "Leaderboard is sorted descending by score");

  console.log(`\n=== VERIFICATION COMPLETED: ${passedTests} passed, ${failedTests} failed ===`);
  if (failedTests > 0) {
    process.exit(1);
  }
} catch (err) {
  console.error("Critical Failure in validation script:", err);
  process.exit(1);
}
