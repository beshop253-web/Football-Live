import { Inbox } from 'lucide-react';

export default function EmptyState({
  message = 'Aucun match disponible pour le moment.',
  sub,
}: {
  message?: string;
  sub?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="w-14 h-14 rounded-2xl bg-slate-800/80 flex items-center justify-center mb-4">
        <Inbox size={28} className="text-[var(--muted)]" />
      </div>
      <p className="text-sm font-medium text-slate-300">{message}</p>
      {sub && <p className="text-xs text-[var(--muted)] mt-1.5">{sub}</p>}
    </div>
  );
}
