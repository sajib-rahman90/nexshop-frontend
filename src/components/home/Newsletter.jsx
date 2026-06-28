"use client";

import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    toast.success("You're subscribed! Welcome to the future. 🚀");
  };

  return (
    <section className="py-20 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)" }}>
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full filter blur-[120px] opacity-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-emerald-500 rounded-full filter blur-[100px] opacity-15 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-4">Newsletter</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Stay ahead of the AI curve
          </h2>
          <p className="text-gray-400 mb-8 text-base">
            Exclusive offers, early access to new products, and the latest in AI technology — straight to your inbox.
          </p>

          {subscribed ? (
            <div className="flex items-center justify-center gap-3 py-5">
              <CheckCircle size={24} className="text-emerald-400" />
              <span className="text-white font-semibold">You&apos;re subscribed! Welcome aboard. 🎉</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="flex-1 px-4 py-3 rounded-xl border border-gray-600 bg-gray-800/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
              />
              <button
                type="submit"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-colors text-sm whitespace-nowrap"
              >
                <Send size={16} />
                Subscribe
              </button>
            </form>
          )}

          <p className="text-xs text-gray-600 mt-4">We respect your privacy. Unsubscribe at any time.</p>
        </div>
      </div>
    </section>
  );
}
