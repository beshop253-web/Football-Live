"use client";

import { useEffect, useState } from "react";
import { getSession } from "../lib/session";

type Props = {
  slot?: "home" | "matches" | "news";
  className?: string;
};

/**
 * Ad slot. When NEXT_PUBLIC_ADSENSE_CLIENT is set, loads real AdSense.
 * Premium users see no ads. Until keys exist, shows a labeled placeholder
 * so layout and revenue path are ready.
 */
export default function AdBanner({ slot = "home", className = "" }: Props) {
  const [show, setShow] = useState(false);
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "";

  useEffect(() => {
    const s = getSession();
    if (s?.premium) {
      setShow(false);
      return;
    }
    setShow(true);
  }, []);

  if (!show) return null;

  // Real AdSense when configured
  if (client && client.startsWith("ca-pub-")) {
    return (
      <div className={`w-full flex justify-center my-3 ${className}`}>
        <ins
          className="adsbygoogle"
          style={{ display: "block", minHeight: 90, width: "100%" }}
          data-ad-client={client}
          data-ad-slot={
            process.env[
              `NEXT_PUBLIC_ADSENSE_SLOT_${slot.toUpperCase()}` as keyof NodeJS.ProcessEnv
            ] || ""
          }
          data-ad-format="horizontal"
          data-full-width-responsive="true"
        />
      </div>
    );
  }

  // Placeholder until AdSense ID is provided (still marks ad inventory)
  return (
    <div
      className={`my-3 mx-auto w-full max-w-lg rounded-xl border border-dashed border-blue-500/30 bg-slate-900/60 px-3 py-4 text-center ${className}`}
      data-ad-slot={slot}
    >
      <p className="text-[10px] uppercase tracking-wider text-slate-500">Publicité</p>
      <p className="text-xs text-slate-400 mt-1">
        Espace pub · configure NEXT_PUBLIC_ADSENSE_CLIENT pour activer AdSense
      </p>
    </div>
  );
}
