"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";

export default function FirebaseAuthProvider({ children }) {
  const setUser = useAuthStore((s) => s.setUser);
  const setLoaded = useAuthStore((s) => s.setLoaded);

  useEffect(() => {
    // Guard: don't crash if Firebase env vars aren't set yet
    const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
    if (!apiKey || apiKey === "your_api_key_here") {
      console.warn("[FirebaseAuthProvider] Firebase not configured — auth disabled.");
      setLoaded();
      return;
    }

    let unsubscribe = () => {};

    import("@/lib/firebase")
      .then(({ auth, onAuthStateChanged, formatFirebaseUser }) => {
        unsubscribe = onAuthStateChanged(auth, (fbUser) => {
          if (fbUser) {
            setUser(formatFirebaseUser(fbUser));
          } else {
            setUser(null);
            setLoaded();
          }
        });
      })
      .catch((err) => {
        console.error("[FirebaseAuthProvider] Failed to load Firebase:", err);
        setLoaded();
      });

    return () => unsubscribe();
  }, [setUser, setLoaded]);

  return children;
}
