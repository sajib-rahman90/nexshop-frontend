import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * Auth store — driven by Firebase Auth.
 * The actual Firebase listener is set up in FirebaseAuthProvider (src/components/FirebaseAuthProvider.jsx).
 * This store is the single source of truth consumed by all UI components.
 */
export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: true,

      /** Called by FirebaseAuthProvider when Firebase resolves the current user */
      setUser: (user) => {
        set({ user, isAuthenticated: !!user, isLoading: false });
      },

      /** Mark loading done (called when Firebase onAuthStateChanged fires with null) */
      setLoaded: () => {
        set({ isLoading: false });
      },

      /** Clear auth state on sign-out */
      logout: () => {
        set({ user: null, isAuthenticated: false, isLoading: false });
      },

      /** Optimistic user field updates (e.g. profile name change) */
      updateUser: (updates) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : state.user,
        }));
      },

      getUser: () => get().user,
    }),
    {
      name: "nexshop-auth",
      // Only persist user shape — never persist isLoading
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
