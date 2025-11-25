import React from 'react';

export const Logo: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
    const dimensions = {
        sm: { height: 32, iconSize: 32, fontSize: 20 },
        md: { height: 40, iconSize: 40, fontSize: 24 },
        lg: { height: 56, iconSize: 56, fontSize: 32 },
    };

    const { height, iconSize, fontSize } = dimensions[size];

    return (
        <div className="flex items-center gap-3">
            <svg
                width={height + 120}
                height={height}
                viewBox={`0 0 ${iconSize + 120} ${iconSize}`}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    {/* Icon Gradient: Pastel Blue to Pastel Purple */}
                    <linearGradient id={`iconGradient-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#60A5FA" />
                        <stop offset="100%" stopColor="#A78BFA" />
                    </linearGradient>
                    {/* Text Gradient for "Labs" */}
                    <linearGradient id={`labsGradient-${size}`} x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#60A5FA" />
                        <stop offset="100%" stopColor="#A78BFA" />
                    </linearGradient>
                </defs>

                {/* Abstract Geometric Mark (Rounded Shapes Representing Flow/Growth) */}
                <g>
                    {/* Circle 1 - Top Left */}
                    <circle cx={iconSize * 0.3} cy={iconSize * 0.35} r={iconSize * 0.15} fill={`url(#iconGradient-${size})`} opacity="0.8" />
                    {/* Circle 2 - Bottom Right */}
                    <circle cx={iconSize * 0.7} cy={iconSize * 0.65} r={iconSize * 0.2} fill={`url(#iconGradient-${size})`} opacity="0.9" />
                    {/* Connecting Curve */}
                    <path
                        d={`M ${iconSize * 0.3} ${iconSize * 0.5} Q ${iconSize * 0.5} ${iconSize * 0.3}, ${iconSize * 0.7} ${iconSize * 0.5}`}
                        stroke={`url(#iconGradient-${size})`}
                        strokeWidth={iconSize * 0.08}
                        strokeLinecap="round"
                        fill="none"
                    />
                </g>

                {/* Text: FlowLabs */}
                <text
                    x={iconSize + 12}
                    y={iconSize * 0.7}
                    fontFamily="Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
                    fontSize={fontSize}
                    fontWeight="700"
                    letterSpacing="-0.02em"
                >
                    <tspan fill="#0F172A">Flow</tspan>
                    <tspan fill={`url(#labsGradient-${size})`}>Labs</tspan>
                </text>
            </svg>
        </div>
    );
};
