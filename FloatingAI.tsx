'use client';

import { useState, useRef, useEffect } from 'react';
import { Bot, X, Send } from 'lucide-react';
import clsx from 'clsx';

type Msg = { role: 'user' | 'assistant'; text: string };

const QUICK = [
  'Matchs de ce soir ?',
  'Qui est premier en Premier League ?',
  'Prochain match PSG ?',
  'Matchs en direct',
];

export default function FloatingAI() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: 'assistant', text: 'Salut ! Je suis Football AI. Pose-moi une question sur les matchs, classements ou équipes.' },
  ]);
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msgs, open]);

  async function ask(q: string) {
    if (!q.trim() || loading) return;
    setMsgs((m) => [...m, { role: 'user', text: q }]);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch(`/api/ai?q=${encodeURIComponent(q)}`);
      const json = await res.json();
      setMsgs((m) => [...m, { role: 'assistant', text: json.answer || 'Je n\'ai pas trouvé de réponse pour le moment.' }]);
    } catch {
      setMsgs((m) => [...m, { role: 'assistant', text: 'Erreur de connexion. Réessaie plus tard.' }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={clsx(
          'fixed bottom-20 right-4 z-40 w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600',
          'shadow-lg shadow-blue-500/40 flex items-center justify-center text-white',
          'active:scale-95 transition-transform',
          open && 'hidden'
        )}
        aria-label="Football AI"
      >
        <Bot size={26} />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-[var(--background)]/95 backdrop-blur-md max-w-lg mx-auto">
          <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)]">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                <Bot size={18} className="text-white" />
              </div>
              <div>
                <p className="font-bold text-sm">Football AI</p>
                <p className="text-[10px] text-[var(--muted)]">Assistant football</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="p-2 rounded-xl hover:bg-white/5">
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {msgs.map((m, i) => (
              <div
                key={i}
                className={clsx(
                  'max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed',
                  m.role === 'user'
                    ? 'ml-auto bg-[var(--accent)] text-white'
                    : 'bg-[var(--card)] border border-[var(--border)] text-slate-200'
                )}
              >
                {m.text}
              </div>
            ))}
            {loading && (
              <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl px-3.5 py-2.5 text-sm text-[var(--muted)]">
                Réflexion...
              </div>
            )}
            <div ref={endRef} />
          </div>

          <div className="px-3 pb-2 flex gap-2 overflow-x-auto">
            {QUICK.map((q) => (
              <button
                key={q}
                onClick={() => ask(q)}
                className="shrink-0 text-xs px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300 hover:border-blue-500/50"
              >
                {q}
              </button>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              ask(input);
            }}
            className="flex items-center gap-2 px-3 py-3 border-t border-[var(--border)] pb-safe"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Pose ta question..."
              className="flex-1 bg-[var(--card)] border border-[var(--border)] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-500/50"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="p-2.5 rounded-xl bg-[var(--accent)] text-white disabled:opacity-40"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
