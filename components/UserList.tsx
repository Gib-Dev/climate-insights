"use client";
import React, { useEffect, useState } from "react";
import * as Toast from '@radix-ui/react-toast';

interface User {
  id: number;
  email: string;
  name?: string;
  createdAt: string;
  updatedAt: string;
}

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editEmail, setEditEmail] = useState("");
  const [editName, setEditName] = useState("");
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToastMsg(msg);
    setToastType(type);
    setToastOpen(false);
    setTimeout(() => setToastOpen(true), 10);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to create user");
        showToast(data.error || "Failed to create user", 'error');
      } else {
        setEmail("");
        setName("");
        fetchUsers();
        showToast("User created!", 'success');
      }
    } catch (err) {
      setError("Failed to create user");
      showToast("Failed to create user", 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch(`/api/users/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to delete user");
        showToast(data.error || "Failed to delete user", 'error');
      } else {
        fetchUsers();
        showToast("User deleted!", 'success');
      }
    } catch (err) {
      setError("Failed to delete user");
      showToast("Failed to delete user", 'error');
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (user: User) => {
    setEditingId(user.id);
    setEditEmail(user.email);
    setEditName(user.name || "");
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId === null) return;
    setError(null);
    setLoading(true);
    try {
      const res = await fetch(`/api/users/${editingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: editEmail, name: editName }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to update user");
        showToast(data.error || "Failed to update user", 'error');
      } else {
        setEditingId(null);
        setEditEmail("");
        setEditName("");
        fetchUsers();
        showToast("User updated!", 'success');
      }
    } catch (err) {
      setError("Failed to update user");
      showToast("Failed to update user", 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div style={{ maxWidth: 400, margin: "2rem auto", padding: 24, border: "1px solid #eee", borderRadius: 8 }}>
        <h2>User Management</h2>
        <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={{ width: "100%", marginBottom: 8, padding: 8 }}
          />
          <input
            type="text"
            placeholder="Name (optional)"
            value={name}
            onChange={e => setName(e.target.value)}
            style={{ width: "100%", marginBottom: 8, padding: 8 }}
          />
          <button type="submit" disabled={loading} style={{ width: "100%", padding: 8 }}>
            {loading ? "Saving..." : "Add User"}
          </button>
        </form>
        {error && <div style={{ color: "red", marginBottom: 12 }}>{error}</div>}
        <h3>Users</h3>
        {loading && users.length === 0 ? (
          <div>Loading...</div>
        ) : users.length === 0 ? (
          <div>No users found.</div>
        ) : (
          <ul>
            {users.map(user => (
              <li key={user.id} style={{ marginBottom: 8 }}>
                {editingId === user.id ? (
                  <form onSubmit={handleEdit} style={{ display: "inline" }}>
                    <input
                      type="email"
                      value={editEmail}
                      onChange={e => setEditEmail(e.target.value)}
                      required
                      style={{ width: 140, marginRight: 4 }}
                    />
                    <input
                      type="text"
                      value={editName}
                      onChange={e => setEditName(e.target.value)}
                      style={{ width: 90, marginRight: 4 }}
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
                    <strong>{user.email}</strong> {user.name && `(${user.name})`}
                    <button onClick={() => startEdit(user)} style={{ marginLeft: 8 }}>
                      Edit
                    </button>
                    <button onClick={() => handleDelete(user.id)} style={{ marginLeft: 4, color: "red" }}>
                      Delete
                    </button>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
      <Toast.Provider swipeDirection="right">
        <Toast.Root open={toastOpen} onOpenChange={setToastOpen} style={{
          background: toastType === 'success' ? '#4ade80' : '#f87171',
          color: '#222',
          padding: '12px 24px',
          borderRadius: 8,
          position: 'fixed',
          bottom: 32,
          right: 32,
          zIndex: 9999,
          fontWeight: 600,
        }}>
          <Toast.Title>{toastMsg}</Toast.Title>
        </Toast.Root>
        <Toast.Viewport />
      </Toast.Provider>
    </>
  );
} 