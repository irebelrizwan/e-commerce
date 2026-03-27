/**
 * Session management utilities
 * Handles JWT-like tokens and localStorage persistence
 */

const SESSION_KEY = "auth_session";
const TOKEN_KEY = "auth_token";

export interface SessionData {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
  timestamp: number;
}

// Generate a mock JWT token
export function generateToken(userId: string, email: string): string {
  const payload = {
    sub: userId,
    email,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60, // 7 days
  };
  return btoa(JSON.stringify(payload)) + "." + Math.random().toString(36).substring(2);
}

// Save session to localStorage
export function saveSession(sessionData: SessionData): void {
  localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
  localStorage.setItem(TOKEN_KEY, sessionData.token);
}

// Get session from localStorage
export function getSession(): SessionData | null {
  try {
    const session = localStorage.getItem(SESSION_KEY);
    return session ? JSON.parse(session) : null;
  } catch {
    return null;
  }
}

// Get token from localStorage
export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

// Clear session from localStorage
export function clearSession(): void {
  localStorage.removeItem(SESSION_KEY);
  localStorage.removeItem(TOKEN_KEY);
}

// Check if session is still valid (not expired)
export function isSessionValid(sessionData: SessionData | null): boolean {
  if (!sessionData) return false;

  const tokenExpiry = Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60; // 7 days
  const sessionAge = Date.now() - sessionData.timestamp;
  const maxAge = 7 * 24 * 60 * 60 * 1000; // 7 days in ms

  return sessionAge < maxAge;
}

// Restore session on app load
export function restoreSession(): SessionData | null {
  const session = getSession();
  if (session && isSessionValid(session)) {
    return session;
  }
  clearSession();
  return null;
}
