import { Suspense } from "react";
import ExploreClient from "./ExploreClient";

export const metadata = {
  title: "Explore Products | NexShop",
  description: "Browse and filter our full catalog of AI-powered products. Search by category, price, and rating.",
};

export default function ExplorePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-gray-400">Loading...</div>}>
      <ExploreClient />
    </Suspense>
  );
}
