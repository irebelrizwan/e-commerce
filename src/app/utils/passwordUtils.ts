/**
 * Simple password hashing utility
 * Note: In production, use bcryptjs or similar library
 * This is a basic hash for demonstration purposes
 */

// Simple hash function (for demo only - use bcryptjs in production)
export function hashPassword(password: string): string {
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(36) + "_" + btoa(password.slice(-3));
}

// Verify password (compare against hash)
// Note: This is simplified for demo. In production, use bcryptjs.compare()
export function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash;
}

// Validate password strength
export function validatePasswordStrength(password: string): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (password.length < 6) {
    errors.push("Password must be at least 6 characters");
  }
  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain uppercase letter");
  }
  if (!/[a-z]/.test(password)) {
    errors.push("Password must contain lowercase letter");
  }
  if (!/[0-9]/.test(password)) {
    errors.push("Password must contain a number");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

// Validate email format
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
