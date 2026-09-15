"use client";

import React from "react";
import Image from "next/image";
import { STORE_CONFIG } from "@/data/config";
import { useCart } from "@/context/CartContext";
import { ShoppingCart } from "lucide-react";

export const Navbar: React.FC = () => {
  const { totalItems, toggleCart } = useCart();

  return (
    <header className="sticky top-0 z-40 w-full bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Logo and Brand */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden border border-zinc-700/60 shadow-lg shadow-black/40 group-hover:scale-105 transition-transform duration-200">
            <Image
              src="/logo.webp"
              alt={STORE_CONFIG.name}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="text-lg sm:text-xl font-black uppercase tracking-tight text-white flex items-center gap-1.5">
              {STORE_CONFIG.name}
            </span>
            <span className="text-[10px] font-bold text-[#569f87] tracking-widest uppercase -mt-0.5">
              Performance Nutrition
            </span>
          </div>
        </a>

        {/* Right side: Minimalist Shopping cart button */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleCart}
            aria-label="Abrir carrito de compras"
            className="relative flex items-center gap-2.5 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-zinc-900/70 hover:bg-zinc-850 border border-zinc-800/80 hover:border-zinc-700 text-white transition-all duration-200 cursor-pointer group"
          >
            <div className="relative">
              <ShoppingCart className="w-5 h-5 text-zinc-300 group-hover:text-[#569f87] transition-colors" />
              {totalItems > 0 && (
                <span className="absolute -top-2.5 -right-2.5 min-w-[19px] h-[19px] flex items-center justify-center px-1 rounded-full bg-[#569f87] text-white text-[11px] font-black leading-none shadow-md shadow-[#569f87]/30 animate-in zoom-in-50 duration-200">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </div>
            <span className="hidden sm:inline-block text-xs font-bold uppercase tracking-wider text-zinc-300 group-hover:text-white">
              Carrito
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
