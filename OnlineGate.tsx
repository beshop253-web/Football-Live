"use client";

import { useEffect, useState } from "react";
import { WifiOff } from "lucide-react";

/** App requires network for live scores — block offline use */
export default function OnlineGate({ children }: { children: React.ReactNode }) {
  const [online, setOnline] = useState(true);

  useEffect(() => {
    const sync = () => setOnline(navigator.onLine);
    sync();
    window.addEventListener("online", sync);
    window.addEventListener("offline", sync);
    return () => {
      window.removeEventListener("online", sync);
      window.removeEventListener("offline", sync);
    };
  }, []);

  if (!online) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
        <div className="w-16 h-16 rounded-2xl bg-red-500/15 flex items-center justify-center mb-4">
          <WifiOff className="text-red-400" size={28} />
        </div>
        <h2 className="text-lg font-bold">Connexion Internet requise</h2>
        <p className="text-sm text-[var(--muted)] mt-2 max-w-xs">
          Football Live a besoin d&apos;Internet pour afficher les scores en direct, classements et actualités.
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
