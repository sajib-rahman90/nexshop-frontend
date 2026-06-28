"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { firebaseForgotPassword } from "@/lib/firebase";

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors }, getValues } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await firebaseForgotPassword(data.email);
      setSent(true);
      toast.success("Reset email sent! Check your inbox.");
    } catch (err) {
      if (err.code === "auth/user-not-found") {
        toast.error("No account found with this email.");
      } else {
        toast.error("Failed to send reset email. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4" style={{ background: "var(--background)" }}>
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xl p-8"
          style={{ background: "var(--background)" }}
        >
          <div className="text-center mb-8">
            <Link href="/"><span className="text-3xl font-bold tracking-tighter text-blue-500">Nex<span className="text-emerald-500">Shop</span></span></Link>
            {sent ? (
              <>
                <div className="w-16 h-16 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center mx-auto mt-6 mb-4">
                  <CheckCircle size={32} className="text-green-500" />
                </div>
                <h1 className="text-2xl font-bold mb-2" style={{ color: "var(--foreground)" }}>Check your email</h1>
                <p className="text-sm opacity-60" style={{ color: "var(--foreground)" }}>
                  We sent a password reset link to <strong>{getValues("email")}</strong>
                </p>
                <Button as={Link} href="/login" color="primary" className="w-full mt-8 font-semibold" size="lg">
                  Back to Sign In
                </Button>
              </>
            ) : (
              <>
                <h1 className="text-2xl font-bold mt-4 mb-1" style={{ color: "var(--foreground)" }}>Forgot password?</h1>
                <p className="text-sm opacity-60" style={{ color: "var(--foreground)" }}>
                  Enter your email and we'll send you a reset link.
                </p>
                <form onSubmit={handleSubmit(onSubmit)} className="text-left mt-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5 opacity-80" style={{ color: "var(--foreground)" }}>Email address</label>
                    <div className="relative">
                      <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 opacity-40" style={{ color: "var(--foreground)" }} />
                      <input
                        type="email"
                        placeholder="you@example.com"
                        {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email" } })}
                        className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${errors.email ? "border-red-400" : "border-gray-200 dark:border-gray-700"}`}
                        style={{ background: "var(--background)", color: "var(--foreground)" }}
                      />
                    </div>
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                  </div>
                  <Button type="submit" color="primary" className="w-full font-semibold" size="lg" isLoading={isLoading}>
                    Send Reset Link
                  </Button>
                </form>
                <Link href="/login" className="flex items-center justify-center gap-2 mt-5 text-sm opacity-60 hover:opacity-100 transition-opacity" style={{ color: "var(--foreground)" }}>
                  <ArrowLeft size={15} /> Back to Sign In
                </Link>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
