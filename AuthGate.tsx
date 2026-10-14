"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { isOnboarded } from "../lib/session";

const PUBLIC = ["/onboarding", "/legal"];

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [ok, setOk] = useState(false);

  useEffect(() => {
    const publicPath = PUBLIC.some((p) => pathname === p || pathname.startsWith(p + "/"));
    if (publicPath) {
      setOk(true);
      setReady(true);
      return;
    }
    if (!isOnboarded()) {
      router.replace("/onboarding");
      setReady(true);
      return;
    }
    setOk(true);
    setReady(true);
  }, [pathname, router]);

  if (!ready) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!ok) return null;
  return <>{children}</>;
}
