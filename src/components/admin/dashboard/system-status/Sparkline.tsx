import React from 'react';

interface SparklineProps {
    data: number[];
    color: string;
    height?: number;
}

export default function Sparkline({ data, color, height = 60 }: SparklineProps) {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;
    const width = 100;
    const step = width / (data.length > 1 ? data.length - 1 : 1);

    const points = data.map((val, i) => {
        const x = i * step;
        const y = height - ((val - min) / range) * height;
        return `${x},${y}`;
    }).join(' ');

    return (
        <svg width="100%" height={height} viewBox={`0 0 100 ${height}`} preserveAspectRatio="none" className="overflow-visible">
            <path
                d={`M0,${height} L${points} L100,${height} Z`}
                fill={color}
                fillOpacity="0.1"
                stroke="none"
            />
            <path
                d={`M${points}`}
                fill="none"
                stroke={color}
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
            />
        </svg>
    );
}
