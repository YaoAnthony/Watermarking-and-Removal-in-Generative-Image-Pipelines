import React, { useRef, useState, useEffect } from 'react';
import type { TradeoffState, Point } from '../types';

interface TriangleSelectorProps {
  onChange: (state: TradeoffState) => void;
}

const TriangleSelector: React.FC<TriangleSelectorProps> = ({ onChange }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [position, setPosition] = useState<Point>({ x: 150, y: 150 });
  const [isDragging, setIsDragging] = useState(false);

  // Triangle vertices (Equilateral)
  // Top: Robustness
  // Bottom Right: Capacity
  // Bottom Left: Imperceptibility
  // Triangle vertices (Equilateral)
  // Top: Robustness
  // Bottom Right: Capacity
  // Bottom Left: Imperceptibility
  // Shifted to center in 400px width
  const p1 = { x: 200, y: 20 };   // Top
  const p2 = { x: 330, y: 250 };  // Bottom Right
  const p3 = { x: 70, y: 250 };   // Bottom Left

  const calculateBarycentric = (p: Point) => {
    const y2y3 = p2.y - p3.y;
    const x3x2 = p3.x - p2.x;
    const x1x3 = p1.x - p3.x;
    const y1y3 = p1.y - p3.y;
    const y3y1 = p3.y - p1.y;
    const xx3 = p.x - p3.x;
    const yy3 = p.y - p3.y;

    const d = y2y3 * x1x3 + x3x2 * y1y3;
    const lambda1 = (y2y3 * xx3 + x3x2 * yy3) / d;
    const lambda2 = (y3y1 * xx3 + x1x3 * yy3) / d;
    const lambda3 = 1 - lambda1 - lambda2;

    return {
      robustness: Math.max(0, Math.min(100, lambda1 * 100)),
      capacity: Math.max(0, Math.min(100, lambda2 * 100)),
      imperceptibility: Math.max(0, Math.min(100, lambda3 * 100)),
    };
  };

  const handleMove = (clientX: number, clientY: number) => {
    if (!svgRef.current) return;
    
    const svg = svgRef.current;
    const pt = svg.createSVGPoint();
    pt.x = clientX;
    pt.y = clientY;
    
    // Transform screen coordinates to SVG coordinates
    const svgP = pt.matrixTransform(svg.getScreenCTM()?.inverse());
    
    const x = svgP.x;
    const y = svgP.y;

    // Constrain to triangle bounds (simple Y constraint for now, can be improved)
    // We can also clamp X if needed, but the barycentric logic handles values outside
    const constrainedY = Math.max(20, Math.min(250, y));
    const constrainedX = Math.max(0, Math.min(400, x)); // Simple bounds safety

    setPosition({ x: constrainedX, y: constrainedY });

    // Calculate values based on the new position
    const values = calculateBarycentric({ x: constrainedX, y: constrainedY });
    onChange(values);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent text selection
    setIsDragging(true);
    handleMove(e.clientX, e.clientY);
  };

  useEffect(() => {
    const handleGlobalMove = (e: MouseEvent) => {
      if (isDragging) {
        handleMove(e.clientX, e.clientY);
      }
    };
    const handleGlobalUp = () => {
      setIsDragging(false);
    };

    window.addEventListener('mousemove', handleGlobalMove);
    window.addEventListener('mouseup', handleGlobalUp);

    return () => {
      window.removeEventListener('mousemove', handleGlobalMove);
      window.removeEventListener('mouseup', handleGlobalUp);
    };
  }, [isDragging]);

  // Initial calculation
  useEffect(() => {
     // Initialize at center
     setPosition({ x: 200, y: 150 });
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update initial calculation to run after position set
  useEffect(() => {
     const values = calculateBarycentric(position);
     onChange(values);
  }, [position.x, position.y]);


  return (
    <div className="flex flex-col items-center w-full">
      <div className="relative select-none w-full flex justify-center">
        <svg
          ref={svgRef}
          width="400"
          height="280"
          className="cursor-pointer overflow-visible"
          onMouseDown={handleMouseDown}
          viewBox="0 0 400 280"
        >
          {/* The Triangle Background */}
          <polygon
            points="200,20 330,250 70,250"
            fill="#f8fafc"
            stroke="#e2e8f0"
            strokeWidth="2"
            strokeLinejoin="round"
          />

          {/* Labels - Darker for light mode */}
          <text x="200" y="10" textAnchor="middle" fill="#2563eb" fontWeight="700" fontSize="13">Robustness</text>
          <text x="300" y="280" textAnchor="start" fill="#9333ea" fontWeight="700" fontSize="13">Capacity</text>
          <text x="130" y="280" textAnchor="end" fill="#059669" fontWeight="700" fontSize="13">Imperceptibility</text>

          {/* Guide Lines */}
          <line x1="200" y1="20" x2={position.x} y2={position.y} stroke="#3b82f6" strokeWidth="1" strokeDasharray="4" opacity="0.3" />
          <line x1="330" y1="250" x2={position.x} y2={position.y} stroke="#a855f7" strokeWidth="1" strokeDasharray="4" opacity="0.3" />
          <line x1="70" y1="250" x2={position.x} y2={position.y} stroke="#10b981" strokeWidth="1" strokeDasharray="4" opacity="0.3" />

          {/* The Draggable Handle */}
          <circle
            cx={position.x}
            cy={position.y}
            r="10"
            fill="#3b82f6"
            stroke="#ffffff"
            strokeWidth="3"
            className="shadow-xl transition-transform "
            style={{ 
              cursor: isDragging ? 'grabbing' : 'grab',
              filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.2))' 
            }}
          />
        </svg>
      </div>
      <p className="text-slate-400 text-xs mt-4">Drag the blue dot to adjust the trade-offs</p>
    </div>
  );
};

export default TriangleSelector;