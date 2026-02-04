// Mock data for Marquee Player 360 Hub components

export interface PlayerAttributes {
  attribute: string;
  value: number;
  fullMark: number;
}

export interface Player {
  id: string;
  name: string;
  position: string;
  team: string;
  nationality: string;
  age: number;
  marketValue: string;
  contractEnd: string;
  attributes: PlayerAttributes[];
}

export interface ShotData {
  x: number;
  y: number;
  xG: number;
  outcome: 'goal' | 'saved' | 'blocked' | 'off-target';
  minute: number;
  matchId: string;
}

export interface PassData {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  success: boolean;
  progressive: boolean;
  minute: number;
}

export interface HeatmapPoint {
  x: number;
  y: number;
  intensity: number;
}

export interface ScatterDataPoint {
  playerId: string;
  playerName: string;
  xValue: number;
  yValue: number;
  size?: number;
  color?: string;
}

export interface SeasonData {
  month: string;
  goals: number;
  assists: number;
  xG: number;
  xA: number;
  minutes: number;
}

// Martin Baturina mock data (based on Figma design)
export const martinBaturina: Player = {
  id: 'baturina-01',
  name: 'Martin Baturina',
  position: 'CAM',
  team: 'Dinamo Zagreb',
  nationality: 'Croatian',
  age: 22,
  marketValue: '€12M',
  contractEnd: 'Jun 2027',
  attributes: [
    { attribute: 'Pace', value: 78, fullMark: 100 },
    { attribute: 'Shooting', value: 72, fullMark: 100 },
    { attribute: 'Passing', value: 85, fullMark: 100 },
    { attribute: 'Dribbling', value: 84, fullMark: 100 },
    { attribute: 'Defending', value: 45, fullMark: 100 },
    { attribute: 'Physical', value: 65, fullMark: 100 },
  ],
};

// Radar chart data for different player positions
export const attackerRadarData: PlayerAttributes[] = [
  { attribute: 'Goals/90', value: 85, fullMark: 100 },
  { attribute: 'xG/90', value: 78, fullMark: 100 },
  { attribute: 'Shots/90', value: 72, fullMark: 100 },
  { attribute: 'Key Passes', value: 68, fullMark: 100 },
  { attribute: 'Dribbles', value: 82, fullMark: 100 },
  { attribute: 'Aerial', value: 55, fullMark: 100 },
];

export const midfielderRadarData: PlayerAttributes[] = [
  { attribute: 'Pass Acc.', value: 88, fullMark: 100 },
  { attribute: 'Progressive', value: 82, fullMark: 100 },
  { attribute: 'Tackles', value: 65, fullMark: 100 },
  { attribute: 'Interceptions', value: 58, fullMark: 100 },
  { attribute: 'Key Passes', value: 75, fullMark: 100 },
  { attribute: 'Dribbles', value: 70, fullMark: 100 },
];

export const defenderRadarData: PlayerAttributes[] = [
  { attribute: 'Tackles', value: 85, fullMark: 100 },
  { attribute: 'Interceptions', value: 78, fullMark: 100 },
  { attribute: 'Aerial', value: 82, fullMark: 100 },
  { attribute: 'Blocks', value: 75, fullMark: 100 },
  { attribute: 'Pass Acc.', value: 72, fullMark: 100 },
  { attribute: 'Progressive', value: 60, fullMark: 100 },
];

export const goalkeeperRadarData: PlayerAttributes[] = [
  { attribute: 'Save %', value: 78, fullMark: 100 },
  { attribute: 'xG Prevented', value: 72, fullMark: 100 },
  { attribute: 'Distribution', value: 68, fullMark: 100 },
  { attribute: 'Crosses', value: 65, fullMark: 100 },
  { attribute: 'Sweeping', value: 55, fullMark: 100 },
  { attribute: 'Penalties', value: 60, fullMark: 100 },
];

// Shot map data
export const shotMapData: ShotData[] = [
  { x: 88, y: 45, xG: 0.76, outcome: 'goal', minute: 23, matchId: 'match-1' },
  { x: 92, y: 52, xG: 0.45, outcome: 'saved', minute: 34, matchId: 'match-1' },
  { x: 78, y: 38, xG: 0.12, outcome: 'off-target', minute: 56, matchId: 'match-2' },
  { x: 85, y: 55, xG: 0.35, outcome: 'goal', minute: 67, matchId: 'match-2' },
  { x: 95, y: 48, xG: 0.82, outcome: 'saved', minute: 78, matchId: 'match-3' },
  { x: 72, y: 42, xG: 0.08, outcome: 'blocked', minute: 12, matchId: 'match-3' },
  { x: 90, y: 50, xG: 0.55, outcome: 'goal', minute: 89, matchId: 'match-4' },
  { x: 82, y: 58, xG: 0.22, outcome: 'off-target', minute: 45, matchId: 'match-4' },
  { x: 94, y: 47, xG: 0.68, outcome: 'saved', minute: 31, matchId: 'match-5' },
  { x: 76, y: 52, xG: 0.15, outcome: 'blocked', minute: 62, matchId: 'match-5' },
  { x: 91, y: 44, xG: 0.58, outcome: 'goal', minute: 75, matchId: 'match-6' },
  { x: 86, y: 56, xG: 0.32, outcome: 'off-target', minute: 18, matchId: 'match-6' },
];

