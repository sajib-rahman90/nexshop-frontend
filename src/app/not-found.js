"use client";

import Link from 'next/link';
import { Button } from "@/components/ui/Button";
import { Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4" style={{ background: "var(--background)" }}>
      <div className="text-center max-w-lg">
        {/* Abstract 404 Illustration */}
        <div className="relative w-64 h-64 mx-auto mb-8">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full mix-blend-multiply filter blur-[50px] opacity-30 animate-blob" />
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-full mix-blend-multiply filter blur-[50px] opacity-30 animate-blob animation-delay-2000" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-br from-gray-800 to-gray-400 dark:from-gray-100 dark:to-gray-600 drop-shadow-sm">
              404
            </span>
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-4" style={{ color: "var(--foreground)" }}>
          Page Not Found
        </h1>
        <p className="text-lg opacity-60 mb-8" style={{ color: "var(--foreground)" }}>
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            as={Link}
            href="/"
            color="primary"
            size="lg"
            startContent={<Home size={18} />}
            className="w-full sm:w-auto font-medium"
          >
            Back to Home
          </Button>
          <Button
            as={Link}
            href="/explore"
            variant="bordered"
            color="primary"
            size="lg"
            startContent={<Search size={18} />}
            className="w-full sm:w-auto font-medium"
          >
            Explore Products
          </Button>
        </div>
      </div>
    </div>
  );
}
