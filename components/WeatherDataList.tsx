'use client';
import React, { useEffect, useState } from 'react';
import type { User } from '@supabase/supabase-js';
import { Pencil, Trash2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { authenticatedFetch } from '../lib/api-client';

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

export default function WeatherDataList() {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [weather, setWeather] = useState<WeatherData[]>([]);
  const [provinceId, setProvinceId] = useState<number | ''>('');
  const [date, setDate] = useState('');
  const [temperature, setTemperature] = useState('');
  const [precipitation, setPrecipitation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editProvinceId, setEditProvinceId] = useState<number | ''>('');
  const [editDate, setEditDate] = useState('');
  const [editTemperature, setEditTemperature] = useState('');
  const [editPrecipitation, setEditPrecipitation] = useState('');
  const [user, setUser] = useState<User | null>(null);

  const fetchProvinces = async () => {
    try {
      const res = await fetch('/api/provinces');
      const data = await res.json();
      setProvinces(data);
    } catch (err) {
      console.error('Failed to fetch provinces:', err);
    }
  };

  const fetchWeather = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/weatherdata');
      const data = await res.json();
      setWeather(data);
    } catch (err) {
      setError('Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProvinces();
    fetchWeather();
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await authenticatedFetch('/api/weatherdata', {
        method: 'POST',
        body: JSON.stringify({
          provinceId: Number(provinceId),
          date: new Date(date).toISOString(),
          temperature: Number(temperature),
          precipitation: Number(precipitation),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to create weather data');
      } else {
        setProvinceId('');
        setDate('');
        setTemperature('');
        setPrecipitation('');
        fetchWeather();
      }
    } catch (err) {
      setError('Failed to create weather data');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    setError(null);
    setLoading(true);
    try {
      const res = await authenticatedFetch(`/api/weatherdata/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to delete weather data');
      } else {
        fetchWeather();
      }
    } catch (err) {
      setError('Failed to delete weather data');
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (entry: WeatherData) => {
    setEditingId(entry.id);
    setEditProvinceId(entry.provinceId);
    setEditDate(entry.date.slice(0, 10));
    setEditTemperature(entry.temperature.toString());
    setEditPrecipitation(entry.precipitation.toString());
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId === null) return;
    setError(null);
    setLoading(true);
    try {
      const res = await authenticatedFetch(`/api/weatherdata/${editingId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          provinceId: Number(editProvinceId),
          date: new Date(editDate).toISOString(),
          temperature: Number(editTemperature),
          precipitation: Number(editPrecipitation),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to update weather data');
      } else {
        setEditingId(null);
        setEditProvinceId('');
        setEditDate('');
        setEditTemperature('');
        setEditPrecipitation('');
        fetchWeather();
      }
    } catch (err) {
      setError('Failed to update weather data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: 600,
        margin: '2rem auto',
        padding: 24,
        border: '1px solid #eee',
        borderRadius: 8,
      }}
      className="weather-data-card"
    >
      <h2>Weather Data</h2>
      {user ? (
        <form
          onSubmit={handleSubmit}
          style={{ marginBottom: 24, display: 'flex', flexWrap: 'wrap', gap: 8 }}
        >
          <select
            value={provinceId}
            onChange={(e) => setProvinceId(Number(e.target.value))}
            required
            style={{ width: 120, padding: 8 }}
          >
            <option value="">Province</option>
            {provinces.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            style={{ width: 130, padding: 8 }}
          />
          <input
            type="number"
            placeholder="Temperature (°C)"
            value={temperature}
            onChange={(e) => setTemperature(e.target.value)}
            required
            style={{ width: 140, padding: 8 }}
          />
          <input
            type="number"
            placeholder="Precipitation (mm)"
            value={precipitation}
            onChange={(e) => setPrecipitation(e.target.value)}
            required
            style={{ width: 140, padding: 8 }}
          />
          <button type="submit" disabled={loading} style={{ padding: 8 }}>
            {loading ? 'Saving...' : 'Add Data'}
          </button>
        </form>
      ) : (
        <div style={{ marginBottom: 24, color: 'var(--primary)', fontWeight: 600 }}>
          Please{' '}
          <a href="/dashboard" style={{ color: 'var(--secondary)', textDecoration: 'underline' }}>
            log in
          </a>{' '}
          to add or edit weather data.
        </div>
      )}
      {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}
      <h3>List</h3>
      {loading && weather.length === 0 ? (
        <div>Loading...</div>
      ) : weather.length === 0 ? (
        <div>No weather data found.</div>
      ) : (
        <ul style={{ padding: 0, listStyle: 'none' }}>
          {weather.map((entry) => (
            <li
              key={entry.id}
              className="weather-list-item"
              style={{ marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}
            >
              {editingId === entry.id ? (
                <form onSubmit={handleEdit} style={{ display: 'inline' }}>
                  <select
                    value={editProvinceId}
                    onChange={(e) => setEditProvinceId(Number(e.target.value))}
                    required
                    style={{ width: 100, marginRight: 4 }}
                  >
                    <option value="">Province</option>
                    {provinces.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                  <input
                    type="date"
                    value={editDate}
                    onChange={(e) => setEditDate(e.target.value)}
                    required
                    style={{ width: 110, marginRight: 4 }}
                  />
                  <input
                    type="number"
                    value={editTemperature}
                    onChange={(e) => setEditTemperature(e.target.value)}
                    required
                    style={{ width: 80, marginRight: 4 }}
                  />
                  <input
                    type="number"
                    value={editPrecipitation}
                    onChange={(e) => setEditPrecipitation(e.target.value)}
                    required
                    style={{ width: 80, marginRight: 4 }}
                  />
                  <button type="submit" disabled={loading} style={{ marginRight: 4 }}>
                    Save
                  </button>
                  <button type="button" onClick={() => setEditingId(null)}>
                    Cancel
                  </button>
                </form>
              ) : (
                <>
                  <strong>{entry.province?.name || '?'}</strong> | {entry.date.slice(0, 10)} |{' '}
                  {entry.temperature}°C | {entry.precipitation} mm
                  {user && (
                    <>
                      <button
                        onClick={() => startEdit(entry)}
                        aria-label="Edit"
                        className="icon-btn"
                        style={{ marginLeft: 8 }}
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(entry.id)}
                        aria-label="Delete"
                        className="icon-btn delete"
                        style={{ marginLeft: 4 }}
                      >
                        <Trash2 size={18} />
                      </button>
                    </>
                  )}
                </>
              )}
            </li>
          ))}
        </ul>
      )}
      <style jsx global>{`
        @media (max-width: 600px) {
          .weather-data-card {
            padding: 14px !important;
          }
          .weather-list-item {
            display: block !important;
            margin-bottom: 20px !important;
            font-size: 16px !important;
          }
        }
      `}</style>
    </div>
  );
}
