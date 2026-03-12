import { create } from "zustand";

interface User {
  name: string;
  email: string;
}

interface AuthStore {
  user: User | null;
  login: (email: string, password: string) => Promise<{ error?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ error?: string }>;
  logout: () => void;
}

// Mock user store (simulates a small "database" of registered users)
const registeredUsers: { name: string; email: string; password: string }[] = [
  { name: "Demo User", email: "demo@Origin.com", password: "password" },
];

export const useAuth = create<AuthStore>((set) => ({
  user: null,

  login: async (email, password) => {
    await new Promise((r) => setTimeout(r, 600));
    const found = registeredUsers.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!found) return { error: "Invalid email or password." };
    set({ user: { name: found.name, email: found.email } });
    return {};
  },

  register: async (name, email, password) => {
    await new Promise((r) => setTimeout(r, 600));
    const exists = registeredUsers.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );
    if (exists) return { error: "An account with this email already exists." };
    registeredUsers.push({ name, email, password });
    set({ user: { name, email } });
    return {};
  },

  logout: () => set({ user: null }),
}));
