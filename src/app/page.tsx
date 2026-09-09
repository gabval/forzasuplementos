"use client";

import React from "react";
import { PRODUCTS } from "@/data/products";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ProductGrid } from "@/components/ProductGrid";
import { CartDrawer } from "@/components/CartDrawer";
import { Toast } from "@/components/Toast";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100">
      {/* Sticky Header / Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1">
        {/* Minimalist Dark Athletic Hero */}
        <Hero />

        {/* Product Catalog with Category Filters and Responsive Grid */}
        <ProductGrid products={PRODUCTS} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Sliding Cart Drawer */}
      <CartDrawer />

      {/* Add-to-Cart Feedback Toast */}
      <Toast />
    </div>
  );
}
