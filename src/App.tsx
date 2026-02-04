import { useState } from 'react';
import {
  PlayerRadarChart,
  FootballPitch,
  PassNetwork,
  PerformanceScatterPlot,
  SeasonProgressionChart,
  DefensiveActionsMap,
} from './components';
import {
  attackerRadarData,
  midfielderRadarData,
  defenderRadarData,
  goalkeeperRadarData,
  shotMapData,
  passNetworkData,
  heatmapData,
  scatterPlotData,
  seasonProgressionData,
  defensiveActionsData,
  martinBaturina,
} from './data/mockData';
import './App.css';

type ComponentType = 'radar' | 'shots' | 'heatmap' | 'passes' | 'scatter' | 'season' | 'defensive';

function App() {
  const [activeComponent, setActiveComponent] = useState<ComponentType>('radar');
  const [radarPosition, setRadarPosition] = useState<'attacker' | 'midfielder' | 'defender' | 'goalkeeper'>('attacker');

  const radarDataMap = {
    attacker: attackerRadarData,
    midfielder: midfielderRadarData,
    defender: defenderRadarData,
    goalkeeper: goalkeeperRadarData,
  };

  const components: { id: ComponentType; label: string; icon: string }[] = [
    { id: 'radar', label: 'Radar Chart', icon: '📊' },
    { id: 'shots', label: 'Shot Map', icon: '⚽' },
    { id: 'heatmap', label: 'Heat Map', icon: '🔥' },
    { id: 'passes', label: 'Pass Network', icon: '↗️' },
    { id: 'scatter', label: 'Scatter Plot', icon: '📈' },
    { id: 'season', label: 'Season Chart', icon: '📅' },
    { id: 'defensive', label: 'Defensive Map', icon: '🛡️' },
  ];

  return (
    <div className="app">
      <header className="header">
        <div className="logo">
          <span className="logo-icon">⚽</span>
          <h1>Marquee Components</h1>
        </div>
        <p className="subtitle">Player 360 Hub Visualization Library</p>
      </header>

      <nav className="nav">
        {components.map((comp) => (
          <button
            key={comp.id}
            className={`nav-button ${activeComponent === comp.id ? 'active' : ''}`}
            onClick={() => setActiveComponent(comp.id)}
          >
            <span className="nav-icon">{comp.icon}</span>
            <span className="nav-label">{comp.label}</span>
          </button>
        ))}
      </nav>

      <main className="main">
        {activeComponent === 'radar' && (
          <section className="component-section">
            <div className="section-header">
              <h2>Player Radar Chart</h2>
              <p>Compare player attributes across different metrics</p>
            </div>
            
            <div className="position-selector">
              {(['attacker', 'midfielder', 'defender', 'goalkeeper'] as const).map((pos) => (
                <button
                  key={pos}
                  className={`position-button ${radarPosition === pos ? 'active' : ''}`}
                  onClick={() => setRadarPosition(pos)}
                >
                  {pos.charAt(0).toUpperCase() + pos.slice(1)}
                </button>
              ))}
            </div>
            
            <div className="chart-container">
              <PlayerRadarChart
                data={radarDataMap[radarPosition]}
                comparisonData={radarDataMap[radarPosition].map((d) => ({
                  ...d,
                  value: Math.max(30, d.value - 15 + Math.random() * 10),
                }))}
                playerName={martinBaturina.name}
                comparisonName="League Average"
                showComparison={true}
                size="large"
              />
            </div>
            
            <div className="chart-info">
              <h3>Usage</h3>
              <pre>{`<PlayerRadarChart
  data={playerAttributes}
  comparisonData={leagueAverage}
  playerName="Martin Baturina"
  showComparison={true}
  size="large"
/>`}</pre>
            </div>
          </section>
        )}

        {activeComponent === 'shots' && (
          <section className="component-section">
            <div className="section-header">
              <h2>Shot Map</h2>
              <p>Visualize shot locations with xG-based sizing and outcome colors</p>
            </div>
            
            <div className="chart-container wide">
              <FootballPitch
                shots={shotMapData}
                width={600}
                height={400}
                showFullPitch={false}
                title="Shot Map - Season 2023/24"
              />
            </div>
            
            <div className="chart-info">
              <h3>Usage</h3>
              <pre>{`<FootballPitch
  shots={shotData}
  width={600}
  height={400}
  showFullPitch={false}
  title="Shot Map"
/>`}</pre>
            </div>
          </section>
        )}

        {activeComponent === 'heatmap' && (
          <section className="component-section">
            <div className="section-header">
              <h2>Heat Map</h2>
              <p>Show player positioning and activity zones on the pitch</p>
            </div>
            
            <div className="chart-container wide">
              <FootballPitch
                heatmapPoints={heatmapData}
                width={600}
                height={400}
                showFullPitch={true}
                title="Position Heat Map"
              />
            </div>
            
            <div className="chart-info">
              <h3>Usage</h3>
              <pre>{`<FootballPitch
  heatmapPoints={heatmapData}
  width={600}
  height={400}
  showFullPitch={true}
  title="Position Heat Map"
/>`}</pre>
            </div>
          </section>
        )}

        {activeComponent === 'passes' && (
          <section className="component-section">
            <div className="section-header">
              <h2>Pass Network</h2>
              <p>Visualize passing patterns and progressive passes</p>
            </div>
            
            <div className="chart-container wide">
              <PassNetwork
                passes={passNetworkData}
                width={600}
                height={400}
                title="Pass Network - vs. Bayern Munich"
              />
            </div>
            
            <div className="chart-info">
              <h3>Usage</h3>
              <pre>{`<PassNetwork
  passes={passData}
  width={600}
  height={400}
  title="Pass Network"
  showProgressiveOnly={false}
/>`}</pre>
            </div>
          </section>
        )}

        {activeComponent === 'scatter' && (
          <section className="component-section">
            <div className="section-header">
              <h2>Performance Scatter Plot</h2>
              <p>Compare player performance metrics across the league</p>
            </div>
            
            <div className="chart-container wide">
              <PerformanceScatterPlot
                data={scatterPlotData}
                xAxisLabel="Expected Goals (xG)"
                yAxisLabel="Actual Goals"
                title="Goals vs xG Comparison"
                highlightPlayerId="1"
                showAverageLines={true}
              />
            </div>
            
            <div className="chart-info">
              <h3>Usage</h3>
              <pre>{`<PerformanceScatterPlot
  data={playerData}
  xAxisLabel="Expected Goals (xG)"
  yAxisLabel="Actual Goals"
  highlightPlayerId="player-1"
  showAverageLines={true}
/>`}</pre>
            </div>
          </section>
        )}

        {activeComponent === 'season' && (
          <section className="component-section">
            <div className="section-header">
              <h2>Season Progression Chart</h2>
              <p>Track performance metrics throughout the season</p>
            </div>
            
            <div className="chart-container wide">
              <SeasonProgressionChart
                data={seasonProgressionData}
                title="Season 2023/24 Progression"
                showExpected={true}
                height={350}
              />
            </div>
            
            <div className="chart-info">
              <h3>Usage</h3>
              <pre>{`<SeasonProgressionChart
  data={seasonData}
  title="Season Progression"
  showExpected={true}
  metrics={['goals', 'assists', 'xG', 'xA']}
/>`}</pre>
            </div>
          </section>
        )}

        {activeComponent === 'defensive' && (
          <section className="component-section">
            <div className="section-header">
              <h2>Defensive Actions Map</h2>
              <p>Visualize tackles, interceptions, blocks, and clearances</p>
            </div>
            
            <div className="chart-container wide">
              <DefensiveActionsMap
                actions={[
                  { x: 25, y: 40, type: 'tackle', success: true },
                  { x: 30, y: 55, type: 'interception', success: true },
                  { x: 35, y: 45, type: 'block', success: false },
                  { x: 20, y: 50, type: 'clearance', success: true },
                  { x: 40, y: 35, type: 'tackle', success: true },
                  { x: 28, y: 60, type: 'interception', success: false },
                  { x: 32, y: 48, type: 'block', success: true },
                  { x: 38, y: 42, type: 'tackle', success: true },
                  { x: 22, y: 55, type: 'clearance', success: true },
                  { x: 45, y: 50, type: 'interception', success: true },
                ]}
                heatmapPoints={defensiveActionsData}
                width={600}
                height={400}
                title="Defensive Actions - Season Total"
                showHeatmap={true}
              />
            </div>
            
            <div className="chart-info">
              <h3>Usage</h3>
              <pre>{`<DefensiveActionsMap
  actions={defensiveActions}
  heatmapPoints={heatmapData}
  width={600}
  height={400}
  title="Defensive Actions"
  showHeatmap={true}
/>`}</pre>
            </div>
          </section>
        )}
      </main>

      <footer className="footer">
        <p>Built for <strong>Marquee</strong> Player 360 Hub</p>
        <p className="tech">React + TypeScript + Recharts + Canvas</p>
      </footer>
    </div>
  );
}

export default App;
