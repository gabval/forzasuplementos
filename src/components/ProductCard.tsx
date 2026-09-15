"use client";

import React, { useState } from "react";
import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";
import { formatPriceARS, getDiscountPercentage } from "@/utils/formatters";
import { ProductVisual } from "./ProductVisual";
import { ShoppingCart, Check, Ban } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const {
    nombre,
    marca,
    cantidad,
    precio,
    precio_promo,
    stock,
    categoria,
    tagline,
  } = product;

  const hasDiscount = precio_promo !== null && precio_promo < precio;
  const currentPrice = precio_promo ?? precio;
  const discountPercent = hasDiscount ? getDiscountPercentage(precio, precio_promo!) : 0;

  const handleAddToCart = () => {
    if (!stock) return;
    addItem(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <div
      className={`group relative flex flex-col justify-between rounded-2xl bg-zinc-900/90 border border-zinc-800/70 p-4 transition-all duration-300 hover:border-[#569f87]/40 hover:shadow-xl hover:shadow-black/50 ${
        !stock ? "opacity-50 select-none" : ""
      }`}
    >
      {/* Top Floating Status Badges (Only for Stock or Promo) */}
      {(!stock || hasDiscount) && (
        <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
          {!stock ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-zinc-800 text-zinc-400 border border-zinc-700/80 backdrop-blur-md">
              <Ban className="w-3 h-3 text-rose-400" /> Sin Stock
            </span>
          ) : hasDiscount ? (
            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider bg-[#569f87] text-white shadow-sm shadow-[#569f87]/30">
              -{discountPercent}% OFF
            </span>
          ) : null}
        </div>
      )}

      {/* Product Image centered at the top */}
      <div className="pt-2 pb-2">
        <ProductVisual product={product} />
      </div>

      {/* Product Info */}
      <div className="flex-1 flex flex-col justify-between pt-2">
        <div>
          {/* Brand & Category tag */}
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="text-zinc-400 uppercase text-xs font-semibold tracking-wider">
              {marca}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 bg-zinc-800/80 border border-zinc-750 px-2 py-0.5 rounded-md">
              {categoria}
            </span>
          </div>

          {/* Product Name */}
          <h3 className="text-white font-bold text-base leading-snug line-clamp-2 min-h-[44px]">
            {nombre}
          </h3>

          {/* Quantity Badge */}
          <div className="mt-1.5 mb-3 flex items-center gap-2">
            <span className="inline-block text-[11px] font-medium text-zinc-300 bg-zinc-800/60 border border-zinc-750 px-2.5 py-0.5 rounded-md">
              {cantidad}
            </span>
            {tagline && (
              <span className="text-[10px] text-zinc-500 truncate">
                • {tagline}
              </span>
            )}
          </div>
        </div>

        {/* Pricing & CTA */}
        <div className="mt-2 pt-3 border-t border-zinc-800/60">
          {/* Prices */}
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-xl font-bold tracking-tight text-white">
              {formatPriceARS(currentPrice)}
            </span>
            {hasDiscount && (
              <span className="text-sm font-medium text-zinc-500 line-through">
                {formatPriceARS(precio)}
              </span>
            )}
          </div>

          {/* Minimalist Add to Cart Button */}
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={!stock}
            className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
              !stock
                ? "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                : justAdded
                ? "bg-[#569f87] text-white shadow-md shadow-[#569f87]/20 scale-[0.98]"
                : "bg-zinc-800 hover:bg-[#569f87] text-zinc-200 hover:text-white active:scale-[0.98]"
            }`}
          >
            {!stock ? (
              <>
                <Ban className="w-3.5 h-3.5" /> Sin Stock
              </>
            ) : justAdded ? (
              <>
                <Check className="w-4 h-4 text-white stroke-[3]" /> ¡Agregado!
              </>
            ) : (
              <>
                <ShoppingCart className="w-3.5 h-3.5" /> + Agregar al Carrito
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
