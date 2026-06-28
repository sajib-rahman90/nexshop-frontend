import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "firebase/auth";

// ─── Firebase config ─────────────────────────────────────────────────────────
// Add your Firebase project credentials to frontend/.env.local
// All NEXT_PUBLIC_ vars are required for the client-side SDK to work.
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Prevent duplicate initialisation during Next.js HMR
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// ─── Auth helpers ─────────────────────────────────────────────────────────────

/**
 * Register with email + password, then set displayName.
 */
export const firebaseRegister = async ({ name, email, password }) => {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(cred.user, { displayName: name });
  return cred.user;
};

/**
 * Login with email + password.
 */
export const firebaseLogin = async ({ email, password }) => {
  const cred = await signInWithEmailAndPassword(auth, email, password);
  return cred.user;
};

/**
 * Sign in with Google popup.
 */
export const firebaseGoogleSignIn = async () => {
  const cred = await signInWithPopup(auth, googleProvider);
  return cred.user;
};

/**
 * Sign out current user.
 */
export const firebaseSignOut = async () => {
  await signOut(auth);
};

/**
 * Send password reset email.
 */
export const firebaseForgotPassword = async (email) => {
  await sendPasswordResetEmail(auth, email);
};

/**
 * Convert a Firebase user object to a plain user shape the app uses.
 */
export const formatFirebaseUser = (fbUser) => ({
  uid: fbUser.uid,
  name: fbUser.displayName || fbUser.email.split("@")[0],
  email: fbUser.email,
  avatar: fbUser.photoURL || null,
  role: fbUser.email === "admin@demo.com" ? "admin" : "customer",
  emailVerified: fbUser.emailVerified,
});

export { onAuthStateChanged };
export default app;
