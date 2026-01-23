'use client';
import React, { useEffect, useState, useRef } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  LabelList,
} from 'recharts';

const PRIMARY = '#3282B8';
const HOVER = '#0A3A5C';
const GRID = '#E2E8F0';
const BG = '#FFFFFF';
const TEXT = '#1E293B';

interface ChartDataItem {
  name: string;
  code: string;
  avgTemp: number;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ payload: ChartDataItem }>;
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    const { name, avgTemp } = payload[0].payload;
    return (
      <div
        style={{
          background: '#fff',
          color: TEXT,
          border: `1px solid ${PRIMARY}`,
          borderRadius: 8,
          padding: 12,
          minWidth: 120,
        }}
      >
        <strong style={{ color: PRIMARY }}>{name}</strong>
        <br />
        <span style={{ color: HOVER, fontWeight: 600 }}>{avgTemp.toFixed(1)}°C</span>
      </div>
    );
  }
  return null;
}

interface ClimateChartProps {
  data?: ChartDataItem[];
  loading?: boolean;
}

export default function ClimateChart({ data = [], loading = false }: ClimateChartProps) {
  const [chartHeight, setChartHeight] = useState(350);
  const [mounted, setMounted] = useState(false);
  const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleResize = () => {
      // Debounce resize handler
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
      resizeTimeoutRef.current = setTimeout(() => {
        setChartHeight(window.innerWidth < 600 ? 220 : 350);
      }, 150);
    };
    handleResize();
    setMounted(true);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      className="climate-chart-card"
      style={{
        background: BG,
        borderRadius: 12,
        padding: 16,
        border: `1px solid ${GRID}`,
        width: '100%',
        maxWidth: '100%',
        boxSizing: 'border-box',
      }}
    >
      <h2 style={{ color: 'var(--primary)', fontSize: 24, fontWeight: 700, margin: '0 0 16px 0' }}>
        Average Temperature by Province
      </h2>
      {loading ? (
        <div
          style={{
            height: chartHeight,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: GRID,
          }}
        >
          <div
            style={{ width: '100%', height: 24, background: GRID, borderRadius: 6, opacity: 0.5 }}
          />
        </div>
      ) : (
        mounted && (
          <div style={{ width: '100%', height: chartHeight, minWidth: 0 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{ top: 8, right: 16, left: 16, bottom: 24 }}
                barCategoryGap={24}
                barGap={4}
                style={{ background: BG }}
              >
                <CartesianGrid stroke={GRID} strokeDasharray="3 3" />
                <XAxis dataKey="code" stroke={TEXT} fontSize={14} />
                <YAxis
                  stroke={TEXT}
                  fontSize={14}
                  label={{ value: '°C', angle: -90, position: 'insideLeft', fill: TEXT }}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: '#E2E8F0', opacity: 0.3 }} />
                <Bar
                  dataKey="avgTemp"
                  fill={PRIMARY}
                  radius={[4, 4, 0, 0]}
                  isAnimationActive={false}
                >
                  <LabelList
                    dataKey="avgTemp"
                    position="top"
                    formatter={(value: number) => value.toFixed(1)}
                    fill={PRIMARY}
                    className="chart-label-list"
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        )
      )}
      <style jsx global>{`
        .climate-chart-card {
          width: 100%;
          max-width: 100%;
          box-sizing: border-box;
        }
        @media (max-width: 600px) {
          .climate-chart-card {
            padding: 8px !important;
          }
          .chart-label-list {
            font-size: 0 !important;
          }
        }
      `}</style>
    </div>
  );
}
