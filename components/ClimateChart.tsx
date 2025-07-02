"use client";
import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LabelList } from "recharts";

const PRIMARY = '#3282B8';
const HOVER = '#0A3A5C';
const GRID = '#E2E8F0';
const BG = '#FFFFFF';
const TEXT = '#1E293B';

interface Province {
  id: number;
  name: string;
  code: string;
}

interface WeatherData {
  id: number;
  provinceId: number;
  date: string;
  temperature: number;
  precipitation: number;
  province?: Province;
}

function CustomTooltip({ active, payload }: any) {
  if (active && payload && payload.length) {
    const { name, avgTemp } = payload[0].payload;
    return (
      <div style={{ background: '#fff', color: TEXT, border: `1px solid ${PRIMARY}`, borderRadius: 8, padding: 12, minWidth: 120 }}>
        <strong style={{ color: PRIMARY }}>{name}</strong><br />
        <span style={{ color: HOVER, fontWeight: 600 }}>{avgTemp.toFixed(1)}°C</span>
      </div>
    );
  }
  return null;
}

export default function ClimateChart() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await fetch("/api/weatherdata");
      const weather = await res.json();
      const grouped: Record<string, { name: string; code: string; temps: number[] }> = {};
      for (const entry of weather) {
        const code = entry.province?.code || "?";
        if (!grouped[code]) grouped[code] = { name: entry.province?.name || code, code, temps: [] };
        grouped[code].temps.push(entry.temperature);
      }
      const chartData = Object.values(grouped).map(g => ({
        name: g.name,
        code: g.code,
        avgTemp: g.temps.length ? (g.temps.reduce((a, b) => a + b, 0) / g.temps.length) : 0,
      }));
      setData(chartData);
      setLoading(false);
    };
    fetchData();
  }, []);

  // Responsive height: 350px desktop, 220px mobile
  const chartHeight = typeof window !== 'undefined' && window.innerWidth < 600 ? 220 : 350;

  return (
    <div className="climate-chart-card" style={{ background: BG, borderRadius: 12, padding: 16, border: `1px solid ${GRID}`, width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}>
      <h2 style={{ color: 'var(--primary)', fontSize: 24, fontWeight: 700, margin: '0 0 16px 0' }}>Average Temperature by Province</h2>
      {loading ? (
        <div style={{ height: chartHeight, display: 'flex', alignItems: 'center', justifyContent: 'center', color: GRID }}>
          <div style={{ width: '100%', height: 24, background: GRID, borderRadius: 6, opacity: 0.5 }} />
        </div>
      ) : (
        <div style={{ width: '100%', height: chartHeight, minWidth: 0 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 8, right: 16, left: 16, bottom: 24 }} barCategoryGap={24} barGap={4} style={{ background: BG }}>
              <CartesianGrid stroke={GRID} strokeDasharray="3 3" />
              <XAxis dataKey="code" stroke={TEXT} fontSize={14} />
              <YAxis stroke={TEXT} fontSize={14} label={{ value: '°C', angle: -90, position: 'insideLeft', fill: TEXT }} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: '#E2E8F0', opacity: 0.3 }} />
              <Bar
                dataKey="avgTemp"
                fill={PRIMARY}
                radius={[4, 4, 0, 0]}
                isAnimationActive={false}
                onMouseOver={(_, idx) => setHovered(data[idx]?.code)}
                onMouseOut={() => setHovered(null)}
              >
                <LabelList dataKey="avgTemp" position="top" formatter={(label) => typeof label === 'number' ? label.toFixed(1) : ''} fill={PRIMARY} className="chart-label-list" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
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