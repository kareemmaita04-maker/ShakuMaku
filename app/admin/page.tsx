'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (data.ok) {
        router.push('/admin/dashboard');
      } else {
        setError(data.error || 'Invalid credentials.');
      }
    } catch {
      setError('Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-cream-2 flex items-center justify-center px-4">
      <div className="w-full max-w-[400px]">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#E8C870] to-gold flex items-center justify-center text-white mx-auto mb-4 shadow-card">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4 13h16a8 8 0 0 1-16 0Z" />
              <circle cx="12" cy="7" r="2.6" />
            </svg>
          </div>
          <h1 className="font-serif text-[28px] font-bold">Shaku Maku</h1>
          <p className="text-ink-soft text-sm mt-1">Team Login</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-paper border border-line rounded-[22px] p-8 shadow-card"
        >
          <div className="mb-5">
            <label className="block text-sm font-semibold text-ink mb-2">Username</label>
            <input
              type="text"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border border-line bg-cream text-ink text-[15px] focus:outline-none focus:border-gold transition-colors"
              placeholder="Username"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-ink mb-2">Password</label>
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border border-line bg-cream text-ink text-[15px] focus:outline-none focus:border-gold transition-colors"
              placeholder="Password"
            />
          </div>

          {error && (
            <p className="text-spicy text-sm font-medium mb-4 text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-full bg-gold text-white font-semibold text-[15px] hover:bg-gold-dk active:scale-[.98] transition-all duration-150 select-none disabled:opacity-60"
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
