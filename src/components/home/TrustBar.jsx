"use client";

import { Truck, RotateCcw, ShieldCheck, Headset } from "lucide-react";

const TRUST = [
  { icon: <Truck size={22} />, label: "Free Shipping", sub: "On orders over $50" },
  { icon: <RotateCcw size={22} />, label: "30-Day Returns", sub: "No questions asked" },
  { icon: <ShieldCheck size={22} />, label: "Buyer Protection", sub: "100% secure payments" },
  { icon: <Headset size={22} />, label: "24/7 AI Support", sub: "Always here to help" },
];

export function TrustBar() {
  return (
    <section className="py-10 border-y border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {TRUST.map((item) => (
            <div key={item.label} className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-500 flex items-center justify-center shrink-0">
                {item.icon}
              </div>
              <div>
                <p className="font-semibold text-sm" style={{ color: "var(--foreground)" }}>{item.label}</p>
                <p className="text-xs opacity-60" style={{ color: "var(--foreground)" }}>{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
