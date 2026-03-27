import { useEffect } from "react";
import { useAuth } from "../store/authStore";

/**
 * Hook to initialize authentication session on app load
 * Restores user session from localStorage if available
 */
export function useInitializeAuth() {
  const { initializeSession } = useAuth();

  useEffect(() => {
    initializeSession();
  }, [initializeSession]);
}
