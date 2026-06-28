"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Users, DollarSign, Package, ShoppingCart, LogOut, Loader2, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import { firebaseSignOut } from "@/lib/firebase";
import toast from "react-hot-toast";
import { api } from "@/lib/api";

export default function AdminDashboardPage() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const router = useRouter();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
    } else if (user?.role !== "admin") {
      toast.error("Unauthorized. Admin access required.");
      router.replace("/dashboard");
    } else {
      api.get("/dashboard/admin")
        .then(res => {
          setData(res.data);
          setIsLoading(false);
        })
        .catch(err => {
          console.error(err);
          toast.error("Failed to load admin data");
          setIsLoading(false);
        });
    }
  }, [isAuthenticated, user, router]);

  if (!isAuthenticated || user?.role !== "admin") return null;

  const handleLogout = async () => {
    try { await firebaseSignOut(); } catch { /* ignore */ }
    logout();
    toast.success("Logged out successfully");
    router.push("/");
  };

  return (
    <div className="min-h-screen py-10" style={{ background: "var(--background)" }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <p className="text-sm opacity-60 mb-1" style={{ color: "var(--foreground)" }}>Admin Portal</p>
            <h1 className="text-3xl font-bold text-emerald-500">Overview</h1>
          </motion.div>

          <div className="flex gap-2">
            <Button variant="flat" color="danger" startContent={<LogOut size={16} />} size="sm" onPress={handleLogout}>
              Log Out
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20"><Loader2 className="w-10 h-10 animate-spin text-emerald-500" /></div>
        ) : data && (
          <>
            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              {[
                { label: "Total Revenue", value: `$${data.stats.totalRevenue.toLocaleString()}`, icon: <DollarSign size={22} />, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-900/20" },
                { label: "Total Orders", value: data.stats.totalOrders, icon: <ShoppingCart size={22} />, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-900/20" },
                { label: "Active Products", value: data.stats.totalProducts, icon: <Package size={22} />, color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-900/20" },
                { label: "Total Users", value: data.stats.totalUsers, icon: <Users size={22} />, color: "text-orange-500", bg: "bg-orange-50 dark:bg-orange-900/20" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="rounded-2xl border border-gray-100 dark:border-gray-800 p-5"
                  style={{ background: "var(--background)" }}
                >
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-3 ${stat.bg} ${stat.color}`}>
                    {stat.icon}
                  </div>
                  <p className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>{stat.value}</p>
                  <p className="text-sm opacity-60 mt-0.5" style={{ color: "var(--foreground)" }}>{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Recent Products Table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="rounded-2xl border border-gray-100 dark:border-gray-800 p-6 overflow-x-auto"
              style={{ background: "var(--background)" }}
            >
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold" style={{ color: "var(--foreground)" }}>Recent Products</h2>
                <Button variant="light" size="sm" className="text-emerald-500">Manage All</Button>
              </div>
              
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-800 text-sm opacity-60">
                    <th className="pb-3 font-medium">Product Name</th>
                    <th className="pb-3 font-medium">Category</th>
                    <th className="pb-3 font-medium">Price</th>
                    <th className="pb-3 font-medium">Stock</th>
                    <th className="pb-3 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {data.recentProducts.map((prod) => (
                    <tr key={prod._id} className="border-b border-gray-100 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-colors">
                      <td className="py-4 font-medium">{prod.name}</td>
                      <td className="py-4 opacity-80">{prod.category}</td>
                      <td className="py-4 font-semibold text-emerald-500">${prod.price}</td>
                      <td className="py-4">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${prod.stock > 10 ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                          {prod.stock} left
                        </span>
                      </td>
                      <td className="py-4 text-right">
                        <Button as={Link} href={`/products/${prod._id}`} variant="light" size="sm" isIconOnly>
                          <ArrowUpRight size={16} className="opacity-60" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}
