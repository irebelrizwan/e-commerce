import { create } from "zustand";
import { hashPassword, verifyPassword, validateEmail, validatePasswordStrength } from "../utils/passwordUtils";
import { generateToken, saveSession, clearSession, getSession, restoreSession } from "../utils/sessionUtils";

export interface User {
  id: string;
  name: string;
  email: string;
}

interface StoredUser {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
}

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  isInitializing: boolean;
  login: (email: string, password: string) => Promise<{ error?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ error?: string }>;
  logout: () => void;
  initializeSession: () => Promise<void>;
}

// Database stored in localStorage
const USERS_DB_KEY = "registered_users_db";

// Initialize users database
function initializeUsersDB() {
  if (!localStorage.getItem(USERS_DB_KEY)) {
    const defaultUsers: StoredUser[] = [
      {
        id: "demo_user_1",
        name: "Demo User",
        email: "demo@Origin.com",
        passwordHash: hashPassword("password"),
      },
    ];
    localStorage.setItem(USERS_DB_KEY, JSON.stringify(defaultUsers));
  }
}

// Get all registered users
function getRegisteredUsers(): StoredUser[] {
  try {
    const data = localStorage.getItem(USERS_DB_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

// Save users to database
function saveRegisteredUsers(users: StoredUser[]): void {
  localStorage.setItem(USERS_DB_KEY, JSON.stringify(users));
}

// Generate unique user ID
function generateUserId(): string {
  return "user_" + Date.now() + "_" + Math.random().toString(36).substring(2, 9);
}

initializeUsersDB();

export const useAuth = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  isInitializing: true,

  login: async (email, password) => {
    await new Promise((r) => setTimeout(r, 600));

    // Validation
    if (!email.trim() || !password.trim()) {
      return { error: "Email and password are required." };
    }

    if (!validateEmail(email)) {
      return { error: "Please enter a valid email address." };
    }

    const users = getRegisteredUsers();
    const found = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && verifyPassword(password, u.passwordHash)
    );

    if (!found) {
      return { error: "Invalid email or password." };
    }

    // Create session
    const userData: User = { id: found.id, name: found.name, email: found.email };
    const token = generateToken(found.id, found.email);

    saveSession({
      user: userData,
      token,
      timestamp: Date.now(),
    });

    set({ user: userData, isAuthenticated: true });
    return {};
  },

  register: async (name, email, password) => {
    await new Promise((r) => setTimeout(r, 600));

    // Validation
    if (!name.trim() || !email.trim() || !password.trim()) {
      return { error: "All fields are required." };
    }

    if (name.trim().length < 2) {
      return { error: "Name must be at least 2 characters." };
    }

    if (!validateEmail(email)) {
      return { error: "Please enter a valid email address." };
    }

    const passwordValidation = validatePasswordStrength(password);
    if (!passwordValidation.isValid) {
      return { error: passwordValidation.errors[0] || "Password is too weak." };
    }

    const users = getRegisteredUsers();
    const exists = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

    if (exists) {
      return { error: "An account with this email already exists." };
    }

    // Create new user
    const newUser: StoredUser = {
      id: generateUserId(),
      name: name.trim(),
      email: email.trim(),
      passwordHash: hashPassword(password),
    };

    users.push(newUser);
    saveRegisteredUsers(users);

    // Create session
    const userData: User = { id: newUser.id, name: newUser.name, email: newUser.email };
    const token = generateToken(newUser.id, newUser.email);

    saveSession({
      user: userData,
      token,
      timestamp: Date.now(),
    });

    set({ user: userData, isAuthenticated: true });
    return {};
  },

  logout: () => {
    clearSession();
    set({ user: null, isAuthenticated: false });
  },

  initializeSession: async () => {
    await new Promise((r) => setTimeout(r, 300));
    const session = restoreSession();
    if (session) {
      set({ user: session.user, isAuthenticated: true, isInitializing: false });
    } else {
      set({ isInitializing: false });
    }
  },
}));
