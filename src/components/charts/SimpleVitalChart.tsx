import React from 'react';
import { HealthMetric } from '../../types';

interface SimpleVitalChartProps {
  metrics: HealthMetric[];
  vitalType: 'bp' | 'glucose' | 'heart_rate' | 'spo2';
  title?: string;
}

export const SimpleVitalChart: React.FC<SimpleVitalChartProps> = ({
  metrics,
  vitalType,
  title
}) => {
  // Sort oldest to newest for trend line
  const sorted = [...metrics].reverse();

  if (sorted.length === 0) {
    return (
      <div className="h-44 flex items-center justify-center text-slate-400 text-xs">
        No recorded readings yet.
      </div>
    );
  }

  // Chart configuration based on vitalType
  let getY = (m: HealthMetric): number => 0;
  let getSecondaryY = (m: HealthMetric): number | null => null;
  let unit = '';
  let normalMin = 0;
  let normalMax = 0;
  let yMin = 40;
  let yMax = 180;
  let primaryLabel = '';
  let secondaryLabel = '';

  if (vitalType === 'bp') {
    getY = (m) => m.systolic_bp || 120;
    getSecondaryY = (m) => m.diastolic_bp || 80;
    unit = 'mmHg';
    normalMin = 90;
    normalMax = 120;
    yMin = 60;
    yMax = 160;
    primaryLabel = 'Systolic';
    secondaryLabel = 'Diastolic';
  } else if (vitalType === 'glucose') {
    getY = (m) => m.blood_glucose || 100;
    unit = 'mg/dL';
    normalMin = 70;
    normalMax = 140;
    yMin = 60;
    yMax = 200;
    primaryLabel = 'Glucose';
  } else if (vitalType === 'heart_rate') {
    getY = (m) => m.heart_rate || 72;
    unit = 'bpm';
    normalMin = 60;
    normalMax = 100;
    yMin = 50;
    yMax = 120;
    primaryLabel = 'Heart Rate';
  } else if (vitalType === 'spo2') {
    getY = (m) => m.spo2 || 98;
    unit = '%';
    normalMin = 95;
    normalMax = 100;
    yMin = 90;
    yMax = 100;
    primaryLabel = 'SpO2';
  }

  const svgWidth = 460;
  const svgHeight = 160;
  const padLeft = 40;
  const padRight = 20;
  const padTop = 20;
  const padBottom = 30;

  const plotW = svgWidth - padLeft - padRight;
  const plotH = svgHeight - padTop - padBottom;

  const scaleX = (index: number) => {
    if (sorted.length === 1) return padLeft + plotW / 2;
    return padLeft + (index / (sorted.length - 1)) * plotW;
  };

  const scaleY = (val: number) => {
    const clamped = Math.max(yMin, Math.min(yMax, val));
    return padTop + plotH - ((clamped - yMin) / (yMax - yMin)) * plotH;
  };

  // Generate path data
  const primaryPoints = sorted.map((m, i) => `${scaleX(i)},${scaleY(getY(m))}`).join(' ');
  const secondaryPoints = getSecondaryY(sorted[0]) !== null
    ? sorted.map((m, i) => `${scaleX(i)},${scaleY(getSecondaryY(m)!)}`).join(' ')
    : null;

  return (
    <div className="w-full font-serif">
      {title && (
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-[#17211C]">{title}</span>
          <div className="flex items-center gap-3 text-[11px] text-[#17211C]/70">
            <span className="flex items-center gap-1 font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-[#008080] inline-block shadow-xs" />
              {primaryLabel}
            </span>
            {secondaryLabel && (
              <span className="flex items-center gap-1 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-[#005F9E] inline-block shadow-xs" />
                {secondaryLabel}
              </span>
            )}
          </div>
        </div>
      )}

      <div className="w-full overflow-x-auto">
        <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-40">
          {/* Horizontal Grid lines with Old Gold tint */}
          {[yMin, (yMin + yMax) / 2, yMax].map((tickVal) => {
            const y = scaleY(tickVal);
            return (
              <g key={tickVal}>
                <line x1={padLeft} y1={y} x2={svgWidth - padRight} y2={y} stroke="#CFB53B" strokeOpacity="0.3" strokeDasharray="3 3" />
                <text x={padLeft - 6} y={y + 3} textAnchor="end" fontSize="9" fill="#17211C" opacity="0.6" className="font-mono">
                  {Math.round(tickVal)}
                </text>
              </g>
            );
          })}

          {/* Normal Target Range Band - Olive Green (#808000) */}
          {normalMax > normalMin && (
            <rect
              x={padLeft}
              y={scaleY(normalMax)}
              width={plotW}
              height={Math.abs(scaleY(normalMin) - scaleY(normalMax))}
              fill="#808000"
              opacity="0.12"
            />
          )}

          {/* Secondary Line (e.g. Diastolic) - Peacock Blue (#005F9E) */}
          {secondaryPoints && (
            <>
              <polyline
                fill="none"
                stroke="#005F9E"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={secondaryPoints}
              />
              {sorted.map((m, i) => (
                <circle
                  key={`sec-${i}`}
                  cx={scaleX(i)}
                  cy={scaleY(getSecondaryY(m)!)}
                  r="3.5"
                  fill="#FFFFF0"
                  stroke="#005F9E"
                  strokeWidth="2"
                />
              ))}
            </>
          )}

          {/* Primary Line (e.g. Systolic or Glucose) - Deep Teal (#008080) */}
          <polyline
            fill="none"
            stroke="#008080"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={primaryPoints}
          />
          {sorted.map((m, i) => (
            <g key={`pri-${i}`}>
              <circle
                cx={scaleX(i)}
                cy={scaleY(getY(m))}
                r="4"
                fill="#FFFFF0"
                stroke="#008080"
                strokeWidth="2.5"
              />
              {/* Date label at bottom */}
              <text
                x={scaleX(i)}
                y={svgHeight - 10}
                textAnchor="middle"
                fontSize="9"
                fill="#17211C"
                opacity="0.6"
                className="font-mono"
              >
                {new Date(m.recorded_at).toLocaleDateString([], { month: 'numeric', day: 'numeric' })}
              </text>
            </g>
          ))}
        </svg>
      </div>

      <div className="flex items-center justify-between text-[11px] text-[#17211C]/75 mt-1 px-1">
        <span>Target Normal: <strong className="text-[#808000]">{normalMin} - {normalMax} {unit}</strong></span>
        <span>Latest: <strong className="text-[#008080] font-mono">{getY(sorted[sorted.length - 1])} {getSecondaryY(sorted[sorted.length - 1]) !== null ? `/ ${getSecondaryY(sorted[sorted.length - 1])}` : ''} {unit}</strong></span>
      </div>
    </div>
  );
};
