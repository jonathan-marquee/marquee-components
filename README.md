# Marquee Components

React component library for **Marquee Player 360 Hub** - Football analytics visualizations.

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)

## Components

| Component | Description |
|-----------|-------------|
| `PlayerRadarChart` | Spider/radar chart for player attributes comparison |
| `FootballPitch` | Football pitch with shot map and heatmap overlays |
| `PassNetwork` | Pass visualization with progressive passes highlighted |
| `PerformanceScatterPlot` | Scatter plot for comparing player metrics |
| `SeasonProgressionChart` | Line chart for tracking season performance |
| `DefensiveActionsMap` | Pitch map showing tackles, interceptions, blocks |

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Usage

```tsx
import { PlayerRadarChart, FootballPitch, SeasonProgressionChart } from './components';

// Radar Chart
<PlayerRadarChart
  data={playerAttributes}
  comparisonData={leagueAverage}
  playerName="Martin Baturina"
  showComparison={true}
  size="large"
/>

// Shot Map
<FootballPitch
  shots={shotData}
  width={600}
  height={400}
  showFullPitch={false}
  title="Shot Map"
/>

// Season Chart
<SeasonProgressionChart
  data={seasonData}
  title="Season Progression"
  showExpected={true}
  metrics={['goals', 'assists', 'xG', 'xA']}
/>
```

## Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Recharts** - Charts (Radar, Line, Scatter)
- **Canvas API** - Football pitch visualizations
- **Vite** - Build tool

## Component Props

### PlayerRadarChart

| Prop | Type | Description |
|------|------|-------------|
| `data` | `RadarDataPoint[]` | Player attribute data |
| `comparisonData` | `RadarDataPoint[]` | Optional comparison data |
| `playerName` | `string` | Player name for legend |
| `showComparison` | `boolean` | Show comparison overlay |
| `size` | `'small' \| 'medium' \| 'large'` | Chart size |

### FootballPitch

| Prop | Type | Description |
|------|------|-------------|
| `shots` | `ShotData[]` | Shot data with xG and outcomes |
| `heatmapPoints` | `HeatmapPoint[]` | Heatmap intensity points |
| `width` | `number` | Canvas width |
| `height` | `number` | Canvas height |
| `showFullPitch` | `boolean` | Show full or half pitch |
| `theme` | `'dark' \| 'light'` | Color theme |

### SeasonProgressionChart

| Prop | Type | Description |
|------|------|-------------|
| `data` | `SeasonData[]` | Monthly performance data |
| `showExpected` | `boolean` | Show xG/xA lines |
| `metrics` | `string[]` | Which metrics to display |
| `height` | `number` | Chart height |

## Mock Data

Sample data is provided in `src/data/mockData.ts` for testing.

## License

MIT © Marquee
