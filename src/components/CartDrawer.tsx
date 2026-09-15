"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { formatPriceARS } from "@/utils/formatters";
import { generateWhatsAppOrderUrl } from "@/utils/whatsapp";
import { ProductVisual } from "./ProductVisual";
import { STORE_CONFIG } from "@/data/config";
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingCart,
  ArrowRight,
  MessageCircle,
  Truck,
  ShieldCheck,
} from "lucide-react";

export const CartDrawer: React.FC = () => {
  const {
    items,
    totalItems,
    subtotal,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeItem,
    clearCart,
  } = useCart();

  // Prevent background scrolling when drawer is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isCartOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isCartOpen) {
        setIsCartOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isCartOpen, setIsCartOpen]);

  const whatsappUrl = generateWhatsAppOrderUrl(items, subtotal);

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className={`fixed inset-0 bg-black/70 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isCartOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsCartOpen(false)}
        aria-hidden="true"
      />

      {/* Slide-over drawer */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-zinc-950 border-l border-zinc-800 shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Carrito de compras"
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-zinc-850 flex items-center justify-between bg-zinc-950/90">
          <div className="flex items-center gap-3">
            <div className="relative w-9 h-9 rounded-full overflow-hidden border border-zinc-700/80 shadow-sm shrink-0">
              <Image
                src="/logo.webp"
                alt={STORE_CONFIG.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold uppercase tracking-tight text-white flex items-center gap-2">
                Tu Carrito
                <span className="text-[11px] font-bold text-white bg-[#569f87] px-2 py-0.5 rounded-full">
                  {totalItems}
                </span>
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsCartOpen(false)}
            aria-label="Cerrar carrito"
            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-900 border border-transparent hover:border-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping / Trust Reminder */}
        <div className="px-5 py-2.5 bg-zinc-900/40 border-b border-zinc-850 flex items-center gap-2 text-xs text-zinc-300">
          <Truck className="w-4 h-4 text-[#569f87] shrink-0" />
          <span>
            {subtotal >= STORE_CONFIG.shippingThresholdFree ? (
              <strong className="text-[#569f87]">¡Calificas para beneficios en tu envío!</strong>
            ) : (
              <>Despacho rápido a todo el país vía correo o encomienda.</>
            )}
          </span>
        </div>

        {/* Drawer Content / Product List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3.5">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12 px-4">
              <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-600 mb-4">
                <ShoppingCart className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold uppercase tracking-tight text-white">
                Tu carrito está vacío
              </h3>
              <p className="mt-1 text-xs text-zinc-400 max-w-xs">
                Explora nuestros suplementos y añade los productos para tu entrenamiento.
              </p>
              <button
                type="button"
                onClick={() => {
                  setIsCartOpen(false);
                  const el = document.getElementById("catalogo");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#569f87] hover:bg-[#4d8e78] text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                <span>Ver Catálogo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between pb-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  Productos seleccionados
                </span>
                <button
                  type="button"
                  onClick={clearCart}
                  className="text-[11px] font-medium text-zinc-500 hover:text-rose-400 transition-colors cursor-pointer"
                >
                  Vaciar carrito
                </button>
              </div>

              {items.map(({ product, quantity }) => {
                const unitPrice = product.precio_promo ?? product.precio;
                const itemTotal = unitPrice * quantity;

                return (
                  <div
                    key={product.id}
                    className="flex gap-3 p-3 rounded-2xl bg-zinc-900/70 border border-zinc-800/80 hover:border-zinc-700/80 transition-all"
                  >
                    {/* Small Product Visual */}
                    <div className="w-16 h-16 shrink-0 rounded-xl bg-zinc-950 border border-zinc-800 p-1 flex items-center justify-center overflow-hidden">
                      <ProductVisual product={product} className="p-1" />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 block">
                            {product.marca}
                          </span>
                          <h4 className="text-xs font-bold text-white leading-tight line-clamp-1">
                            {product.nombre}
                          </h4>
                          <span className="inline-block mt-0.5 text-[10px] text-zinc-400">
                            {product.cantidad}
                          </span>
                        </div>

                        {/* Remove item button */}
                        <button
                          type="button"
                          onClick={() => removeItem(product.id)}
                          aria-label={`Eliminar ${product.nombre}`}
                          className="text-zinc-500 hover:text-rose-400 p-1 rounded transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Quantity selector and price */}
                      <div className="mt-2.5 flex items-center justify-between">
                        {/* Quantity Counter */}
                        <div className="flex items-center gap-1 bg-zinc-950 border border-zinc-800 rounded-lg p-0.5">
                          <button
                            type="button"
                            onClick={() => updateQuantity(product.id, -1)}
                            aria-label="Disminuir cantidad"
                            className="w-6 h-6 rounded flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center text-xs font-bold text-white">
                            {quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(product.id, 1)}
                            aria-label="Aumentar cantidad"
                            className="w-6 h-6 rounded flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Total per row */}
                        <div className="text-right">
                          <div className="text-xs font-bold text-white">
                            {formatPriceARS(itemTotal)}
                          </div>
                          {quantity > 1 && (
                            <div className="text-[10px] text-zinc-500">
                              {formatPriceARS(unitPrice)} c/u
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>

        {/* Drawer Footer / Subtotal & WhatsApp Checkout */}
        {items.length > 0 && (
          <div className="p-5 border-t border-zinc-850 bg-zinc-950 space-y-4">
            {/* Subtotal calculation */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs text-zinc-400">
                <span>Subtotal ({totalItems} productos)</span>
                <span className="font-semibold text-zinc-200">{formatPriceARS(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-zinc-400">
                <span>Envío</span>
                <span className="text-[#569f87] font-medium">A coordinar por WhatsApp</span>
              </div>
              <div className="pt-2 border-t border-zinc-850 flex items-baseline justify-between">
                <span className="text-sm font-bold uppercase tracking-wider text-white">
                  Total Estimado:
                </span>
                <span className="text-2xl font-black tracking-tight text-[#569f87]">
                  {formatPriceARS(subtotal)}
                </span>
              </div>
            </div>

            {/* WhatsApp Checkout Button */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2.5 py-3.5 px-5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm uppercase tracking-wider shadow-lg shadow-[#25D366]/20 transition-all duration-200 cursor-pointer text-center"
            >
              <MessageCircle className="w-5 h-5 fill-white text-white" />
              <span>Pedir por WhatsApp</span>
            </a>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-zinc-500 text-center">
              <ShieldCheck className="w-3.5 h-3.5 text-[#569f87]" />
              <span>Coordinamos pago y despacho directo</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
