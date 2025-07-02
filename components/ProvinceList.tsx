'use client';
import React, { useEffect, useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Province {
  id: number;
  name: string;
  code: string;
}

export default function ProvinceList() {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState('');
  const [editCode, setEditCode] = useState('');
  const [user, setUser] = useState<any | null>(null);

  const fetchProvinces = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/provinces');
      const data = await res.json();
      setProvinces(data);
    } catch (err) {
      setError('Failed to fetch provinces');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProvinces();
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
      const res = await fetch('/api/provinces', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, code }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to create province');
      } else {
        setName('');
        setCode('');
        fetchProvinces();
      }
    } catch (err) {
      setError('Failed to create province');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch(`/api/provinces/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to delete province');
      } else {
        fetchProvinces();
      }
    } catch (err) {
      setError('Failed to delete province');
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (province: Province) => {
    setEditingId(province.id);
    setEditName(province.name);
    setEditCode(province.code);
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId === null) return;
    setError(null);
    setLoading(true);
    try {
      const res = await fetch(`/api/provinces/${editingId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: editName, code: editCode }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to update province');
      } else {
        setEditingId(null);
        setEditName('');
        setEditCode('');
        fetchProvinces();
      }
    } catch (err) {
      setError('Failed to update province');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: 500,
        margin: '2rem auto',
        padding: 24,
        border: '1px solid #eee',
        borderRadius: 8,
      }}
    >
      <h2>Provinces</h2>
      {user ? (
        <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ width: '48%', marginRight: 8, padding: 8 }}
          />
          <input
            type="text"
            placeholder="Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
            style={{ width: '30%', marginRight: 8, padding: 8 }}
          />
          <button type="submit" disabled={loading} style={{ padding: 8 }}>
            {loading ? 'Saving...' : 'Add Province'}
          </button>
        </form>
      ) : (
        <div style={{ marginBottom: 24, color: 'var(--primary)', fontWeight: 600 }}>
          Please{' '}
          <a href="/dashboard" style={{ color: 'var(--secondary)', textDecoration: 'underline' }}>
            log in
          </a>{' '}
          to add or edit provinces.
        </div>
      )}
      {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}
      <h3>List</h3>
      {loading && provinces.length === 0 ? (
        <div>Loading...</div>
      ) : provinces.length === 0 ? (
        <div>No provinces found.</div>
      ) : (
        <ul style={{ padding: 0, listStyle: 'none' }}>
          {provinces.map((province) => (
            <li
              key={province.id}
              style={{ marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}
            >
              {editingId === province.id ? (
                <form onSubmit={handleEdit} style={{ display: 'inline' }}>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    required
                    style={{ width: 120, marginRight: 4 }}
                  />
                  <input
                    type="text"
                    value={editCode}
                    onChange={(e) => setEditCode(e.target.value)}
                    required
                    style={{ width: 60, marginRight: 4 }}
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
                  <strong>{province.name}</strong> ({province.code})
                  {user && (
                    <>
                      <button
                        onClick={() => startEdit(province)}
                        aria-label="Edit"
                        className="icon-btn"
                        style={{ marginLeft: 8 }}
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(province.id)}
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
        .icon-btn {
          background: var(--primary);
          color: #fff;
          border: none;
          border-radius: 6px;
          padding: 6px 14px;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition:
            background 0.2s,
            color 0.2s;
        }
        .icon-btn:hover {
          background: var(--hover);
          color: #fff;
        }
        .icon-btn.delete {
          background: #fff;
          color: var(--primary);
          border: 1px solid var(--primary);
        }
        .icon-btn.delete:hover {
          background: #fff;
          color: var(--hover);
          border: 1px solid var(--hover);
        }
      `}</style>
    </div>
  );
}
