"use client";

import { useState } from "react";
import { ShoppingCart, Heart, Search, Moon, Sun, User, Menu, X, LogOut, LayoutDashboard } from "lucide-react";
import { useTheme } from "next-themes";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { useAuthStore } from "@/store/authStore";
import { useCartStore } from "@/store/cartStore";
import { firebaseSignOut } from "@/lib/firebase";
import toast from "react-hot-toast";

const menuItems = [
  { name: "Home", href: "/" },
  { name: "Explore", href: "/explore" },
  { name: "Categories", href: "/categories" },
  { name: "Nex AI", href: "/ai" },
  { name: "About", href: "/about" },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();

  const { isAuthenticated, user, logout } = useAuthStore();
  const cartCount = useCartStore((s) => s.getCount());

  const handleLogout = async () => {
    try {
      await firebaseSignOut();
    } catch {
      // ignore
    }
    logout();
    setUserMenuOpen(false);
    toast.success("Logged out successfully");
    router.push("/");
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800" style={{ background: "var(--background)", backdropFilter: "blur(12px)" }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          {/* Left: Hamburger + Logo */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="sm:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={{ color: "var(--foreground)" }}
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
            <Link href="/">
              <span className="text-xl font-bold tracking-tighter text-blue-500">Nex<span className="text-emerald-500">Shop</span></span>
            </Link>
          </div>

          {/* Center: Desktop Nav */}
          <div className="hidden sm:flex items-center gap-1">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium px-3 py-2 rounded-lg transition-colors ${
                  pathname === item.href
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-500'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
                style={pathname !== item.href ? { color: "var(--foreground)", opacity: 0.75 } : {}}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-1">
            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              style={{ color: "var(--foreground)" }}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Search */}
            <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" style={{ color: "var(--foreground)" }} aria-label="Search">
              <Search size={18} />
            </button>

            {/* Wishlist */}
            <Link href="/wishlist" className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors hidden md:flex" style={{ color: "var(--foreground)" }}>
              <Heart size={18} />
            </Link>

            {/* Cart with badge */}
            <Link href="/cart" className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" style={{ color: "var(--foreground)" }}>
              <ShoppingCart size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-blue-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </Link>

            {/* Auth */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 ml-1 pl-1 pr-3 py-1 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center text-white text-xs font-bold">
                    {user?.name?.[0]?.toUpperCase()}
                  </div>
                  <span className="text-sm font-medium hidden sm:block" style={{ color: "var(--foreground)" }}>
                    {user?.name?.split(" ")[0]}
                  </span>
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 rounded-xl border border-gray-200 dark:border-gray-700 shadow-xl py-1 z-50" style={{ background: "var(--background)" }}>
                    <Link href="/dashboard" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2.5 px-4 py-2.5 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" style={{ color: "var(--foreground)" }}>
                      <LayoutDashboard size={15} className="opacity-60" />
                      Dashboard
                    </Link>
                    <Link href="/profile" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2.5 px-4 py-2.5 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" style={{ color: "var(--foreground)" }}>
                      <User size={15} className="opacity-60" />
                      Profile
                    </Link>
                    <div className="border-t border-gray-100 dark:border-gray-800 my-1" />
                    <button onClick={handleLogout} className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                      <LogOut size={15} />
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2 ml-1">
                <Button as={Link} href="/login" variant="flat" size="sm">Login</Button>
                <Button as={Link} href="/register" color="primary" size="sm">Sign up</Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="sm:hidden border-t border-gray-200 dark:border-gray-800 py-3 px-4 space-y-1" style={{ background: "var(--background)" }}>
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`block px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                pathname === item.href ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-500' : 'hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
              style={pathname !== item.href ? { color: "var(--foreground)" } : {}}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          {!isAuthenticated && (
            <div className="flex gap-2 pt-2">
              <Button as={Link} href="/login" variant="flat" size="sm" className="flex-1" onClick={() => setIsMenuOpen(false)}>Login</Button>
              <Button as={Link} href="/register" color="primary" size="sm" className="flex-1" onClick={() => setIsMenuOpen(false)}>Sign up</Button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
