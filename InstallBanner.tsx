"use client";

import { useEffect, useState } from "react";
import { Download, X } from "lucide-react";

export default function InstallBanner() {
  const [deferred, setDeferred] = useState<any>(null);
  const [visible, setVisible] = useState(false);
  const [iosHint, setIosHint] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem("fl_install_dismissed");
    if (dismissed) return;

    const isIos =
      /iphone|ipad|ipod/i.test(navigator.userAgent) &&
      !(window as any).MSStream &&
      !window.matchMedia("(display-mode: standalone)").matches;

    if (isIos) {
      setIosHint(true);
      setVisible(true);
      return;
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferred(e);
      setVisible(true);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-20 left-0 right-0 z-40 px-3 pointer-events-none">
      <div className="max-w-lg mx-auto pointer-events-auto glass border border-blue-500/30 rounded-2xl p-3 flex items-center gap-3 shadow-xl">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shrink-0">
          <Download size={18} className="text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold">Installer Football Live</p>
          <p className="text-[10px] text-[var(--muted)]">
            {iosHint
              ? "Safari → Partager → Sur l'écran d'accueil"
              : "Accès rapide depuis l'écran d'accueil"}
          </p>
        </div>
        {!iosHint && deferred && (
          <button
            className="text-xs font-bold bg-[var(--accent)] text-white px-3 py-2 rounded-xl"
            onClick={async () => {
              deferred.prompt();
              await deferred.userChoice;
              setVisible(false);
              setDeferred(null);
            }}
          >
            Installer
          </button>
        )}
        <button
          aria-label="Fermer"
          className="p-1 text-[var(--muted)]"
          onClick={() => {
            setVisible(false);
            sessionStorage.setItem("fl_install_dismissed", "1");
          }}
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
