"use client";

import { motion } from "framer-motion";
import { Sparkles, Users, ShieldCheck, Globe, Award, ArrowRight, Cpu, Zap, HeartHandshake } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

const STATS = [
  { value: "2.4M+", label: "Happy Customers" },
  { value: "15,000+", label: "Products Listed" },
  { value: "98.7%", label: "Satisfaction Rate" },
  { value: "50+", label: "Countries Served" },
];

const TEAM = [
  { name: "Dr. Aria Chen", role: "Founder & CEO", initials: "AC", gradient: "from-blue-500 to-purple-500" },
  { name: "Marcus Webb", role: "CTO & Co-Founder", initials: "MW", gradient: "from-emerald-500 to-teal-500" },
  { name: "Sofia Reyes", role: "Head of AI Research", initials: "SR", gradient: "from-orange-500 to-rose-500" },
  { name: "Kai Nakamura", role: "VP of Product", initials: "KN", gradient: "from-indigo-500 to-blue-500" },
];

const VALUES = [
  {
    icon: <Cpu size={24} />,
    title: "AI at the Core",
    description: "Every product recommendation, every search result, every price prediction — powered by cutting-edge machine learning models trained on billions of signals.",
  },
  {
    icon: <ShieldCheck size={24} />,
    title: "Trust & Transparency",
    description: "We believe you should always know why a product is being recommended. Our AI explains its reasoning, building trust through radical transparency.",
  },
  {
    icon: <Zap size={24} />,
    title: "Lightning Fast",
    description: "Our infrastructure is built for speed. Sub-100ms search results, instant page loads, and real-time inventory updates keep you moving.",
  },
  {
    icon: <HeartHandshake size={24} />,
    title: "Customer Obsessed",
    description: "We measure our success purely by how happy our customers are. Every feature, every design decision, every policy starts with the customer.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--background)" }}>

      {/* Hero */}
      <section className="relative overflow-hidden py-24 lg:py-32">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[120px] opacity-10" />
          <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[120px] opacity-10" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 text-sm font-medium mb-6">
            <Sparkles size={14} />
            Our Story
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight" style={{ color: "var(--foreground)" }}>
            We're reimagining what<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-emerald-500">shopping can be</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-xl opacity-70 leading-relaxed max-w-2xl mx-auto" style={{ color: "var(--foreground)" }}>
            NexShop was founded in 2022 on a simple belief: that artificial intelligence can make every person a better, smarter, and more confident shopper.
          </motion.p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-y border-gray-100 dark:border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS.map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
                <p className="text-4xl font-black text-blue-500 mb-1">{stat.value}</p>
                <p className="text-sm opacity-60" style={{ color: "var(--foreground)" }}>{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-blue-500 mb-4">Our Mission</p>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-6" style={{ color: "var(--foreground)" }}>
                Making the best technology accessible to everyone
              </h2>
              <p className="text-base opacity-70 leading-relaxed mb-6" style={{ color: "var(--foreground)" }}>
                The world's most advanced technology is gatekept behind jargon, complexity, and opacity. We change that by combining an extraordinary product catalogue with an AI that helps you understand exactly what you're buying and why it matters to your life.
              </p>
              <p className="text-base opacity-70 leading-relaxed" style={{ color: "var(--foreground)" }}>
                From neural interfaces to smart home ecosystems, we curate only the products we'd use ourselves — and our AI makes sure you only see what's genuinely right for you.
              </p>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-blue-500/20 to-emerald-500/20 rounded-3xl blur-2xl" />
              <div className="relative grid grid-cols-2 gap-4">
                {VALUES.map((val, i) => (
                  <motion.div key={val.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="p-5 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900/50">
                    <div className="text-blue-500 mb-3">{val.icon}</div>
                    <h3 className="font-bold text-sm mb-1" style={{ color: "var(--foreground)" }}>{val.title}</h3>
                    <p className="text-xs opacity-60 leading-relaxed" style={{ color: "var(--foreground)" }}>{val.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-blue-500 mb-4">The Team</p>
            <h2 className="text-3xl font-bold" style={{ color: "var(--foreground)" }}>Built by obsessives, for everyone</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM.map((member, i) => (
              <motion.div key={member.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${member.gradient} flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4 shadow-lg`}>
                  {member.initials}
                </div>
                <p className="font-bold text-sm" style={{ color: "var(--foreground)" }}>{member.name}</p>
                <p className="text-xs opacity-60 mt-0.5" style={{ color: "var(--foreground)" }}>{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h2 className="text-3xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Ready to experience the future?</h2>
          <p className="opacity-60 mb-8" style={{ color: "var(--foreground)" }}>Join 2.4 million shoppers who've already made the switch to AI-powered commerce.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button as={Link} href="/explore" color="primary" size="lg" endContent={<ArrowRight size={18} />}>Start Shopping</Button>
            <Button as={Link} href="/ai" variant="flat" size="lg" startContent={<Sparkles size={18} />}>Talk to Nex AI</Button>
          </div>
        </div>
      </section>

    </div>
  );
}
