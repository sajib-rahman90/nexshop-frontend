"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Phone, MapPin, Camera, Save, ShieldCheck, Bell, Eye, EyeOff, LogOut } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Chip } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import toast from "react-hot-toast";
import { useEffect } from "react";

const TABS = ["Profile", "Security", "Notifications", "Preferences"];

export default function ProfilePage() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Profile");
  const [showCurrentPw, setShowCurrentPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);
  const [profileForm, setProfileForm] = useState({ name: "", email: "", phone: "", location: "" });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) { router.replace("/login"); return; }
    setProfileForm({ name: user?.name || "", email: user?.email || "", phone: "+1 (555) 000-0000", location: "San Francisco, CA" });
  }, [isAuthenticated, user, router]);

  if (!isAuthenticated || !user) return null;

  const handleSaveProfile = async () => {
    setIsSaving(true);
    await new Promise((r) => setTimeout(r, 900));
    toast.success("Profile saved successfully!");
    setIsSaving(false);
  };

  const handleLogout = () => {
    logout();
    toast.success("Logged out");
    router.push("/");
  };

  return (
    <div className="min-h-screen py-10" style={{ background: "var(--background)" }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">

        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold" style={{ color: "var(--foreground)" }}>Account Settings</h1>
          <Button variant="flat" color="danger" size="sm" startContent={<LogOut size={15} />} onPress={handleLogout}>Log Out</Button>
        </div>

        {/* Profile Header Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl border border-gray-100 dark:border-gray-800 p-6 mb-6 flex items-center gap-6 bg-gradient-to-r from-blue-50 to-emerald-50 dark:from-blue-900/10 dark:to-emerald-900/10">
          <div className="relative shrink-0">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center text-white text-3xl font-black shadow-lg">
              {user.name?.[0]?.toUpperCase()}
            </div>
            <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-blue-500 text-white flex items-center justify-center shadow hover:bg-blue-600 transition-colors">
              <Camera size={13} />
            </button>
          </div>
          <div>
            <p className="text-xl font-bold" style={{ color: "var(--foreground)" }}>{user.name}</p>
            <p className="text-sm opacity-60" style={{ color: "var(--foreground)" }}>{user.email}</p>
            <Chip size="sm" variant="flat" className="mt-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
              {user.role || "Customer"}
            </Chip>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-800 mb-6 gap-1 overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-3 text-sm font-medium whitespace-nowrap transition-all border-b-2 -mb-px ${
                activeTab === tab ? "border-blue-500 text-blue-500" : "border-transparent opacity-60 hover:opacity-100"
              }`}
              style={activeTab !== tab ? { color: "var(--foreground)" } : {}}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>

          {activeTab === "Profile" && (
            <div className="rounded-2xl border border-gray-100 dark:border-gray-800 p-6 space-y-5" style={{ background: "var(--background)" }}>
              <h2 className="text-lg font-bold" style={{ color: "var(--foreground)" }}>Personal Information</h2>
              {[
                { label: "Full Name", key: "name", icon: <User size={16} />, type: "text", placeholder: "Your name" },
                { label: "Email Address", key: "email", icon: <Mail size={16} />, type: "email", placeholder: "you@example.com" },
                { label: "Phone Number", key: "phone", icon: <Phone size={16} />, type: "tel", placeholder: "+1 (555) 000-0000" },
                { label: "Location", key: "location", icon: <MapPin size={16} />, type: "text", placeholder: "City, State" },
              ].map(({ label, key, icon, type, placeholder }) => (
                <div key={key}>
                  <label className="block text-sm font-medium mb-1.5 opacity-80" style={{ color: "var(--foreground)" }}>{label}</label>
                  <div className="relative">
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 opacity-40" style={{ color: "var(--foreground)" }}>{icon}</div>
                    <input
                      type={type}
                      value={profileForm[key]}
                      onChange={(e) => setProfileForm((f) => ({ ...f, [key]: e.target.value }))}
                      placeholder={placeholder}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      style={{ background: "var(--background)", color: "var(--foreground)" }}
                    />
                  </div>
                </div>
              ))}
              <Button color="primary" startContent={<Save size={16} />} onPress={handleSaveProfile} isLoading={isSaving}>
                Save Changes
              </Button>
            </div>
          )}

          {activeTab === "Security" && (
            <div className="rounded-2xl border border-gray-100 dark:border-gray-800 p-6 space-y-5" style={{ background: "var(--background)" }}>
              <h2 className="text-lg font-bold" style={{ color: "var(--foreground)" }}>Change Password</h2>
              {[
                { label: "Current Password", show: showCurrentPw, setShow: setShowCurrentPw },
                { label: "New Password", show: showNewPw, setShow: setShowNewPw },
              ].map(({ label, show, setShow }) => (
                <div key={label}>
                  <label className="block text-sm font-medium mb-1.5 opacity-80" style={{ color: "var(--foreground)" }}>{label}</label>
                  <div className="relative">
                    <input
                      type={show ? "text" : "password"}
                      placeholder="••••••••••"
                      className="w-full pl-4 pr-11 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      style={{ background: "var(--background)", color: "var(--foreground)" }}
                    />
                    <button type="button" onClick={() => setShow(!show)} className="absolute right-3.5 top-1/2 -translate-y-1/2 opacity-40 hover:opacity-70 transition-opacity">
                      {show ? <EyeOff size={16} style={{ color: "var(--foreground)" }} /> : <Eye size={16} style={{ color: "var(--foreground)" }} />}
                    </button>
                  </div>
                </div>
              ))}
              <Button color="primary" startContent={<ShieldCheck size={16} />} onPress={() => toast.success("Password updated!")}>
                Update Password
              </Button>

              <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                <h3 className="font-semibold text-sm mb-3" style={{ color: "var(--foreground)" }}>Two-Factor Authentication</h3>
                <p className="text-sm opacity-60 mb-3" style={{ color: "var(--foreground)" }}>Add an extra layer of security to your account.</p>
                <Button variant="flat" color="primary" onPress={() => toast.success("2FA setup coming soon!")}>Enable 2FA</Button>
              </div>
            </div>
          )}

          {activeTab === "Notifications" && (
            <div className="rounded-2xl border border-gray-100 dark:border-gray-800 p-6" style={{ background: "var(--background)" }}>
              <h2 className="text-lg font-bold mb-5" style={{ color: "var(--foreground)" }}>Notification Preferences</h2>
              <div className="space-y-4">
                {[
                  { label: "Order Updates", desc: "Track your order status and delivery." },
                  { label: "AI Recommendations", desc: "Personalized product suggestions based on your activity." },
                  { label: "Price Drop Alerts", desc: "Get notified when wishlist items go on sale." },
                  { label: "Newsletter", desc: "Monthly curated tech roundup and exclusive deals." },
                  { label: "Security Alerts", desc: "Login attempts and account activity." },
                ].map(({ label, desc }) => (
                  <div key={label} className="flex items-center justify-between py-3 border-b border-gray-50 dark:border-gray-800 last:border-0">
                    <div>
                      <p className="font-medium text-sm" style={{ color: "var(--foreground)" }}>{label}</p>
                      <p className="text-xs opacity-60" style={{ color: "var(--foreground)" }}>{desc}</p>
                    </div>
                    <button className="w-11 h-6 rounded-full bg-blue-500 relative transition-colors">
                      <div className="w-4 h-4 rounded-full bg-white absolute right-1 top-1 shadow" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "Preferences" && (
            <div className="rounded-2xl border border-gray-100 dark:border-gray-800 p-6" style={{ background: "var(--background)" }}>
              <h2 className="text-lg font-bold mb-5" style={{ color: "var(--foreground)" }}>Shopping Preferences</h2>
              <div className="space-y-6">
                <div>
                  <p className="text-sm font-medium mb-2" style={{ color: "var(--foreground)" }}>Preferred Currency</p>
                  <select className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-48" style={{ background: "var(--background)", color: "var(--foreground)" }}>
                    <option>USD — US Dollar</option>
                    <option>EUR — Euro</option>
                    <option>GBP — British Pound</option>
                    <option>JPY — Japanese Yen</option>
                  </select>
                </div>
                <div>
                  <p className="text-sm font-medium mb-2" style={{ color: "var(--foreground)" }}>Language</p>
                  <select className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-48" style={{ background: "var(--background)", color: "var(--foreground)" }}>
                    <option>English (US)</option>
                    <option>Español</option>
                    <option>Français</option>
                    <option>日本語</option>
                  </select>
                </div>
                <Button color="primary" startContent={<Save size={16} />} onPress={() => toast.success("Preferences saved!")}>
                  Save Preferences
                </Button>
              </div>
            </div>
          )}

        </motion.div>
      </div>
    </div>
  );
}
