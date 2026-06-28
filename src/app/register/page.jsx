"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useAuthStore } from "@/store/authStore";
import { firebaseRegister, firebaseGoogleSignIn, formatFirebaseUser } from "@/lib/firebase";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const password = watch("password");

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const fbUser = await firebaseRegister({
        name: data.name,
        email: data.email,
        password: data.password,
      });
      setUser(formatFirebaseUser(fbUser));
      toast.success(`Account created! Welcome, ${data.name}! 🎉`);
      router.push("/dashboard");
    } catch (err) {
      const msg = getFirebaseErrorMessage(err.code);
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    try {
      const fbUser = await firebaseGoogleSignIn();
      setUser(formatFirebaseUser(fbUser));
      toast.success(`Welcome, ${fbUser.displayName}! 🎉`);
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
              Create your account
            </h1>
            <p className="text-sm opacity-60" style={{ color: "var(--foreground)" }}>
              Join NexShop and discover the future of shopping
            </p>
          </div>

          {/* Google Sign-Up */}
          <Button
            className="w-full mb-5 font-medium border border-gray-200 dark:border-gray-700"
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
            Sign up with Google
          </Button>

          <div className="relative mb-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-gray-700" />
            </div>
            <div className="relative flex justify-center">
              <span
                className="px-3 text-xs opacity-50"
                style={{ background: "var(--background)", color: "var(--foreground)" }}
              >
                or sign up with email
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <div>
              <label
                className="block text-sm font-medium mb-1.5 opacity-80"
                style={{ color: "var(--foreground)" }}
              >
                Full name
              </label>
              <div className="relative">
                <User
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 opacity-40"
                  style={{ color: "var(--foreground)" }}
                />
                <input
                  type="text"
                  placeholder="John Doe"
                  {...register("name", {
                    required: "Name is required",
                    minLength: { value: 2, message: "Min 2 characters" },
                  })}
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                    errors.name ? "border-red-400" : "border-gray-200 dark:border-gray-700"
                  }`}
                  style={{ background: "var(--background)", color: "var(--foreground)" }}
                />
              </div>
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
              )}
            </div>

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
                    pattern: {
                      value: /^\S+@\S+\.\S+$/,
                      message: "Invalid email address",
                    },
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
              <label
                className="block text-sm font-medium mb-1.5 opacity-80"
                style={{ color: "var(--foreground)" }}
              >
                Password
              </label>
              <div className="relative">
                <Lock
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 opacity-40"
                  style={{ color: "var(--foreground)" }}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Min. 8 characters"
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 8, message: "Min 8 characters" },
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

            {/* Confirm Password */}
            <div>
              <label
                className="block text-sm font-medium mb-1.5 opacity-80"
                style={{ color: "var(--foreground)" }}
              >
                Confirm password
              </label>
              <div className="relative">
                <Lock
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 opacity-40"
                  style={{ color: "var(--foreground)" }}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Re-enter password"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (val) =>
                      val === password || "Passwords do not match",
                  })}
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                    errors.confirmPassword
                      ? "border-red-400"
                      : "border-gray-200 dark:border-gray-700"
                  }`}
                  style={{ background: "var(--background)", color: "var(--foreground)" }}
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                id="terms"
                {...register("terms", { required: "You must accept the terms" })}
                className="mt-0.5 rounded accent-blue-500"
              />
              <label
                htmlFor="terms"
                className="text-xs opacity-70"
                style={{ color: "var(--foreground)" }}
              >
                I agree to the{" "}
                <Link href="/terms" className="text-blue-500 hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-blue-500 hover:underline">
                  Privacy Policy
                </Link>
              </label>
            </div>
            {errors.terms && (
              <p className="text-red-500 text-xs -mt-2">{errors.terms.message}</p>
            )}

            <Button
              type="submit"
              color="primary"
              className="w-full font-semibold"
              size="lg"
              isLoading={isLoading}
            >
              Create Account
            </Button>
          </form>

          <p
            className="text-center text-sm opacity-60 mt-6"
            style={{ color: "var(--foreground)" }}
          >
            Already have an account?{" "}
            <Link href="/login" className="text-blue-500 font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

function getFirebaseErrorMessage(code) {
  const map = {
    "auth/email-already-in-use": "An account with this email already exists.",
    "auth/invalid-email": "Please enter a valid email address.",
    "auth/weak-password": "Password is too weak. Use at least 8 characters.",
    "auth/network-request-failed": "Network error. Check your connection.",
    "auth/too-many-requests": "Too many attempts. Please try again later.",
  };
  return map[code] || "Registration failed. Please try again.";
}
