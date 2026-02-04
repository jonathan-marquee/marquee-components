import { useRef, useEffect } from 'react';

interface PassData {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  success: boolean;
  progressive: boolean;
}

interface PlayerNode {
  id: string;
  name: string;
  x: number;
  y: number;
  passes: number;
}

interface PassNetworkProps {
  passes: PassData[];
  players?: PlayerNode[];
  width?: number;
  height?: number;
  theme?: 'dark' | 'light';
  title?: string;
  showProgressiveOnly?: boolean;
}

export function PassNetwork({
  passes,
  players,
  width = 500,
  height = 340,
  theme = 'dark',
  title,
  showProgressiveOnly = false,
}: PassNetworkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const bgColor = theme === 'dark' ? '#14191E' : '#f3f4f6';
  const pitchColor = theme === 'dark' ? '#1a472a' : '#4ade80';
  const lineColor = theme === 'dark' ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.7)';

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

    // Draw pitch outline
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = 1;
    ctx.strokeRect(pitchMargin, pitchMargin, pitchWidth, pitchHeight);

    // Draw center line
    ctx.beginPath();
    ctx.moveTo(width / 2, pitchMargin);
    ctx.lineTo(width / 2, height - pitchMargin);
    ctx.stroke();

    // Draw center circle
    ctx.beginPath();
    ctx.arc(width / 2, height / 2, pitchHeight * 0.12, 0, Math.PI * 2);
    ctx.stroke();

    // Filter passes if needed
    const filteredPasses = showProgressiveOnly 
      ? passes.filter(p => p.progressive) 
      : passes;

    // Draw passes
    filteredPasses.forEach((pass) => {
      const startX = pitchMargin + (pass.startX / 100) * pitchWidth;
      const startY = pitchMargin + (pass.startY / 100) * pitchHeight;
      const endX = pitchMargin + (pass.endX / 100) * pitchWidth;
      const endY = pitchMargin + (pass.endY / 100) * pitchHeight;

      // Draw pass line
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      
      if (pass.progressive) {
        ctx.strokeStyle = pass.success ? '#22C55E' : 'rgba(34, 197, 94, 0.4)';
        ctx.lineWidth = 2.5;
      } else {
        ctx.strokeStyle = pass.success 
          ? 'rgba(255, 255, 255, 0.5)' 
          : 'rgba(239, 68, 68, 0.5)';
        ctx.lineWidth = 1.5;
      }
      ctx.stroke();

      // Draw arrow head
      const angle = Math.atan2(endY - startY, endX - startX);
      const arrowLength = 8;
      
      ctx.beginPath();
      ctx.moveTo(endX, endY);
      ctx.lineTo(
        endX - arrowLength * Math.cos(angle - Math.PI / 6),
        endY - arrowLength * Math.sin(angle - Math.PI / 6)
      );
      ctx.moveTo(endX, endY);
      ctx.lineTo(
        endX - arrowLength * Math.cos(angle + Math.PI / 6),
        endY - arrowLength * Math.sin(angle + Math.PI / 6)
      );
      ctx.stroke();

      // Draw start point
      ctx.beginPath();
      ctx.arc(startX, startY, 4, 0, Math.PI * 2);
      ctx.fillStyle = pass.progressive ? '#22C55E' : 'rgba(255, 255, 255, 0.6)';
      ctx.fill();
    });

    // Draw player nodes if provided
    if (players) {
      players.forEach((player) => {
        const x = pitchMargin + (player.x / 100) * pitchWidth;
        const y = pitchMargin + (player.y / 100) * pitchHeight;
        const radius = 8 + (player.passes / 10) * 5;

        // Draw node
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = '#6366F1';
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw player name
        ctx.fillStyle = '#fff';
        ctx.font = '10px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(player.name, x, y + radius + 12);
      });
    }

  }, [width, height, passes, players, showProgressiveOnly, theme, bgColor, pitchColor, lineColor]);

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
        gap: '16px', 
        marginTop: '12px',
        flexWrap: 'wrap',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ 
            width: '20px', 
            height: '3px', 
            backgroundColor: '#22C55E',
            borderRadius: '2px',
          }} />
          <span style={{ 
            color: theme === 'dark' ? '#9CA3AF' : '#6B7280',
            fontSize: '11px',
          }}>
            Progressive
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ 
            width: '20px', 
            height: '2px', 
            backgroundColor: 'rgba(255,255,255,0.5)',
            borderRadius: '2px',
          }} />
          <span style={{ 
            color: theme === 'dark' ? '#9CA3AF' : '#6B7280',
            fontSize: '11px',
          }}>
            Regular
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ 
            width: '20px', 
            height: '2px', 
            backgroundColor: 'rgba(239, 68, 68, 0.5)',
            borderRadius: '2px',
          }} />
          <span style={{ 
            color: theme === 'dark' ? '#9CA3AF' : '#6B7280',
            fontSize: '11px',
          }}>
            Failed
          </span>
        </div>
      </div>
    </div>
  );
}

export default PassNetwork;
