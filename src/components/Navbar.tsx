"use client";

import React from "react";
import { STORE_CONFIG } from "@/data/config";
import { useCart } from "@/context/CartContext";
import { ShoppingCart, Dumbbell, Zap } from "lucide-react";

export const Navbar: React.FC = () => {
  const { totalItems, toggleCart } = useCart();

  return (
    <header className="sticky top-0 z-40 w-full bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Logo at left */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-lime-400 flex items-center justify-center text-zinc-950 shadow-md shadow-lime-400/20 group-hover:scale-105 transition-transform duration-200">
            <Zap className="w-5 h-5 fill-zinc-950 stroke-zinc-950" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white flex items-center gap-1.5">
              {STORE_CONFIG.name}
            </span>
            <span className="text-[10px] font-bold text-lime-400 tracking-widest uppercase -mt-1">
              Performance Nutrition
            </span>
          </div>
        </a>

        {/* Right side: Shopping cart button with dynamic count badge */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleCart}
            aria-label="Abrir carrito de compras"
            className="relative flex items-center gap-2.5 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-white transition-all duration-200 cursor-pointer group"
          >
            <div className="relative">
              <ShoppingCart className="w-5 h-5 text-zinc-200 group-hover:text-lime-400 transition-colors" />
              {totalItems > 0 && (
                <span className="absolute -top-2.5 -right-2.5 min-w-[19px] h-[19px] flex items-center justify-center px-1 rounded-full bg-lime-400 text-zinc-950 text-[11px] font-black leading-none shadow-md shadow-lime-400/40 animate-in zoom-in-50 duration-200">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </div>
            <span className="hidden sm:inline-block text-xs font-black uppercase tracking-wider text-zinc-300 group-hover:text-white">
              Carrito
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
