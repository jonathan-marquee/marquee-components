import { useRef, useEffect } from 'react';

interface ShotData {
  x: number;
  y: number;
  xG: number;
  outcome: 'goal' | 'saved' | 'blocked' | 'off-target';
  minute?: number;
}

interface HeatmapPoint {
  x: number;
  y: number;
  intensity: number;
}

interface FootballPitchProps {
  width?: number;
  height?: number;
  shots?: ShotData[];
  heatmapPoints?: HeatmapPoint[];
  showFullPitch?: boolean;
  theme?: 'dark' | 'light';
  title?: string;
}

const outcomeColors = {
  goal: '#22C55E',
  saved: '#EAB308',
  blocked: '#F97316',
  'off-target': '#EF4444',
};

export function FootballPitch({
  width = 500,
  height = 340,
  shots = [],
  heatmapPoints = [],
  showFullPitch = false,
  theme = 'dark',
  title,
}: FootballPitchProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const pitchColor = theme === 'dark' ? '#1a472a' : '#4ade80';
  const lineColor = theme === 'dark' ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.9)';
  const bgColor = theme === 'dark' ? '#14191E' : '#f3f4f6';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, width, height);

    // Draw pitch background
    const pitchMargin = 20;
    const pitchWidth = width - pitchMargin * 2;
    const pitchHeight = height - pitchMargin * 2;
    
    ctx.fillStyle = pitchColor;
    ctx.fillRect(pitchMargin, pitchMargin, pitchWidth, pitchHeight);

    // Set line style
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = 1.5;

    // Draw pitch outline
    ctx.strokeRect(pitchMargin, pitchMargin, pitchWidth, pitchHeight);

    // Calculate pitch coordinates
    const centerX = width / 2;
    const centerY = height / 2;

    if (showFullPitch) {
      // Center circle
      ctx.beginPath();
      ctx.arc(centerX, centerY, pitchHeight * 0.15, 0, Math.PI * 2);
      ctx.stroke();

      // Center line
      ctx.beginPath();
      ctx.moveTo(centerX, pitchMargin);
      ctx.lineTo(centerX, height - pitchMargin);
      ctx.stroke();

      // Center dot
      ctx.beginPath();
      ctx.arc(centerX, centerY, 3, 0, Math.PI * 2);
      ctx.fillStyle = lineColor;
      ctx.fill();
    }

    // Draw penalty areas (both ends for full pitch, just attacking end for half)
    const drawPenaltyArea = (isRight: boolean) => {
      const boxWidth = pitchWidth * 0.16;
      const boxHeight = pitchHeight * 0.44;
      const smallBoxWidth = pitchWidth * 0.055;
      const smallBoxHeight = pitchHeight * 0.2;
      
      const x = isRight 
        ? width - pitchMargin - boxWidth 
        : pitchMargin;
      const y = centerY - boxHeight / 2;

      // Penalty area
      ctx.strokeRect(x, y, boxWidth, boxHeight);

      // Goal area (6 yard box)
      const smallX = isRight 
        ? width - pitchMargin - smallBoxWidth 
        : pitchMargin;
      const smallY = centerY - smallBoxHeight / 2;
      ctx.strokeRect(smallX, smallY, smallBoxWidth, smallBoxHeight);

      // Penalty spot
      const spotX = isRight 
        ? width - pitchMargin - pitchWidth * 0.11 
        : pitchMargin + pitchWidth * 0.11;
      ctx.beginPath();
      ctx.arc(spotX, centerY, 3, 0, Math.PI * 2);
      ctx.fillStyle = lineColor;
      ctx.fill();

      // Penalty arc
      ctx.beginPath();
      const startAngle = isRight ? Math.PI * 0.63 : Math.PI * -0.37;
      const endAngle = isRight ? Math.PI * 1.37 : Math.PI * 0.37;
      ctx.arc(spotX, centerY, pitchHeight * 0.15, startAngle, endAngle, isRight);
      ctx.stroke();

      // Goal
      const goalWidth = 4;
      const goalHeight = pitchHeight * 0.12;
      ctx.fillStyle = 'rgba(255,255,255,0.3)';
      if (isRight) {
        ctx.fillRect(width - pitchMargin, centerY - goalHeight / 2, goalWidth, goalHeight);
      } else {
        ctx.fillRect(pitchMargin - goalWidth, centerY - goalHeight / 2, goalWidth, goalHeight);
      }
    };

    // Draw penalty areas
    drawPenaltyArea(true); // Right/attacking end
    if (showFullPitch) {
      drawPenaltyArea(false); // Left/defending end
    }

    // Draw heatmap if provided
    if (heatmapPoints.length > 0) {
      heatmapPoints.forEach((point) => {
        const x = pitchMargin + (point.x / 100) * pitchWidth;
        const y = pitchMargin + (point.y / 100) * pitchHeight;
        const radius = 25 + point.intensity * 15;

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, `rgba(239, 68, 68, ${point.intensity * 0.6})`);
        gradient.addColorStop(0.5, `rgba(249, 115, 22, ${point.intensity * 0.3})`);
        gradient.addColorStop(1, 'rgba(249, 115, 22, 0)');

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });
    }

    // Draw shots if provided
    if (shots.length > 0) {
      shots.forEach((shot) => {
        const x = pitchMargin + (shot.x / 100) * pitchWidth;
        const y = pitchMargin + (shot.y / 100) * pitchHeight;
        const radius = 4 + shot.xG * 12; // Size based on xG

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = outcomeColors[shot.outcome];
        ctx.fill();

        // Add border for goals
        if (shot.outcome === 'goal') {
          ctx.strokeStyle = '#fff';
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      });
    }

  }, [width, height, shots, heatmapPoints, showFullPitch, theme, pitchColor, lineColor, bgColor]);

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
      {shots.length > 0 && (
        <div style={{ 
          display: 'flex', 
          gap: '16px', 
          marginTop: '12px',
          flexWrap: 'wrap',
        }}>
          {Object.entries(outcomeColors).map(([outcome, color]) => (
            <div key={outcome} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ 
                width: '10px', 
                height: '10px', 
                borderRadius: '50%', 
                backgroundColor: color,
                border: outcome === 'goal' ? '2px solid #fff' : 'none',
              }} />
              <span style={{ 
                color: theme === 'dark' ? '#9CA3AF' : '#6B7280',
                fontSize: '11px',
                textTransform: 'capitalize',
              }}>
                {outcome}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FootballPitch;
