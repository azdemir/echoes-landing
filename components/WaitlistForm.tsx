'use client';

import { useState } from 'react';

/** Concept-preview waitlist: everything stays in the browser, nothing is sent. */
export default function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) return;
    setDone(true);
  };

  if (done) {
    return (
      <div className="mx-auto max-w-md text-center">
        <div
          className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full"
          style={{ border: '1px solid rgba(139,123,255,0.6)', boxShadow: '0 0 30px rgba(139,123,255,0.35)' }}
        >
          <span className="text-2xl" style={{ color: 'var(--violet)' }}>
            ✦
          </span>
        </div>
        <p className="serif text-2xl italic" style={{ color: 'var(--ink)' }}>
          The simulation has your coordinates.
        </p>
        <p className="mt-3 text-sm" style={{ color: 'var(--ink-dim)' }}>
          When the first futures come online, you&rsquo;ll be among the first to meet them.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="mx-auto flex max-w-xl flex-col items-center gap-4 sm:flex-row sm:justify-center">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@thefuture.com"
        className="waitlist"
        aria-label="Email address"
      />
      <button type="submit" className="btn-primary whitespace-nowrap">
        Enter the simulation
      </button>
    </form>
  );
}
