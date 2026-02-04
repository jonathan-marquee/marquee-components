import { useRef, useEffect } from 'react';

interface DefensiveAction {
  x: number;
  y: number;
  type: 'tackle' | 'interception' | 'block' | 'clearance';
  success: boolean;
}

interface DefensiveActionsMapProps {
  actions?: DefensiveAction[];
  heatmapPoints?: { x: number; y: number; intensity: number }[];
  width?: number;
  height?: number;
  theme?: 'dark' | 'light';
  title?: string;
  showHeatmap?: boolean;
}

const actionColors = {
  tackle: '#22C55E',
  interception: '#6366F1',
  block: '#F59E0B',
  clearance: '#00D4AA',
};

const actionShapes = {
  tackle: 'circle',
  interception: 'diamond',
  block: 'square',
  clearance: 'triangle',
};

export function DefensiveActionsMap({
  actions = [],
  heatmapPoints = [],
  width = 500,
  height = 340,
  theme = 'dark',
  title,
  showHeatmap = true,
}: DefensiveActionsMapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const bgColor = theme === 'dark' ? '#14191E' : '#f3f4f6';
  const pitchColor = theme === 'dark' ? '#1a472a' : '#4ade80';
  const lineColor = theme === 'dark' ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.8)';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, width, height);

    // Draw pitch
    const pitchMargin = 20;
    const pitchWidth = width - pitchMargin * 2;
    const pitchHeight = height - pitchMargin * 2;
    
    ctx.fillStyle = pitchColor;
    ctx.fillRect(pitchMargin, pitchMargin, pitchWidth, pitchHeight);

    // Draw pitch outline
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = 1.5;
    ctx.strokeRect(pitchMargin, pitchMargin, pitchWidth, pitchHeight);

    // Center line
    ctx.beginPath();
    ctx.moveTo(width / 2, pitchMargin);
    ctx.lineTo(width / 2, height - pitchMargin);
    ctx.stroke();

    // Center circle
    ctx.beginPath();
    ctx.arc(width / 2, height / 2, pitchHeight * 0.12, 0, Math.PI * 2);
    ctx.stroke();

    // Draw defending third zone indicator
    const defendingThird = pitchWidth / 3;
    ctx.fillStyle = 'rgba(239, 68, 68, 0.08)';
    ctx.fillRect(pitchMargin, pitchMargin, defendingThird, pitchHeight);

    // Draw heatmap
    if (showHeatmap && heatmapPoints.length > 0) {
      heatmapPoints.forEach((point) => {
        const x = pitchMargin + (point.x / 100) * pitchWidth;
        const y = pitchMargin + (point.y / 100) * pitchHeight;
        const radius = 30 + point.intensity * 20;

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, `rgba(34, 197, 94, ${point.intensity * 0.5})`);
        gradient.addColorStop(0.5, `rgba(34, 197, 94, ${point.intensity * 0.25})`);
        gradient.addColorStop(1, 'rgba(34, 197, 94, 0)');

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });
    }

    // Draw defensive actions
    actions.forEach((action) => {
      const x = pitchMargin + (action.x / 100) * pitchWidth;
      const y = pitchMargin + (action.y / 100) * pitchHeight;
      const color = actionColors[action.type];
      const size = action.success ? 7 : 5;

      ctx.fillStyle = color;
      ctx.strokeStyle = action.success ? '#fff' : 'rgba(255,255,255,0.3)';
      ctx.lineWidth = action.success ? 2 : 1;

      switch (actionShapes[action.type]) {
        case 'circle':
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
          break;
        case 'diamond':
          ctx.beginPath();
          ctx.moveTo(x, y - size);
          ctx.lineTo(x + size, y);
          ctx.lineTo(x, y + size);
          ctx.lineTo(x - size, y);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          break;
        case 'square':
          ctx.fillRect(x - size, y - size, size * 2, size * 2);
          ctx.strokeRect(x - size, y - size, size * 2, size * 2);
          break;
        case 'triangle':
          ctx.beginPath();
          ctx.moveTo(x, y - size);
          ctx.lineTo(x + size, y + size);
          ctx.lineTo(x - size, y + size);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          break;
      }
    });

  }, [width, height, actions, heatmapPoints, showHeatmap, theme, bgColor, pitchColor, lineColor]);

  return (
    <div style={{ 
      background: bgColor,
      borderRadius: '12px',
      padding: '16px',
      border: theme === 'dark' ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
    }}>
      {title && (
        <h3 style={{ 
          color: theme === 'dark' ? '#fff' : '#1f2937',
          fontSize: '14px',
          fontWeight: 600,
          marginBottom: '12px',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
        }}>
          {title}
        </h3>
      )}
      <canvas 
        ref={canvasRef} 
        width={width} 
        height={height}
        style={{ borderRadius: '8px' }}
      />
      <div style={{ 
        display: 'flex', 
        gap: '12px', 
        marginTop: '12px',
        flexWrap: 'wrap',
      }}>
        {Object.entries(actionColors).map(([type, color]) => (
          <div key={type} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ 
              width: '10px', 
              height: '10px', 
              backgroundColor: color,
              borderRadius: type === 'tackle' ? '50%' : type === 'interception' ? '0' : '2px',
              transform: type === 'interception' ? 'rotate(45deg)' : 'none',
            }} />
            <span style={{ 
              color: theme === 'dark' ? '#9CA3AF' : '#6B7280',
              fontSize: '11px',
              textTransform: 'capitalize',
            }}>
              {type}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DefensiveActionsMap;
