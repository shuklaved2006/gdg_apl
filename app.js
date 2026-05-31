// CRICKET ANALYTICS PLATFORM - APP CONTROLLER

// Global Chart Instances
let momentumChart = null;
let radarChart = null;
let turfBarChart = null;
let careerLineChart = null;

// Simulation State
let currentBallIndex = -1; // -1 means match hasn't started
let simInterval = null;
let userPredictions = {
  q1: "179 or more",
  q2: "Yes",
  q3: "Yes",
  q4: "Yes",
  q5: "India"
};
let predictionsLocked = false;

// DOM Elements
const tabs = document.querySelectorAll('.nav-tab');
const tabContents = document.querySelectorAll('.tab-content');

// Initialize Dashboard
document.addEventListener('DOMContentLoaded', () => {
  initTabNavigation();
  initPlayerSelectors();
  initSimulationControls();
  initPredictionsForm();
  initSearchEngine();
  initDataSourceSelector();
  
  // Render initial static tab views
  renderComparisonTab();
  renderCareerTab();
  renderTeamDiscoveryTab();
  renderFantasyAdvisorTab();
  
  // Initialize Chart.js empty charts
  initMomentumChart();

  // Run core mathematics verification
  runSelfDiagnostics();
});

/**
 * @statement [Statement 10: Master Search & Filtering]
 * @description Listens to navigation tab clicks to switch between dashboard sections smoothly.
 * @inputs {None}
 * @outputs {None}
 */
function initTabNavigation() {
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetTab = tab.getAttribute('data-tab');
      switchTab(targetTab);
    });
  });
}

/**
 * @statement [Statement 10: Master Search & Filtering]
 * @description Changes active tab and updates navbar indicators.
 * @inputs {string} tabId - Target tab container identifier.
 * @outputs {None}
 */
function switchTab(tabId) {
  tabs.forEach(t => t.classList.remove('active'));
  tabContents.forEach(c => c.classList.remove('active'));
  
  const activeTabBtn = document.querySelector(`.nav-tab[data-tab="${tabId}"]`);
  const activeTabContent = document.getElementById(tabId);
  
  if (activeTabBtn && activeTabContent) {
    activeTabBtn.classList.add('active');
    activeTabContent.classList.add('active');
  }
}

/**
 * @statement [Statement 3: Comparison]
 * @description Populates dropdown menus with player records and sets up change listeners.
 * @inputs {None}
 * @outputs {None}
 */
function initPlayerSelectors() {
  const pASelect = document.getElementById('comparePlayerA');
  const pBSelect = document.getElementById('comparePlayerB');
  const trendSelect = document.getElementById('trendPlayer');
  
  players.forEach((p, idx) => {
    // Populate Player A (default first)
    const optA = document.createElement('option');
    optA.value = p.id;
    optA.textContent = `${p.name} (${p.team})`;
    pASelect.appendChild(optA);
    
    // Populate Player B (default second)
    const optB = document.createElement('option');
    optB.value = p.id;
    optB.textContent = `${p.name} (${p.team})`;
    if (idx === 1) optB.selected = true;
    pBSelect.appendChild(optB);

    // Populate Career trends select
    const optC = document.createElement('option');
    optC.value = p.id;
    optC.textContent = p.name;
    trendSelect.appendChild(optC);
  });

  // Watch selectors to re-draw charts
  document.getElementById('comparePlayerA').addEventListener('change', renderComparisonTab);
  document.getElementById('comparePlayerB').addEventListener('change', renderComparisonTab);
  document.getElementById('compareFormat').addEventListener('change', renderComparisonTab);
  
  document.getElementById('trendPlayer').addEventListener('change', renderCareerTab);
  document.getElementById('trendFormat').addEventListener('change', renderCareerTab);
}

/* ==========================================
   TAB 1: LIVE MATCH SIMULATION & PREDICTIONS
   ========================================== */

/**
 * @statement [Statement 2: Monumental Shifts]
 * @description Initializes momentum line graph using Chart.js.
 * @inputs {None}
 * @outputs {None}
 */
function initMomentumChart() {
  const ctx = document.getElementById('momentumChart').getContext('2d');
  
  momentumChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Start'],
      datasets: [{
        label: 'India Win Probability (%)',
        data: [50],
        borderColor: '#06b6d4',
        backgroundColor: 'rgba(6, 182, 212, 0.1)',
        fill: true,
        tension: 0.3,
        borderWidth: 3,
        pointBackgroundColor: '#06b6d4',
        pointRadius: 2,
        pointHoverRadius: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          min: 0,
          max: 100,
          grid: { color: 'rgba(255, 255, 255, 0.05)' },
          ticks: { color: '#9ca3af' }
        },
        x: {
          grid: { display: false },
          ticks: { color: '#9ca3af' }
        }
      },
      plugins: {
        legend: { display: false }
      }
    }
  });
}

/**
 * @statement [Statement 2: Monumental Shifts]
 * @description Controls the live simulator buttons (Next Ball, Play, Reset).
 * @inputs {None}
 * @outputs {None}
 */
