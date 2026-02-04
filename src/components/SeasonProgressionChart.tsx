import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Area,
  ComposedChart,
} from 'recharts';

interface SeasonData {
  month: string;
  goals: number;
  assists: number;
  xG: number;
  xA: number;
  minutes?: number;
}

interface SeasonProgressionChartProps {
  data: SeasonData[];
  title?: string;
  showExpected?: boolean;
  theme?: 'dark' | 'light';
  height?: number;
  metrics?: ('goals' | 'assists' | 'xG' | 'xA')[];
}

const metricConfig = {
  goals: { color: '#22C55E', label: 'Goals' },
  assists: { color: '#6366F1', label: 'Assists' },
  xG: { color: '#00D4AA', label: 'xG', dashed: true },
  xA: { color: '#F59E0B', label: 'xA', dashed: true },
};

export function SeasonProgressionChart({
  data,
  title,
  showExpected = true,
  theme = 'dark',
  height = 300,
  metrics = ['goals', 'assists', 'xG', 'xA'],
}: SeasonProgressionChartProps) {
  const bgColor = theme === 'dark' ? '#14191E' : '#f3f4f6';
  const textColor = theme === 'dark' ? '#9CA3AF' : '#6B7280';
  const gridColor = theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';

  // Filter metrics based on showExpected
  const displayMetrics = showExpected 
    ? metrics 
    : metrics.filter(m => !['xG', 'xA'].includes(m));

  const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: any[]; label?: string }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          backgroundColor: theme === 'dark' ? '#1F2937' : '#fff',
          border: `1px solid ${gridColor}`,
          borderRadius: '8px',
          padding: '12px 16px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        }}>
          <p style={{ 
            color: theme === 'dark' ? '#fff' : '#1f2937',
            fontWeight: 600,
            marginBottom: '8px',
            fontSize: '13px',
          }}>
            {label}
          </p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ 
              color: entry.color, 
              fontSize: '12px',
              display: 'flex',
              justifyContent: 'space-between',
              gap: '16px',
            }}>
              <span>{entry.name}:</span>
              <span style={{ fontWeight: 600 }}>{entry.value}</span>
            </p>
          ))}
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
        <ComposedChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="goalsGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22C55E" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#22C55E" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="assistsGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
            </linearGradient>
          </defs>
          
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke={gridColor}
            vertical={false}
          />
          <XAxis 
            dataKey="month" 
            tick={{ fill: textColor, fontSize: 11 }}
            axisLine={{ stroke: gridColor }}
            tickLine={false}
          />
          <YAxis 
            tick={{ fill: textColor, fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            width={30}
          />
          
          <Tooltip content={<CustomTooltip />} />
          
          <Legend 
            wrapperStyle={{ 
              color: textColor, 
              fontSize: 11,
              paddingTop: '10px',
            }}
            iconType="circle"
            iconSize={8}
          />
          
          {displayMetrics.includes('goals') && (
            <>
              <Area
                type="monotone"
                dataKey="goals"
                stroke="transparent"
                fill="url(#goalsGradient)"
              />
              <Line
                type="monotone"
                dataKey="goals"
                name={metricConfig.goals.label}
                stroke={metricConfig.goals.color}
                strokeWidth={2}
                dot={{ r: 4, fill: metricConfig.goals.color }}
                activeDot={{ r: 6, stroke: '#fff', strokeWidth: 2 }}
              />
            </>
          )}
          
          {displayMetrics.includes('assists') && (
            <>
              <Area
                type="monotone"
                dataKey="assists"
                stroke="transparent"
                fill="url(#assistsGradient)"
              />
              <Line
                type="monotone"
                dataKey="assists"
                name={metricConfig.assists.label}
                stroke={metricConfig.assists.color}
                strokeWidth={2}
                dot={{ r: 4, fill: metricConfig.assists.color }}
                activeDot={{ r: 6, stroke: '#fff', strokeWidth: 2 }}
              />
            </>
          )}
          
          {displayMetrics.includes('xG') && (
            <Line
              type="monotone"
              dataKey="xG"
              name={metricConfig.xG.label}
              stroke={metricConfig.xG.color}
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ r: 3, fill: metricConfig.xG.color }}
              activeDot={{ r: 5, stroke: '#fff', strokeWidth: 2 }}
            />
          )}
          
          {displayMetrics.includes('xA') && (
            <Line
              type="monotone"
              dataKey="xA"
              name={metricConfig.xA.label}
              stroke={metricConfig.xA.color}
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ r: 3, fill: metricConfig.xA.color }}
              activeDot={{ r: 5, stroke: '#fff', strokeWidth: 2 }}
            />
          )}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SeasonProgressionChart;
