"use client";

import React, { useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { formatPriceARS } from "@/utils/formatters";
import { Check, X } from "lucide-react";

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
      <div className="p-3.5 rounded-2xl bg-zinc-900 border border-[#569f87]/40 shadow-2xl shadow-black/80 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-[#569f87] text-white flex items-center justify-center shrink-0 font-bold">
          <Check className="w-5 h-5 stroke-[2.5]" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#569f87]">
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
            className="px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-[#569f87] text-xs font-semibold text-white transition-colors cursor-pointer"
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