// Pass data for pass network
export const passNetworkData: PassData[] = [
  { startX: 25, startY: 50, endX: 45, endY: 35, success: true, progressive: true, minute: 5 },
  { startX: 45, startY: 35, endX: 65, endY: 45, success: true, progressive: true, minute: 6 },
  { startX: 65, startY: 45, endX: 80, endY: 55, success: true, progressive: true, minute: 7 },
  { startX: 35, startY: 65, endX: 55, endY: 55, success: true, progressive: false, minute: 12 },
  { startX: 55, startY: 55, endX: 75, endY: 45, success: false, progressive: true, minute: 13 },
  { startX: 20, startY: 45, endX: 40, endY: 50, success: true, progressive: true, minute: 18 },
  { startX: 40, startY: 50, endX: 60, endY: 40, success: true, progressive: true, minute: 19 },
  { startX: 60, startY: 40, endX: 85, endY: 50, success: true, progressive: true, minute: 20 },
  { startX: 30, startY: 30, endX: 50, endY: 45, success: true, progressive: true, minute: 25 },
  { startX: 50, startY: 45, endX: 70, endY: 35, success: true, progressive: false, minute: 26 },
];

// Heatmap data
export const heatmapData: HeatmapPoint[] = [
  { x: 65, y: 45, intensity: 0.9 },
  { x: 70, y: 50, intensity: 0.85 },
  { x: 60, y: 55, intensity: 0.75 },
  { x: 75, y: 40, intensity: 0.7 },
  { x: 55, y: 48, intensity: 0.65 },
  { x: 68, y: 52, intensity: 0.8 },
  { x: 72, y: 38, intensity: 0.6 },
  { x: 58, y: 42, intensity: 0.55 },
  { x: 80, y: 50, intensity: 0.5 },
  { x: 62, y: 58, intensity: 0.45 },
  { x: 50, y: 50, intensity: 0.4 },
  { x: 45, y: 45, intensity: 0.35 },
  { x: 78, y: 55, intensity: 0.55 },
  { x: 66, y: 35, intensity: 0.5 },
  { x: 54, y: 52, intensity: 0.45 },
];

// Scatter plot data - xG vs Goals for multiple players
export const scatterPlotData: ScatterDataPoint[] = [
  { playerId: '1', playerName: 'Martin Baturina', xValue: 8.5, yValue: 10, size: 12 },
  { playerId: '2', playerName: 'Luka Modric', xValue: 5.2, yValue: 4, size: 10 },
  { playerId: '3', playerName: 'Mateo Kovacic', xValue: 3.8, yValue: 5, size: 8 },
  { playerId: '4', playerName: 'Josko Gvardiol', xValue: 2.1, yValue: 3, size: 6 },
  { playerId: '5', playerName: 'Bruno Petkovic', xValue: 12.3, yValue: 14, size: 14 },
  { playerId: '6', playerName: 'Andrej Kramaric', xValue: 15.6, yValue: 18, size: 16 },
  { playerId: '7', playerName: 'Lovro Majer', xValue: 6.8, yValue: 8, size: 10 },
  { playerId: '8', playerName: 'Mario Pasalic', xValue: 9.2, yValue: 7, size: 11 },
];

// Season progression data
export const seasonProgressionData: SeasonData[] = [
  { month: 'Aug', goals: 1, assists: 2, xG: 1.2, xA: 1.8, minutes: 270 },
  { month: 'Sep', goals: 3, assists: 1, xG: 2.5, xA: 1.2, minutes: 360 },
  { month: 'Oct', goals: 2, assists: 3, xG: 2.1, xA: 2.8, minutes: 340 },
  { month: 'Nov', goals: 4, assists: 2, xG: 3.2, xA: 2.1, minutes: 380 },
  { month: 'Dec', goals: 2, assists: 4, xG: 2.8, xA: 3.5, minutes: 350 },
  { month: 'Jan', goals: 3, assists: 2, xG: 2.6, xA: 2.2, minutes: 320 },
  { month: 'Feb', goals: 5, assists: 3, xG: 4.1, xA: 2.8, minutes: 390 },
  { month: 'Mar', goals: 2, assists: 5, xG: 2.4, xA: 4.2, minutes: 360 },
  { month: 'Apr', goals: 4, assists: 2, xG: 3.5, xA: 2.0, minutes: 370 },
  { month: 'May', goals: 3, assists: 4, xG: 3.0, xA: 3.6, minutes: 340 },
];

// Defensive actions data
export const defensiveActionsData: HeatmapPoint[] = [
  { x: 35, y: 45, intensity: 0.9 },
  { x: 30, y: 50, intensity: 0.85 },
  { x: 40, y: 55, intensity: 0.75 },
  { x: 25, y: 40, intensity: 0.7 },
  { x: 45, y: 48, intensity: 0.65 },
  { x: 32, y: 52, intensity: 0.8 },
  { x: 28, y: 38, intensity: 0.6 },
  { x: 42, y: 42, intensity: 0.55 },
  { x: 20, y: 50, intensity: 0.5 },
  { x: 38, y: 58, intensity: 0.45 },
];

// Player comparison data for multi-radar
export const playerComparisonData = [
  {
    player: 'Martin Baturina',
    'Goals/90': 75,
    'Assists/90': 82,
    'Key Passes': 85,
    'Dribbles': 78,
    'Tackles': 45,
    'Interceptions': 42,
  },
  {
    player: 'Comparison Avg',
    'Goals/90': 65,
    'Assists/90': 68,
    'Key Passes': 70,
    'Dribbles': 65,
    'Tackles': 55,
    'Interceptions': 52,
  },
];