function initSimulationControls() {
  const stepBtn = document.getElementById('simStepBtn');
  const playBtn = document.getElementById('simPlayBtn');
  const resetBtn = document.getElementById('simResetBtn');

  stepBtn.addEventListener('click', () => {
    simulateNextBall();
  });

  playBtn.addEventListener('click', () => {
    if (simInterval) {
      // Pause
      clearInterval(simInterval);
      simInterval = null;
      playBtn.innerHTML = '<i class="fa-solid fa-play"></i> Play Simulation';
      playBtn.className = "btn btn-primary";
    } else {
      // Start
      playBtn.innerHTML = '<i class="fa-solid fa-pause"></i> Pause';
      playBtn.className = "btn btn-secondary";
      simInterval = setInterval(() => {
        simulateNextBall();
      }, 900);
    }
  });

  resetBtn.addEventListener('click', () => {
    resetSimulation();
  });

  // Load first state
  updateLiveMatchUI();
}

/**
 * @statement [Statement 2: Monumental Shifts]
 * @description Advances the active match simulation by one ball, running predictions and updating visuals.
 * @inputs {None}
 * @outputs {None}
 */
function simulateNextBall() {
  if (currentBallIndex >= liveMatchData.balls.length - 1) {
    // End of match
    if (simInterval) {
      clearInterval(simInterval);
      simInterval = null;
      document.getElementById('simPlayBtn').innerHTML = '<i class="fa-solid fa-play"></i> Play Simulation';
      document.getElementById('simPlayBtn').className = "btn btn-primary";
    }
    return;
  }

  currentBallIndex++;
  const ballData = liveMatchData.balls[currentBallIndex];
  
  // Update UI Elements
  updateLiveMatchUI();
  
  // Calculate predictions & update charts
  updatePredictionsAndMomentum(ballData);
}

/**
 * @statement [Statement 2: Monumental Shifts]
 * @description Resets the match state to before the chase started.
 * @inputs {None}
 * @outputs {None}
 */
function resetSimulation() {
  if (simInterval) {
    clearInterval(simInterval);
    simInterval = null;
  }
  currentBallIndex = -1;
  document.getElementById('simPlayBtn').innerHTML = '<i class="fa-solid fa-play"></i> Play Simulation';
  document.getElementById('simPlayBtn').className = "btn btn-primary";
  
  // Clear chart
  momentumChart.data.labels = ['Start'];
  momentumChart.data.datasets[0].data = [50];
  momentumChart.update();

  updateLiveMatchUI();
  
  // Force clean leaderboard
  renderLeaderboard();
}

/**
 * @statement [Statement 5: Predictions]
 * @description Computes predictions and updates live win probability metrics and momentum line graphs.
 * @inputs {Object} ballData - Active ball record properties.
 * @outputs {None}
 */
function updatePredictionsAndMomentum(ballData) {
  // 1. Core score predictions from analytics engine
  const ballsCount = (ballData.over * 6) + ballData.ball;
  const pred = predictFinalScore(
    ballData.cumulativeRuns,
    ballsCount,
    ballData.cumulativeWickets,
    liveMatchData.details.target,
    'T20'
  );

  // Update UI texts
  document.getElementById('projectedScoreText').textContent = pred.projectedScore;
  document.getElementById('requiredRateText').textContent = `${pred.requiredRate} rpo`;
  
  document.getElementById('winProbINDText').textContent = `${pred.winProbIND}%`;
  document.getElementById('winProbAUSText').textContent = `${pred.winProbAUS}%`;

  document.getElementById('winProbBarIND').style.width = `${pred.winProbIND}%`;
  document.getElementById('winProbBarAUS').style.width = `${pred.winProbAUS}%`;

  // 2. Chart.js momentum line update
  const label = `${ballData.over}.${ballData.ball}`;
  momentumChart.data.labels.push(label);
  
  // Highlight wickets in the line data
  const pointBg = ballData.isWicket ? '#ef4444' : '#06b6d4';
  const pointRad = ballData.isWicket ? 8 : 2;
  
  momentumChart.data.datasets[0].data.push(ballData.prIND);
  momentumChart.update();

  // 3. Render real-time actionable insights
  const liveMatchState = {
    runs: ballData.cumulativeRuns,
    balls: ballsCount,
    wickets: ballData.cumulativeWickets
  };
  const insights = generateActionableInsights(liveMatchState, pred);
  renderInsightsList(insights);

  // 4. Grade active prediction contest scores
  renderLeaderboard();
}

/**
 * @statement [Statement 1: Insights]
 * @description Renders human-friendly insights cards on the live match side panel.
 * @inputs {Array} insights - List of alert messages.
 * @outputs {None}
 */
function renderInsightsList(insights) {
  const container = document.getElementById('insightsList');
  container.innerHTML = '';
  
  if (insights.length === 0) {
    container.innerHTML = '<p class="text-muted">No tactical shifts registered yet.</p>';
    return;
  }

  insights.forEach(ins => {
    const alert = document.createElement('div');
    alert.className = `alert-message ${ins.type}`;
    
    let iconClass = 'fa-circle-info';
    if (ins.type === 'warning') iconClass = 'fa-triangle-exclamation';
    if (ins.type === 'success') iconClass = 'fa-circle-check';
    if (ins.type === 'danger') iconClass = 'fa-circle-xmark';

    alert.innerHTML = `
      <i class="fa-solid ${iconClass}"></i>
      <span>${ins.text}</span>
    `;
    container.appendChild(alert);
  });
}

/**
 * @statement [Statement 2: Monumental Shifts]
 * @description Binds data from simulated ball variables directly into HTML cards.
 * @inputs {None}
 * @outputs {None}
 */
