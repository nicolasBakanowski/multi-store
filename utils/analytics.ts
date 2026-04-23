"use client";

type TrackEventInput = {
  name: string;
  properties?: Record<string, unknown>;
  userId?: string | null;
};

function isDevEnabled() {
  return process.env.NODE_ENV !== "production";
}

function safeUUID(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return (crypto as any).randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function getOrCreateAnonymousId(): string {
  const key = "ms_anonymous_id";
  try {
    const existing = localStorage.getItem(key);
    if (existing) return existing;
    const id = safeUUID();
    localStorage.setItem(key, id);
    return id;
  } catch {
    return safeUUID();
  }
}

export function getOrCreateSessionId(): string {
  const key = "ms_session_id";
  try {
    const existing = sessionStorage.getItem(key);
    if (existing) return existing;
    const id = safeUUID();
    sessionStorage.setItem(key, id);
    return id;
  } catch {
    return safeUUID();
  }
}

function parseUtm() {
  try {
    const url = new URL(window.location.href);
    return {
      utmSource: url.searchParams.get("utm_source"),
      utmMedium: url.searchParams.get("utm_medium"),
      utmCampaign: url.searchParams.get("utm_campaign"),
      utmContent: url.searchParams.get("utm_content"),
      utmTerm: url.searchParams.get("utm_term"),
    };
  } catch {
    return {
      utmSource: null,
      utmMedium: null,
      utmCampaign: null,
      utmContent: null,
      utmTerm: null,
    };
  }
}

export async function trackEvent(input: TrackEventInput) {
  if (!isDevEnabled()) return;
  if (typeof window === "undefined") return;

  const anonymousId = getOrCreateAnonymousId();
  const sessionId = getOrCreateSessionId();
  const utm = parseUtm();

  const payload = {
    eventId: safeUUID(),
    name: input.name,
    timestamp: new Date().toISOString(),
    userId: input.userId ?? null,
    anonymousId,
    sessionId,
    platform: "web",
    appVersion: null,
    path: window.location.pathname + window.location.search,
    referrer: document.referrer || null,
    ...utm,
    properties: input.properties ?? {},
  };

  try {
    await fetch("/api/analytics/events", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    });
  } catch {
    // best-effort
  }
}

