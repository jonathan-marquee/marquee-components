import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts';

interface RadarDataPoint {
  attribute: string;
  value: number;
  fullMark: number;
  comparison?: number;
}

interface PlayerRadarChartProps {
  data: RadarDataPoint[];
  comparisonData?: RadarDataPoint[];
  playerName?: string;
  comparisonName?: string;
  primaryColor?: string;
  secondaryColor?: string;
  showComparison?: boolean;
  size?: 'small' | 'medium' | 'large';
}

const sizeMap = {
  small: { width: 250, height: 250 },
  medium: { width: 350, height: 350 },
  large: { width: 450, height: 450 },
};

export function PlayerRadarChart({
  data,
  comparisonData,
  playerName = 'Player',
  comparisonName = 'League Avg',
  primaryColor = '#00D4AA',
  secondaryColor = '#6366F1',
  showComparison = false,
  size = 'medium',
}: PlayerRadarChartProps) {
  // Merge data with comparison if provided
  const chartData = data.map((item, index) => ({
    ...item,
    comparison: comparisonData?.[index]?.value || 0,
  }));

  const dimensions = sizeMap[size];

  return (
    <div className="radar-chart-container" style={{ 
      background: 'linear-gradient(135deg, #14191E 0%, #1a2129 100%)',
      borderRadius: '12px',
      padding: '20px',
      border: '1px solid rgba(255,255,255,0.1)',
    }}>
      <ResponsiveContainer width="100%" height={dimensions.height}>
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
          <PolarGrid 
            stroke="rgba(255,255,255,0.15)" 
            strokeDasharray="3 3"
          />
          <PolarAngleAxis 
            dataKey="attribute" 
            tick={{ fill: '#9CA3AF', fontSize: 11 }}
            tickLine={{ stroke: 'rgba(255,255,255,0.1)' }}
          />
          <PolarRadiusAxis 
            angle={90} 
            domain={[0, 100]} 
            tick={{ fill: '#6B7280', fontSize: 9 }}
            tickCount={5}
            axisLine={false}
          />
          
          {showComparison && comparisonData && (
            <Radar
              name={comparisonName}
              dataKey="comparison"
              stroke={secondaryColor}
              fill={secondaryColor}
              fillOpacity={0.15}
              strokeWidth={2}
              dot={{ r: 3, fill: secondaryColor }}
            />
          )}
          
          <Radar
            name={playerName}
            dataKey="value"
            stroke={primaryColor}
            fill={primaryColor}
            fillOpacity={0.25}
            strokeWidth={2}
            dot={{ r: 4, fill: primaryColor }}
          />
          
          <Tooltip 
            contentStyle={{
              backgroundColor: '#1F2937',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
              color: '#fff',
            }}
            formatter={(value) => [`${value}%`, '']}
          />
          
          <Legend 
            wrapperStyle={{ color: '#9CA3AF', fontSize: 12 }}
            iconType="circle"
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PlayerRadarChart;