function updateLiveMatchUI() {
  const teamsEl = document.getElementById('liveTeams');
  const scoreEl = document.getElementById('liveScore');
  const oversEl = document.getElementById('liveOvers');
  const targetEl = document.getElementById('matchTarget');
  const batsmanEl = document.getElementById('liveBatsman');
  const bowlerEl = document.getElementById('liveBowler');
  const commentaryEl = document.getElementById('commentaryText');

  if (currentBallIndex === -1) {
    teamsEl.textContent = "IND vs AUS";
    scoreEl.textContent = "0/0";
    oversEl.textContent = "0.0";
    targetEl.textContent = `Target: ${liveMatchData.details.target} | Need 179 runs off 120 balls`;
    batsmanEl.textContent = "Rohit Sharma";
    bowlerEl.textContent = "Pat Cummins";
    commentaryEl.innerHTML = '<span class="text-muted">Match has not started. Click "Play Simulation" to begin the chase.</span>';
    
    document.getElementById('projectedScoreText').textContent = '-';
    document.getElementById('requiredRateText').textContent = '8.95 rpo';
    document.getElementById('winProbINDText').textContent = '50%';
    document.getElementById('winProbAUSText').textContent = '50%';
    document.getElementById('winProbBarIND').style.width = '50%';
    document.getElementById('winProbBarAUS').style.width = '50%';
    document.getElementById('insightsList').innerHTML = '<p class="text-muted">Awaiting match play...</p>';
    return;
  }

  const ball = liveMatchData.balls[currentBallIndex];
  
  teamsEl.textContent = liveMatchData.details.teams;
  scoreEl.textContent = `${ball.cumulativeRuns}/${ball.cumulativeWickets}`;
  oversEl.textContent = `${ball.over}.${ball.ball}`;

  const runsNeeded = liveMatchData.details.target - ball.cumulativeRuns;
  const ballsRemaining = 120 - ((ball.over * 6) + ball.ball);
  
  if (runsNeeded <= 0) {
    targetEl.textContent = "INDIA WINS! Target chased successfully.";
  } else if (ballsRemaining <= 0) {
    targetEl.textContent = `Match Finished. Australia wins by ${runsNeeded - 1} runs.`;
  } else {
    targetEl.textContent = `Target: ${liveMatchData.details.target} | Need ${runsNeeded} runs off ${ballsRemaining} balls`;
  }

  batsmanEl.textContent = ball.batsman;
  bowlerEl.textContent = ball.bowler;
  
  // Custom commentary highlight
  if (ball.isWicket) {
    commentaryEl.innerHTML = `<span class="badge badge-danger">WICKET!</span> <strong style="color: #ef4444;">${ball.comment}</strong>`;
  } else if (ball.runs === 4 || ball.runs === 6) {
    commentaryEl.innerHTML = `<span class="badge badge-success">${ball.runs} RUNS!</span> <strong style="color: #10b981;">${ball.comment}</strong>`;
  } else {
    commentaryEl.textContent = ball.comment;
  }
}

/* ==========================================
   TAB 2: PREDICTION COMPETITION LOGIC
   ========================================== */

/**
 * @statement [Statement 7: Prediction Competition]
 * @description Registers user prediction form submit clicks and locks the predictions list.
 * @inputs {None}
 * @outputs {None}
 */
function initPredictionsForm() {
  const form = document.getElementById('predictionsForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    userPredictions.q1 = form.elements['pq_q1'].value;
    userPredictions.q2 = form.elements['pq_q2'].value;
    userPredictions.q3 = form.elements['pq_q3'].value;
    userPredictions.q4 = form.elements['pq_q4'].value;
    userPredictions.q5 = form.elements['pq_q5'].value;

    predictionsLocked = true;
    
    // Hide form buttons, show locked msg
    document.getElementById('submitPredictionsBtn').classList.add('hidden');
    document.getElementById('predictionsLockedMsg').classList.remove('hidden');

    // Run active leaderboard update
    renderLeaderboard();
  });
  
  // Load baseline leaderboard on startup
  renderLeaderboard();
}

/**
 * @statement [Statement 7: Prediction Competition]
 * @description Re-computes user predictions scores and ranks them against mock competitors, rendering the leaderboard.
 * @inputs {None}
 * @outputs {None}
 */
function renderLeaderboard() {
  const tbody = document.getElementById('leaderboardBody');
  tbody.innerHTML = '';

  const results = gradePredictions(
    userPredictions,
    currentBallIndex,
    liveMatchData.balls,
    predictionConfig.questions,
    predictionConfig.competitors
  );

  // Render leaderboard rows
  results.leaderboard.forEach((user, index) => {
    const tr = document.createElement('tr');
    if (user.isUser) {
      tr.className = 'user-row';
    }

    let rankClass = 'rank-other';
    if (index === 0) rankClass = 'rank-1';
    else if (index === 1) rankClass = 'rank-2';
    else if (index === 2) rankClass = 'rank-3';

    tr.innerHTML = `
      <td><span class="ranking-badge ${rankClass}">${index + 1}</span></td>
      <td>${user.name}</td>
      <td>${user.score - user.predictionsScored}</td>
      <td style="color: ${user.predictionsScored > 0 ? '#10b981' : '#9ca3af'};">+${user.predictionsScored}</td>
      <td><strong>${user.score}</strong></td>
    `;
    tbody.appendChild(tr);
  });

  // Render tracker badges
  const g = results.grading;
  
  const renderBadge = (id, val, text) => {
    const el = document.getElementById(id);
    if (!val) {
      el.textContent = "Live Chase...";
      el.style.color = '#f59e0b';
    } else {
      el.textContent = text || val;
      el.style.color = '#10b981';
    }
  };

  renderBadge('gradeQ1', g.q1);
  document.getElementById('gradeQ2').textContent = `${results.kohliRuns} runs (${g.q2 || 'Batting'})`;
  document.getElementById('gradeQ3').textContent = `${results.cumminsWickets} wkts (${g.q3 || 'Live'})`;
  renderBadge('gradeQ4', g.q4);
  renderBadge('gradeQ5', g.q5);
}

