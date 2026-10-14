"use client";

export type UserSession = {
  id: string;
  name: string;
  email: string;
  picture?: string;
  country: string;
  provider: "google" | "local";
  premium: boolean;
  createdAt: string;
};

const KEY = "fl_session_v1";
const ONBOARD_KEY = "fl_onboarded_v1";

export function getSession(): UserSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as UserSession) : null;
  } catch {
    return null;
  }
}

export function setSession(user: UserSession) {
  localStorage.setItem(KEY, JSON.stringify(user));
  localStorage.setItem(ONBOARD_KEY, "1");
}

export function clearSession() {
  localStorage.removeItem(KEY);
}

export function isOnboarded(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(ONBOARD_KEY) === "1" && !!getSession();
}

/** Simulated Google sign-in until real OAuth keys are set */
export function signInWithGoogleDemo(country: string): UserSession {
  const user: UserSession = {
    id: "g_" + Math.random().toString(36).slice(2, 10),
    name: "Utilisateur Google",
    email: "user@gmail.com",
    picture: "",
    country,
    provider: "google",
    premium: false,
    createdAt: new Date().toISOString(),
  };
  setSession(user);
  return user;
}
