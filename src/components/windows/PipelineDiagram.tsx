const MONO = "'Space Mono', 'Courier New', monospace";

interface Props {
  nodes: string[];
}

export function PipelineDiagram({ nodes }: Props) {
  const n = nodes.length;
  const nodeW = n <= 5 ? 108 : 86;
  const nodeH = 40;
  const gap = 22;
  const totalW = n * nodeW + (n - 1) * gap;
  const midY = 40;
  const fontSize = n <= 5 ? 10 : 9;

  return (
    <svg
      viewBox={`0 0 ${totalW} 80`}
      width="100%"
      preserveAspectRatio="xMidYMid meet"
      style={{ overflow: "visible" }}
    >
      <defs>
        <filter id="arrow-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="#3B82F6" floodOpacity="0.8" />
        </filter>
      </defs>
      {nodes.map((label, i) => {
        const x = i * (nodeW + gap);
        const cx = x + nodeW / 2;
        const arrowX1 = x - gap + 2;
        const arrowX2 = x - 2;

        return (
          <g key={i}>
            {i > 0 && (
              <>
                <line
                  x1={arrowX1}
                  y1={midY}
                  x2={arrowX2 - 5}
                  y2={midY}
                  stroke="#3B82F6"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  filter="url(#arrow-glow)"
                />
                <polygon
                  points={`${arrowX2 - 5},${midY - 3.5} ${arrowX2},${midY} ${arrowX2 - 5},${midY + 3.5}`}
                  fill="#3B82F6"
                  filter="url(#arrow-glow)"
                />
              </>
            )}

            <rect
              x={x}
              y={midY - nodeH / 2}
              width={nodeW}
              height={nodeH}
              rx={6}
              fill="#161b22"
              stroke="rgba(59,130,246,0.6)"
              strokeWidth="1.5"
            />

            <text
              x={cx}
              y={midY + 1}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#e2e8f0"
              fontSize={fontSize}
              fontFamily={MONO}
            >
              {label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