/* ==========================================
   TAB 3: PLAYER & TEAM COMPARISON GRAPH
   ========================================== */

/**
 * @statement [Statement 3: Comparison]
 * @description Compares selected players and renders their stats in a dynamic radar chart and home/away bar chart.
 * @inputs {None}
 * @outputs {None}
 */
function renderComparisonTab() {
  const idA = document.getElementById('comparePlayerA').value;
  const idB = document.getElementById('comparePlayerB').value;
  const format = document.getElementById('compareFormat').value;

  const playerA = players.find(p => p.id === idA);
  const playerB = players.find(p => p.id === idB);

  if (!playerA || !playerB) return;

  const compData = comparePlayers(playerA, playerB, format);

  // 1. Render/Update Radar Chart
  const radarCtx = document.getElementById('comparisonRadarChart').getContext('2d');
  
  if (radarChart) {
    radarChart.destroy();
  }

  radarChart = new Chart(radarCtx, {
    type: 'radar',
    data: {
      labels: compData.chartData.labels,
      datasets: [
        {
          label: compData.chartData.datasets[0].label,
          data: compData.chartData.datasets[0].data,
          borderColor: '#06b6d4',
          backgroundColor: 'rgba(6, 182, 212, 0.2)',
          pointBackgroundColor: '#06b6d4',
          borderWidth: 2
        },
        {
          label: compData.chartData.datasets[1].label,
          data: compData.chartData.datasets[1].data,
          borderColor: '#8b5cf6',
          backgroundColor: 'rgba(139, 92, 246, 0.2)',
          pointBackgroundColor: '#8b5cf6',
          borderWidth: 2
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        r: {
          angleLines: { color: 'rgba(255, 255, 255, 0.05)' },
          grid: { color: 'rgba(255, 255, 255, 0.05)' },
          pointLabels: { color: '#9ca3af', font: { size: 10 } },
          ticks: { display: false },
          min: 0,
          max: 100
        }
      },
      plugins: {
        legend: { labels: { color: '#f3f4f6' } }
      }
    }
  });

  // 2. Render Home vs Outside Turf stats chart
  const turfData = getPlayerTurfStats(playerA, format);
  const turfCtx = document.getElementById('turfBarChart').getContext('2d');

  if (turfBarChart) {
    turfBarChart.destroy();
  }

  turfBarChart = new Chart(turfCtx, {
    type: 'bar',
    data: {
      labels: turfData.chartData.labels,
      datasets: [
        {
          label: `Home Turf (${playerA.name})`,
          data: turfData.chartData.datasets[0].data,
          backgroundColor: '#06b6d4',
          borderRadius: 4
        },
        {
          label: `Outside Turf (${playerA.name})`,
          data: turfData.chartData.datasets[1].data,
          backgroundColor: 'rgba(6, 182, 212, 0.4)',
          borderRadius: 4
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: { grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: '#9ca3af' } },
        x: { grid: { display: false }, ticks: { color: '#9ca3af' } }
      },
      plugins: {
        legend: { labels: { color: '#f3f4f6' } }
      }
    }
  });

  // Update small side text cards [Statement 9]
  const turfBData = getPlayerTurfStats(playerB, format);
  
  document.getElementById('turfPlayerAName').textContent = playerA.name;
  document.getElementById('turfPlayerAHomeAvg').textContent = `${turfData.home.avg} (SR ${turfData.home.strikeRate})`;
  document.getElementById('turfPlayerAOutsideAvg').textContent = `${turfData.outside.avg} (SR ${turfData.outside.strikeRate})`;

  document.getElementById('turfPlayerBName').textContent = playerB.name;
  document.getElementById('turfPlayerBHomeAvg').textContent = `${turfBData.home.avg} (SR ${turfBData.home.strikeRate})`;
  document.getElementById('turfPlayerBOutsideAvg').textContent = `${turfBData.outside.avg} (SR ${turfBData.outside.strikeRate})`;
}

/* ==========================================
   TAB 4: MULTI-FORMAT 10-YEAR CAREER GRAPH
   ========================================== */

/**
 * @statement [Statement 8: Multi-Format Career Analyzer]
 * @description Extracts a player's 10-year careers metrics, renders line graphs, and aggregates historical runs and wickets metrics.
 * @inputs {None}
 * @outputs {None}
 */
function renderCareerTab() {
  const id = document.getElementById('trendPlayer').value;
  const format = document.getElementById('trendFormat').value;

  const player = players.find(p => p.id === id);
  if (!player) return;

  const stats = getPlayerFormatCareerStats(player, format);

  const lineCtx = document.getElementById('careerLineChart').getContext('2d');
  
  if (careerLineChart) {
    careerLineChart.destroy();
  }

  // Calculate Aggregates
  const totalRuns = stats.runs.reduce((s, x) => s + x, 0);
  const totalWickets = stats.wickets.reduce((s, x) => s + x, 0);
  const avgSR = parseFloat((stats.strikeRates.reduce((s, x) => s + x, 0) / stats.strikeRates.length).toFixed(1));
  const maxAvg = Math.max(...stats.averages);

  document.getElementById('careerTotalRuns').textContent = totalRuns;
  document.getElementById('careerTotalWickets').textContent = totalWickets;
  document.getElementById('careerAvgSR').textContent = format === 't20' ? `${avgSR} (SR)` : `${avgSR} (SR)`;
  document.getElementById('careerMaxAvg').textContent = `${maxAvg.toFixed(1)} Avg`;

  careerLineChart = new Chart(lineCtx, {
    type: 'line',
    data: {
      labels: stats.years,
      datasets: [
        {
          label: 'Runs Scored',
          data: stats.runs,
          borderColor: '#06b6d4',
          borderWidth: 3,
          yAxisID: 'yRuns',
          tension: 0.2
        },
        {
          label: 'Wickets Taken',
          data: stats.wickets,
          borderColor: '#8b5cf6',
          borderWidth: 2,
          borderDash: [5, 5],
          yAxisID: 'yWkts',
          tension: 0.2
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yRuns: {
          type: 'linear',
          position: 'left',
          grid: { color: 'rgba(255, 255, 255, 0.05)' },
          ticks: { color: '#06b6d4' },
          title: { display: true, text: 'Runs', color: '#06b6d4' }
        },
        yWkts: {
          type: 'linear',
          position: 'right',
          grid: { display: false },
          ticks: { color: '#8b5cf6' },
          title: { display: true, text: 'Wickets', color: '#8b5cf6' }
        },
        x: {
          ticks: { color: '#9ca3af' }
        }
      },
      plugins: {
        legend: { labels: { color: '#f3f4f6' } }
      }
    }
  });
}

/* ==========================================
   TAB 5: LONG-TERM TEAM DISCOVERY
   ========================================== */

/**
 * @statement [Statement 4: Long-Term Discovery]
 * @description Populates the historical match logs and parses streak analysis points from the database.
 * @inputs {None}
 * @outputs {None}
 */
function renderTeamDiscoveryTab() {
  // Past matches score logs
  const listEl = document.getElementById('pastScoresList');
  listEl.innerHTML = '';
  
  pastMatches.forEach(pm => {
    const item = document.createElement('div');
    item.className = 'past-score-item';
    item.innerHTML = `
      <h5>${pm.teams} (${pm.format})</h5>
      <p class="score-line">${pm.score}</p>
      <p class="summary">${pm.result} | Highlights: ${pm.highlights}</p>
    `;
    listEl.appendChild(item);
  });

  // Automated discovery analytics
  const discovery = analyzeStreaksAndRecords(players, pastMatches);
  const notesContainer = document.getElementById('discoveryNotesList');
  notesContainer.innerHTML = '';

  discovery.teamDiscovery.forEach(note => {
    const card = document.createElement('div');
    card.className = 'discovery-note-card';
    card.innerHTML = `
      <h5>${note.key}</h5>
      <p style="color: #fff; font-weight: 600; margin-bottom: 0.2rem;">${note.stat}</p>
      <p>${note.desc}</p>
    `;
    notesContainer.appendChild(card);
  });
}

/* ==========================================
   TAB 6: FANTASY ADVISOR SQUAD & PRICING
   ========================================== */

/**
 * @statement [Statement 6: Fantasy Guidance]
 * @description Generates the optimized Dream11 fantasy squad recommendations and prices list.
 * @inputs {None}
 * @outputs {None}
 */
function renderFantasyAdvisorTab() {
  const guide = calculateFantasyScore(players);

  // Set Captain choices
  document.getElementById('fantasyCaptainName').textContent = guide.captains[0].name;
  document.getElementById('fantasyCaptainDesc').textContent = guide.captains[0].recommendation;
  
  document.getElementById('fantasyVCName').textContent = guide.captains[1].name;
  document.getElementById('fantasyVCDesc').textContent = guide.captains[1].recommendation;

  // Set Core Recommended squad grids
  const squadContainer = document.getElementById('fantasySquadList');
  squadContainer.innerHTML = '';

  guide.optimalSquad.forEach(p => {
    const card = document.createElement('div');
    card.className = 'fantasy-squad-card';
    card.innerHTML = `
      <h5>${p.name}</h5>
      <p>${p.team} | ${p.role}</p>
      <span class="idx-score">${p.indexScore} idx</span>
    `;
    squadContainer.appendChild(card);
  });

  // Render ranking values table
  const tbody = document.getElementById('fantasyTableBody');
  tbody.innerHTML = '';

  guide.rankings.forEach(p => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${p.name}</strong></td>
      <td>${p.team}</td>
      <td>${p.role}</td>
      <td>${p.price}</td>
      <td>${p.form}</td>
      <td>${p.safety}</td>
      <td class="index-column">${p.indexScore}</td>
    `;
    tbody.appendChild(tr);
  });
}

/* ==========================================
   MASTER SEARCH BAR ENGINE LOGIC [Statement 10]
   ========================================== */

/**
 * @statement [Statement 10: Master Search & Filtering]
 * @description Binds search inputs and dropdown overlays to execute global queries in real-time.
 * @inputs {None}
 * @outputs {None}
 */
function initSearchEngine() {
  const searchInput = document.getElementById('masterSearchInput');
  const dropdown = document.getElementById('searchDropdown');
  const clearBtn = document.getElementById('searchClearBtn');

  // Input typing listener
  searchInput.addEventListener('input', () => {
    const val = searchInput.value;
    if (val.trim()) {
      clearBtn.style.display = 'block';
      const results = searchDatabase(val, players, pastMatches, upcomingMatches, liveMatchData);
      renderSearchResults(results);
    } else {
      clearBtn.style.display = 'none';
      dropdown.classList.add('hidden');
    }
  });

  // Clear button click listener
  clearBtn.addEventListener('click', () => {
    searchInput.value = '';
    clearBtn.style.display = 'none';
    dropdown.classList.add('hidden');
    searchInput.focus();
  });

  // Close search dropdown on click outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-container')) {
      dropdown.classList.add('hidden');
    }
  });

  // Expand when clicking into input if value exists
  searchInput.addEventListener('focus', () => {
    if (searchInput.value.trim()) {
      dropdown.classList.remove('hidden');
    }
  });
}

/**
 * @statement [Statement 10: Master Search & Filtering]
 * @description Populates the search results dropdown dynamically under correct headers.
 * @inputs {Object} results - List of filtered matches, players, upcoming schedules, and scores.
 * @outputs {None}
 */
function renderSearchResults(results) {
  const dropdown = document.getElementById('searchDropdown');
  dropdown.innerHTML = '';

  const hasPlayers = results.players.length > 0;
  const hasMatches = results.matches.length > 0;
  const hasUpcoming = results.upcoming.length > 0;
  const hasScores = results.scores.length > 0;

  if (!hasPlayers && !hasMatches && !hasUpcoming && !hasScores) {
    dropdown.innerHTML = '<div class="search-no-results">No matches, players, or schedules found.</div>';
    dropdown.classList.remove('hidden');
    return;
  }

  // Helper to build list item
  const buildItem = (title, subtitle, clickHandler) => {
    const item = document.createElement('div');
    item.className = 'search-item';
    item.innerHTML = `
      <span class="item-title">${title}</span>
      <span class="item-subtitle">${subtitle}</span>
    `;
    item.addEventListener('click', clickHandler);
    return item;
  };

  // 1. Players Section
  if (hasPlayers) {
    const header = document.createElement('div');
    header.className = 'search-section-header';
    header.textContent = 'Players';
    dropdown.appendChild(header);

    results.players.forEach(p => {
      const row = buildItem(p.name, p.desc, () => {
        // Route to comparison, select this player as Player A
        switchTab('player-comparison');
        document.getElementById('comparePlayerA').value = p.id;
        renderComparisonTab();
        
        // Also select on career trends tab
        document.getElementById('trendPlayer').value = p.id;
        renderCareerTab();

        dropdown.classList.add('hidden');
      });
      dropdown.appendChild(row);
    });
  }

  // 2. Live & Past Matches
  if (hasMatches) {
    const header = document.createElement('div');
    header.className = 'search-section-header';
    header.textContent = 'Match Reports';
    dropdown.appendChild(header);

    results.matches.forEach(m => {
      const row = buildItem(m.title, m.subtitle, () => {
        if (m.type === 'live') {
          switchTab('match-center');
        } else {
          switchTab('team-discovery');
        }
        dropdown.classList.add('hidden');
      });
      dropdown.appendChild(row);
    });
  }

  // 3. Upcoming matches
  if (hasUpcoming) {
    const header = document.createElement('div');
    header.className = 'search-section-header';
    header.textContent = 'Upcoming Fixtures';
    dropdown.appendChild(header);

    results.upcoming.forEach(u => {
      const row = buildItem(u.title, u.subtitle, () => {
        switchTab('team-discovery');
        dropdown.classList.add('hidden');
      });
      dropdown.appendChild(row);
    });
  }

  // 4. Scores of Live / Past
  if (hasScores) {
    const header = document.createElement('div');
    header.className = 'search-section-header';
    header.textContent = 'Scores';
    dropdown.appendChild(header);

    results.scores.forEach(s => {
      const row = buildItem(s.title, s.subtitle, () => {
        if (s.type === 'live') {
          switchTab('match-center');
        } else {
          switchTab('team-discovery');
        }
        dropdown.classList.add('hidden');
      });
      dropdown.appendChild(row);
    });
  }

  dropdown.classList.remove('hidden');
}

/**
 * @statement [Statement 1: Insights]
 * @description Runs a comprehensive browser-based diagnostic test suite to verify math logic and print color-coded results in the developer console.
 * @inputs {None}
 * @outputs {None}
 */
function runSelfDiagnostics() {
  console.log("%c[CricPulse Diagnostics] Starting automated verification...", "color: #06b6d4; font-weight: bold; font-size: 1.1em;");
  let passed = 0;
  let failed = 0;
  
  const test = (name, cond) => {
    if (cond) {
      console.log(`%c[PASS] ${name}`, "color: #10b981; font-weight: 500;");
      passed++;
    } else {
      console.error(`[FAIL] ${name}`);
      failed++;
    }
  };

  try {
    // 1. Prediction projections
    const p = predictFinalScore(100, 60, 3, 193, 'T20');
    test("Predictor: Score projection calculation", p.projectedScore >= 100);
    test("Predictor: Win probability range bounds", p.winProbIND > 0 && p.winProbIND < 100);
    test("Predictor: Required rate precision", p.requiredRate === "9.30");

    // 2. Momentum calculation
    const shifts = calculateMomentumShifts(liveMatchData.balls);
    test("Momentum: Detect swings and wickets", shifts.length > 0 && shifts[0].hasOwnProperty('swing'));

    // 3. Player compare radar
    const k = players.find(p => p.id === 'virat_kohli');
    const r = players.find(p => p.id === 'shubman_gill');
    const comp = comparePlayers(k, r, 't20');
    test("Comparison: Load radar dimensions", comp.chartData.datasets[0].data.length === 5);

    // 4. Career Trends
    const trends = getPlayerFormatCareerStats(k, 't20');
    test("Career: Load 10-year stats", trends.years.length === 10);

    // 5. Home/Away Turf
    const turf = getPlayerTurfStats(k, 't20');
    test("Turf: Extract Home/Outside conditions", turf.home.runs > 0 && turf.outside.runs > 0);

    // 6. Fantasy
    const f = calculateFantasyScore(players);
    test("Fantasy: Optimize 11 squad picks", f.optimalSquad.length > 0 && f.captains.length === 2);

    // 7. Search index
    const s = searchDatabase("Kohli", players, pastMatches, upcomingMatches, liveMatchData);
    test("Search: Query matching filter", s.players.length === 1 && s.players[0].name === "Virat Kohli");

    console.log(`%c[CricPulse Diagnostics] Completed: ${passed} passed, ${failed} failed.`, `color: ${failed === 0 ? '#10b981' : '#ef4444'}; font-weight: bold;`);
  } catch (err) {
    console.error("[CricPulse Diagnostics] Crash during test run:", err);
  }
}

let activeDataSource = 'sim';
let rssMatchesCache = [];

/**
 * @statement [Statement 5: Predictions]
 * @description Registers event listeners for match score source selector buttons (Simulated, RSS feed, and Custom editor).
 * @inputs {None}
 * @outputs {None}
 */
function initDataSourceSelector() {
  const simBtn = document.getElementById('srcSimBtn');
  const rssBtn = document.getElementById('srcRssBtn');
  const customBtn = document.getElementById('srcCustomBtn');
  
  const rssContainer = document.getElementById('rssSourceContainer');
  const customContainer = document.getElementById('customSourceContainer');
  const simControls = document.querySelector('.sim-controls');
  
  const setSrcActive = (activeBtn) => {
    [simBtn, rssBtn, customBtn].forEach(b => {
      b.classList.remove('btn-primary', 'active-src');
      b.classList.add('btn-secondary');
    });
    activeBtn.classList.remove('btn-secondary');
    activeBtn.classList.add('btn-primary', 'active-src');
  };

  simBtn.addEventListener('click', () => {
    setSrcActive(simBtn);
    rssContainer.classList.add('hidden');
    customContainer.classList.add('hidden');
    simControls.classList.remove('hidden');
    activeDataSource = 'sim';
    resetSimulation();
  });

  rssBtn.addEventListener('click', () => {
    setSrcActive(rssBtn);
    rssContainer.classList.remove('hidden');
    customContainer.classList.add('hidden');
    simControls.classList.add('hidden');
    activeDataSource = 'rss';
    fetchRSSLiveMatches();
  });

  customBtn.addEventListener('click', () => {
    setSrcActive(customBtn);
    rssContainer.classList.add('hidden');
    customContainer.classList.remove('hidden');
    simControls.classList.add('hidden');
    activeDataSource = 'custom';
    applyCustomScore();
  });

  // Watch RSS select changes
  document.getElementById('rssMatchesSelect').addEventListener('change', () => {
    applySelectedRSSMatch();
  });

  // Watch RSS refresh click
  document.getElementById('rssRefreshBtn').addEventListener('click', () => {
    fetchRSSLiveMatches();
  });

  // Custom score form submit
  document.getElementById('customScoreForm').addEventListener('submit', (e) => {
    e.preventDefault();
    applyCustomScore();
  });
}

/**
 * @statement [Statement 10: Master Search & Filtering]
 * @description Triggers the ESPN Cricinfo RSS parser to fetch active matches and populates the dropdown.
 * @inputs {None}
 * @outputs {None}
 */
function fetchRSSLiveMatches() {
  const select = document.getElementById('rssMatchesSelect');
  select.innerHTML = '<option value="">-- Fetching Live Matches... --</option>';
  
  fetchLiveRSSScores((err, list) => {
    if (err) {
      select.innerHTML = '<option value="">Error fetching scores. Click refresh.</option>';
      return;
    }
    
    rssMatchesCache = list;
    select.innerHTML = '';
    
    if (list.length === 0) {
      select.innerHTML = '<option value="">No live matches in progress currently.</option>';
      return;
    }
    
    list.forEach(m => {
      const opt = document.createElement('option');
      opt.value = m.id;
      opt.textContent = m.title;
      select.appendChild(opt);
    });
    
    applySelectedRSSMatch();
  });
}

/**
 * @statement [Statement 5: Predictions]
 * @description Extracts and processes the chosen RSS match's parsed scores to update predictions and win probability bars.
 * @inputs {None}
 * @outputs {None}
 */
function applySelectedRSSMatch() {
  const select = document.getElementById('rssMatchesSelect');
  const matchId = select.value;
  if (!matchId || rssMatchesCache.length === 0) return;
  
  const match = rssMatchesCache.find(m => m.id === matchId);
  if (!match) return;
  
  // Parse match details
  const parsed = parseRSSTitle(match.title + " - " + match.description);
  
  // Calculate balls bowled
  const oversWhole = Math.floor(parsed.overs);
  const oversFraction = Math.round((parsed.overs - oversWhole) * 10);
  const ballsCount = (oversWhole * 6) + Math.min(6, oversFraction);

  // Run predictive analysis
  const pred = predictFinalScore(parsed.runs, ballsCount, parsed.wickets, parsed.target, 'T20');

  // Update Scoreboard UI
  document.getElementById('liveTeams').textContent = parsed.title;
  document.getElementById('liveScore').textContent = `${parsed.runs}/${parsed.wickets}`;
  document.getElementById('liveOvers').textContent = parsed.overs.toFixed(1);
  
  const runsNeeded = parsed.target - parsed.runs;
  const ballsRemaining = Math.max(0, 120 - ballsCount);
  
  const targetEl = document.getElementById('matchTarget');
  if (runsNeeded <= 0) {
    targetEl.textContent = `${parsed.battingTeam} WINS! Target chased successfully.`;
  } else if (ballsRemaining <= 0) {
    targetEl.textContent = `Match Finished. ${parsed.bowlingTeam} wins.`;
  } else {
    targetEl.textContent = `Target: ${parsed.target} | Need ${runsNeeded} runs off ${ballsRemaining} balls`;
  }

  document.getElementById('liveBatsman').textContent = `${parsed.battingTeam} Batting`;
  document.getElementById('liveBowler').textContent = `${parsed.bowlingTeam} Bowling`;
  
  document.getElementById('commentaryText').innerHTML = `
    <span class="badge badge-info">ESPN Live Sync</span>
    <strong>${match.description}</strong>
  `;

  // Update projections & win probability
  document.getElementById('projectedScoreText').textContent = pred.projectedScore;
  document.getElementById('requiredRateText').textContent = `${pred.requiredRate} rpo`;
  
  document.getElementById('winProbINDText').textContent = `${pred.winProbIND}%`;
  document.getElementById('winProbAUSText').textContent = `${pred.winProbAUS}%`;

  document.getElementById('winProbBarIND').style.width = `${pred.winProbIND}%`;
  document.getElementById('winProbBarAUS').style.width = `${pred.winProbAUS}%`;

  // Draw a static momentum line matching this live score point
  momentumChart.data.labels = ['Start', `${parsed.overs.toFixed(1)}`];
  momentumChart.data.datasets[0].data = [50, pred.winProbIND];
  momentumChart.update();

  // Actionable Insights
  const liveState = { runs: parsed.runs, balls: ballsCount, wickets: parsed.wickets };
  const insights = generateActionableInsights(liveState, pred);
  renderInsightsList(insights);
}

/**
 * @statement [Statement 5: Predictions]
 * @description Reads user inputs in the Custom Score Editor to generate instant sports analytics metrics.
 * @inputs {None}
 * @outputs {None}
 */
function applyCustomScore() {
  const title = document.getElementById('custTitle').value;
  const target = parseInt(document.getElementById('custTarget').value);
  const runs = parseInt(document.getElementById('custRuns').value);
  const wickets = parseInt(document.getElementById('custWickets').value);
  const oversRaw = parseFloat(document.getElementById('custOvers').value);

  // Convert overs
  const oversWhole = Math.floor(oversRaw);
  const oversFraction = Math.round((oversRaw - oversWhole) * 10);
  const ballsCount = (oversWhole * 6) + Math.min(6, oversFraction);

  // Run predictive analysis
  const pred = predictFinalScore(runs, ballsCount, wickets, target, 'T20');

  // Update Scoreboard UI
  document.getElementById('liveTeams').textContent = title;
  document.getElementById('liveScore').textContent = `${runs}/${wickets}`;
  document.getElementById('liveOvers').textContent = oversRaw.toFixed(1);
  
  const runsNeeded = target - runs;
  const ballsRemaining = Math.max(0, 120 - ballsCount);
  
  const targetEl = document.getElementById('matchTarget');
  if (runsNeeded <= 0) {
    targetEl.textContent = `Chasing Team WINS! Target chased successfully.`;
  } else if (ballsRemaining <= 0) {
    targetEl.textContent = `Match Finished. Defending Team wins by ${runsNeeded - 1} runs.`;
  } else {
    targetEl.textContent = `Target: ${target} | Need ${runsNeeded} runs off ${ballsRemaining} balls`;
  }

  document.getElementById('liveBatsman').textContent = "Striker (Custom)";
  document.getElementById('liveBowler').textContent = "Bowler (Custom)";
  
  document.getElementById('commentaryText').innerHTML = `
    <span class="badge badge-success">Custom Editor Mode</span>
    Calculated analytics for <strong>${title}</strong> matching user specifications.
  `;

  // Update projections & win probability
  document.getElementById('projectedScoreText').textContent = pred.projectedScore;
  document.getElementById('requiredRateText').textContent = `${pred.requiredRate} rpo`;
  
  document.getElementById('winProbINDText').textContent = `${pred.winProbIND}%`;
  document.getElementById('winProbAUSText').textContent = `${pred.winProbAUS}%`;

  document.getElementById('winProbBarIND').style.width = `${pred.winProbIND}%`;
  document.getElementById('winProbBarAUS').style.width = `${pred.winProbAUS}%`;

  // Draw momentum line
  momentumChart.data.labels = ['Start', `${oversRaw.toFixed(1)}`];
  momentumChart.data.datasets[0].data = [50, pred.winProbIND];
  momentumChart.update();

  // Actionable Insights
  const liveState = { runs: runs, balls: ballsCount, wickets: wickets };
  const insights = generateActionableInsights(liveState, pred);
  renderInsightsList(insights);
}


