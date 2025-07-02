"use client";
import React, { useState } from "react";
import { supabase } from "../lib/supabase";

export default function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) setError(error.message);
    else setMessage("Check your email for a confirmation link.");
    setLoading(false);
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    else {
      setUser(data.user);
      setMessage("Signed in!");
    }
    setLoading(false);
  };

  const handleSignOut = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    setUser(null);
    setMessage("Signed out.");
    setLoading(false);
  };

  // Check for current user on mount
  React.useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) setUser(data.user);
    });
  }, []);

  return (
    <div style={{ maxWidth: 400, margin: "2rem auto", padding: 24, border: "1px solid #eee", borderRadius: 8 }}>
      <h2>Authentication</h2>
      {user ? (
        <>
          <div style={{ marginBottom: 12 }}>
            Signed in as <strong>{user.email}</strong>
          </div>
          <button onClick={handleSignOut} disabled={loading} style={{ width: "100%", padding: 8 }}>
            {loading ? "Signing out..." : "Sign Out"}
          </button>
        </>
      ) : (
        <form style={{ marginBottom: 12 }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={{ width: "100%", marginBottom: 8, padding: 8 }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={{ width: "100%", marginBottom: 8, padding: 8 }}
          />
          <button onClick={handleSignIn} disabled={loading} style={{ width: "100%", padding: 8, marginBottom: 8 }}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
          <button onClick={handleSignUp} disabled={loading} style={{ width: "100%", padding: 8 }}>
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
      )}
      {error && <div style={{ color: "red", marginBottom: 8 }}>{error}</div>}
      {message && <div style={{ color: "green", marginBottom: 8 }}>{message}</div>}
    </div>
  );
} 