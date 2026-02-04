import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  ZAxis,
  Cell,
} from 'recharts';

interface ScatterDataPoint {
  playerId: string;
  playerName: string;
  xValue: number;
  yValue: number;
  size?: number;
  color?: string;
}

interface PerformanceScatterPlotProps {
  data: ScatterDataPoint[];
  xAxisLabel?: string;
  yAxisLabel?: string;
  title?: string;
  highlightPlayerId?: string;
  showAverageLines?: boolean;
  theme?: 'dark' | 'light';
  height?: number;
}

export function PerformanceScatterPlot({
  data,
  xAxisLabel = 'xG',
  yAxisLabel = 'Goals',
  title,
  highlightPlayerId,
  showAverageLines = true,
  theme = 'dark',
  height = 350,
}: PerformanceScatterPlotProps) {
  const bgColor = theme === 'dark' ? '#14191E' : '#f3f4f6';
  const textColor = theme === 'dark' ? '#9CA3AF' : '#6B7280';
  const gridColor = theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';

  // Calculate averages for reference lines
  const avgX = data.reduce((sum, d) => sum + d.xValue, 0) / data.length;
  const avgY = data.reduce((sum, d) => sum + d.yValue, 0) / data.length;

  // Transform data for Recharts
  const chartData = data.map((d) => ({
    x: d.xValue,
    y: d.yValue,
    z: d.size || 10,
    name: d.playerName,
    id: d.playerId,
  }));

  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: any[] }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div style={{
          backgroundColor: theme === 'dark' ? '#1F2937' : '#fff',
          border: `1px solid ${gridColor}`,
          borderRadius: '8px',
          padding: '10px 14px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        }}>
          <p style={{ 
            color: theme === 'dark' ? '#fff' : '#1f2937',
            fontWeight: 600,
            marginBottom: '4px',
          }}>
            {data.name}
          </p>
          <p style={{ color: textColor, fontSize: '12px' }}>
            {xAxisLabel}: {data.x.toFixed(1)}
          </p>
          <p style={{ color: textColor, fontSize: '12px' }}>
            {yAxisLabel}: {data.y}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ 
      background: bgColor,
      borderRadius: '12px',
      padding: '20px',
      border: theme === 'dark' ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
    }}>
      {title && (
        <h3 style={{ 
          color: theme === 'dark' ? '#fff' : '#1f2937',
          fontSize: '14px',
          fontWeight: 600,
          marginBottom: '16px',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
        }}>
          {title}
        </h3>
      )}
      <ResponsiveContainer width="100%" height={height}>
        <ScatterChart margin={{ top: 20, right: 20, bottom: 40, left: 40 }}>
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke={gridColor}
            vertical={true}
            horizontal={true}
          />
          <XAxis 
            type="number" 
            dataKey="x" 
            name={xAxisLabel}
            tick={{ fill: textColor, fontSize: 11 }}
            axisLine={{ stroke: gridColor }}
            tickLine={{ stroke: gridColor }}
            label={{ 
              value: xAxisLabel, 
              position: 'bottom',
              fill: textColor,
              fontSize: 12,
              offset: 0,
            }}
          />
          <YAxis 
            type="number" 
            dataKey="y" 
            name={yAxisLabel}
            tick={{ fill: textColor, fontSize: 11 }}
            axisLine={{ stroke: gridColor }}
            tickLine={{ stroke: gridColor }}
            label={{ 
              value: yAxisLabel, 
              angle: -90, 
              position: 'insideLeft',
              fill: textColor,
              fontSize: 12,
            }}
          />
          <ZAxis type="number" dataKey="z" range={[60, 400]} />
          
          {showAverageLines && (
            <>
              <ReferenceLine 
                x={avgX} 
                stroke="#6366F1" 
                strokeDasharray="5 5" 
                strokeOpacity={0.6}
              />
              <ReferenceLine 
                y={avgY} 
                stroke="#6366F1" 
                strokeDasharray="5 5" 
                strokeOpacity={0.6}
              />
            </>
          )}
          
          <Tooltip content={<CustomTooltip />} />
          
          <Scatter 
            data={chartData} 
            fill="#00D4AA"
          >
            {chartData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`}
                fill={entry.id === highlightPlayerId ? '#00D4AA' : '#6366F1'}
                stroke={entry.id === highlightPlayerId ? '#fff' : 'none'}
                strokeWidth={entry.id === highlightPlayerId ? 2 : 0}
                fillOpacity={entry.id === highlightPlayerId ? 1 : 0.7}
              />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
      
      {showAverageLines && (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center',
          gap: '20px', 
          marginTop: '12px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ 
              width: '20px', 
              height: '2px', 
              backgroundColor: '#6366F1',
              opacity: 0.6,
            }} />
            <span style={{ color: textColor, fontSize: '11px' }}>
              League Average
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default PerformanceScatterPlot;
