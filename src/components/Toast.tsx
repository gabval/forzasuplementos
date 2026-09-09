"use client";

import React, { useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { formatPriceARS } from "@/utils/formatters";
import { ShoppingCart, Check, X } from "lucide-react";

export const Toast: React.FC = () => {
  const { lastAddedProduct, clearLastAdded, setIsCartOpen } = useCart();

  useEffect(() => {
    if (lastAddedProduct) {
      const timer = setTimeout(() => {
        clearLastAdded();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [lastAddedProduct, clearLastAdded]);

  if (!lastAddedProduct) return null;

  const price = lastAddedProduct.precio_promo ?? lastAddedProduct.precio;

  return (
    <div className="fixed bottom-5 right-5 z-50 max-w-sm w-full animate-in slide-in-from-bottom-5 fade-in-0 duration-300">
      <div className="p-4 rounded-2xl bg-zinc-900 border border-lime-400/40 shadow-2xl shadow-black/80 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-lime-400 text-zinc-950 flex items-center justify-center shrink-0 font-bold">
          <Check className="w-5 h-5 stroke-[3]" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="text-[11px] font-black uppercase tracking-wider text-lime-400">
            ¡Agregado al carrito!
          </div>
          <div className="text-xs font-bold text-white truncate">
            {lastAddedProduct.nombre}
          </div>
          <div className="text-[11px] text-zinc-400">
            {lastAddedProduct.marca} • {formatPriceARS(price)}
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => {
              clearLastAdded();
              setIsCartOpen(true);
            }}
            className="px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-lime-400 hover:text-zinc-950 text-xs font-bold text-white transition-colors cursor-pointer"
          >
            Ver
          </button>
          <button
            onClick={clearLastAdded}
            className="p-1 rounded-lg text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
