export function MatchSkeleton() {
  return (
    <div className="glass rounded-2xl p-3.5 space-y-3">
      <div className="flex justify-between">
        <div className="skeleton h-3 w-24" />
        <div className="skeleton h-3 w-12" />
      </div>
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="skeleton w-8 h-8 rounded-full" />
          <div className="skeleton h-4 w-20" />
        </div>
        <div className="skeleton h-5 w-10" />
        <div className="flex items-center gap-2">
          <div className="skeleton h-4 w-20" />
          <div className="skeleton w-8 h-8 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function CardSkeleton({ lines = 3 }: { lines?: number }) {
  return (
    <div className="glass rounded-2xl p-4 space-y-3">
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className="skeleton h-4 w-full" style={{ width: `${80 - i * 15}%` }} />
      ))}
    </div>
  );
}
