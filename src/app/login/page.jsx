"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, Sparkles, Chrome } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useAuthStore } from "@/store/authStore";
import { firebaseLogin, firebaseGoogleSignIn, firebaseRegister, formatFirebaseUser } from "@/lib/firebase";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const fbUser = await firebaseLogin(data);
      const formattedUser = formatFirebaseUser(fbUser);
      setUser(formattedUser);
      toast.success(`Welcome back, ${fbUser.displayName || fbUser.email}!`);
      router.push(formattedUser.role === "admin" ? "/admin" : "/dashboard");
    } catch (err) {
      const msg = getFirebaseErrorMessage(err.code);
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async (role) => {
    const email = role === "admin" ? "admin@demo.com" : "user@demo.com";
    const password = "password123";
    const name = role === "admin" ? "Admin User" : "Demo User";
    
    setIsLoading(true);
    try {
      try {
        const fbUser = await firebaseLogin({ email, password });
        const formattedUser = formatFirebaseUser(fbUser);
        setUser(formattedUser);
        toast.success(`Welcome back, ${name}!`);
        router.push(role === "admin" ? "/admin" : "/dashboard");
      } catch (err) {
        if (err.code === "auth/user-not-found" || err.code === "auth/invalid-credential") {
          const fbUser = await firebaseRegister({ name, email, password });
          const formattedUser = formatFirebaseUser(fbUser);
          setUser(formattedUser);
          toast.success(`Demo account created! Welcome, ${name}!`);
          router.push(role === "admin" ? "/admin" : "/dashboard");
        } else {
          throw err;
        }
      }
    } catch (err) {
      toast.error(getFirebaseErrorMessage(err.code));
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    try {
      const fbUser = await firebaseGoogleSignIn();
      setUser(formatFirebaseUser(fbUser));
      toast.success(`Welcome, ${fbUser.displayName}!`);
      router.push("/dashboard");
    } catch (err) {
      if (err.code !== "auth/popup-closed-by-user") {
        toast.error("Google sign-in failed. Please try again.");
      }
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div
      className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4"
      style={{ background: "var(--background)" }}
    >
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xl p-8"
          style={{ background: "var(--background)" }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <Link href="/">
              <span className="text-3xl font-bold tracking-tighter text-blue-500">
                Nex<span className="text-emerald-500">Shop</span>
              </span>
            </Link>
            <h1
              className="text-2xl font-bold mt-4 mb-1"
              style={{ color: "var(--foreground)" }}
            >
              Welcome back
            </h1>
            <p
              className="text-sm opacity-60"
              style={{ color: "var(--foreground)" }}
            >
              Sign in to your account to continue
            </p>
          </div>

          {/* Google Sign-In */}
          <Button
            className="w-full mb-3 font-medium border border-gray-200 dark:border-gray-700"
            variant="flat"
            size="lg"
            onPress={handleGoogleSignIn}
            isLoading={isGoogleLoading}
            startContent={
              !isGoogleLoading && (
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              )
            }
          >
            Continue with Google
          </Button>

          <div className="grid grid-cols-2 gap-3 mb-5">
            <Button
              className="w-full font-medium bg-emerald-50 text-emerald-600 hover:bg-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400 dark:hover:bg-emerald-900/40 border border-emerald-200 dark:border-emerald-800"
              size="sm"
              onPress={() => handleDemoLogin("admin")}
              isLoading={isLoading}
            >
              Demo Admin
            </Button>
            <Button
              className="w-full font-medium bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/40 border border-blue-200 dark:border-blue-800"
              size="sm"
              onPress={() => handleDemoLogin("user")}
              isLoading={isLoading}
            >
              Demo User
            </Button>
          </div>

          <div className="relative mb-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-gray-700" />
            </div>
            <div className="relative flex justify-center">
              <span
                className="px-3 text-xs opacity-50"
                style={{ background: "var(--background)", color: "var(--foreground)" }}
              >
                or sign in with email
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
            <div>
              <label
                className="block text-sm font-medium mb-1.5 opacity-80"
                style={{ color: "var(--foreground)" }}
              >
                Email address
              </label>
              <div className="relative">
                <Mail
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 opacity-40"
                  style={{ color: "var(--foreground)" }}
                />
                <input
                  type="email"
                  placeholder="you@example.com"
                  {...register("email", {
                    required: "Email is required",
                    pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email" },
                  })}
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                    errors.email ? "border-red-400" : "border-gray-200 dark:border-gray-700"
                  }`}
                  style={{ background: "var(--background)", color: "var(--foreground)" }}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label
                  className="text-sm font-medium opacity-80"
                  style={{ color: "var(--foreground)" }}
                >
                  Password
                </label>
                <Link href="/forgot-password" className="text-xs text-blue-500 hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 opacity-40"
                  style={{ color: "var(--foreground)" }}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Min 6 characters" },
                  })}
                  className={`w-full pl-10 pr-11 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                    errors.password ? "border-red-400" : "border-gray-200 dark:border-gray-700"
                  }`}
                  style={{ background: "var(--background)", color: "var(--foreground)" }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 opacity-40 hover:opacity-70 transition-opacity"
                >
                  {showPassword ? (
                    <EyeOff size={16} style={{ color: "var(--foreground)" }} />
                  ) : (
                    <Eye size={16} style={{ color: "var(--foreground)" }} />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
              )}
            </div>

            <Button
              type="submit"
              color="primary"
              className="w-full font-semibold"
              size="lg"
              isLoading={isLoading}
            >
              Sign In
            </Button>
          </form>

          <p
            className="text-center text-sm opacity-60 mt-6"
            style={{ color: "var(--foreground)" }}
          >
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-blue-500 font-medium hover:underline">
              Create one
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

/** Map Firebase error codes to human-friendly messages */
function getFirebaseErrorMessage(code) {
  const map = {
    "auth/user-not-found": "No account found with this email.",
    "auth/wrong-password": "Incorrect password. Please try again.",
    "auth/invalid-credential": "Invalid email or password.",
    "auth/invalid-email": "Please enter a valid email address.",
    "auth/too-many-requests": "Too many attempts. Please try again later.",
    "auth/user-disabled": "This account has been disabled.",
    "auth/network-request-failed": "Network error. Check your connection.",
  };
  return map[code] || "Sign in failed. Please try again.";
}
