const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1";
const TOKENS_KEY = "swc:tokens";

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthUser {
  id: string;
  email: string;
}

export interface LoginResult extends AuthTokens {
  user: AuthUser;
  roles: string[];
  permissions: string[];
}

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.name = "ApiError";
  }
}

export function getStoredTokens(): AuthTokens | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(TOKENS_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuthTokens;
  } catch {
    return null;
  }
}

export function setStoredTokens(tokens: AuthTokens) {
  localStorage.setItem(TOKENS_KEY, JSON.stringify(tokens));
}

export function clearStoredTokens() {
  localStorage.removeItem(TOKENS_KEY);
}

interface Envelope<T> {
  success: boolean;
  data?: T;
  error?: { message: string };
}

async function rawRequest<T>(path: string, options: RequestInit, accessToken: string | null): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      ...options.headers,
    },
  });

  const body = (await res.json().catch(() => ({}))) as Envelope<T>;
  if (!res.ok || !body.success) {
    throw new ApiError(res.status, body.error?.message || `Request failed (${res.status})`);
  }
  return body.data as T;
}

let refreshInFlight: Promise<AuthTokens> | null = null;

async function refreshTokens(): Promise<AuthTokens> {
  const stored = getStoredTokens();
  if (!stored) throw new ApiError(401, "Not signed in");

  // Multiple 401s in flight at once should trigger exactly one refresh call.
  if (!refreshInFlight) {
    refreshInFlight = rawRequest<{ accessToken: string; refreshToken: string }>(
      "/auth/refresh",
      { method: "POST", body: JSON.stringify({ refreshToken: stored.refreshToken }) },
      null
    ).finally(() => {
      refreshInFlight = null;
    });
  }

  const tokens = await refreshInFlight;
  setStoredTokens(tokens);
  return tokens;
}

// Every authenticated call in the app goes through this so token attachment
// and the one-retry-on-401 refresh behavior only needs to be written once.
export async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const stored = getStoredTokens();

  try {
    return await rawRequest<T>(path, options, stored?.accessToken ?? null);
  } catch (err) {
    if (err instanceof ApiError && err.status === 401 && stored) {
      try {
        const refreshed = await refreshTokens();
        return await rawRequest<T>(path, options, refreshed.accessToken);
      } catch {
        clearStoredTokens();
        throw err;
      }
    }
    throw err;
  }
}
