"use client";

import React from "react";
import { STORE_CONFIG } from "@/data/config";
import { ArrowDown, Zap, ShieldCheck, Truck, MessageCircle } from "lucide-react";

export const Hero: React.FC = () => {
  const scrollToProducts = () => {
    const section = document.getElementById("catalogo");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative overflow-hidden bg-zinc-950 pt-16 pb-14 md:pt-24 md:pb-20 border-b border-zinc-800/80">
      {/* Dynamic background lighting and energetic sports glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-lime-400/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute -top-10 right-10 w-72 h-72 bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none" />
      
      {/* Subtle athletic diagonal stripe pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, #a3e635 0, #a3e635 1px, transparent 0, transparent 40px)`,
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Top Tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-lime-400 text-xs font-black uppercase tracking-wider mb-6 shadow-sm">
          <Zap className="w-3.5 h-3.5 fill-lime-400" />
          <span>Nutrición Deportiva Certificada</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-white leading-none max-w-4xl">
          POTENCIA TU <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 via-lime-300 to-emerald-400 drop-shadow-[0_0_20px_rgba(163,230,53,0.3)]">
            RENDIMIENTO
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-5 text-base sm:text-lg md:text-xl text-zinc-400 max-w-2xl font-medium leading-relaxed">
          Suplementos deportivos de máxima pureza seleccionados para atletas exigentes. 
          Garantía de calidad oficial, stock inmediato y envíos a todo el país.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            onClick={scrollToProducts}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-lime-400 hover:bg-lime-300 text-zinc-950 font-black text-sm uppercase tracking-wider shadow-lg shadow-lime-400/20 hover:shadow-lime-400/30 transition-all duration-200 cursor-pointer group"
          >
            <span>Explorar Productos</span>
            <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
          </button>

          <a
            href={`https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
              "¡Hola Forza Suplementos! Quisiera recibir asesoramiento sobre qué suplementos se adaptan a mi objetivo de entrenamiento."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white font-bold text-sm uppercase tracking-wider border border-zinc-800 transition-all duration-200"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>Asesoramiento Gratuito</span>
          </a>
        </div>

        {/* Trust Badges */}
        <div className="mt-14 pt-8 border-t border-zinc-800/60 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 w-full max-w-4xl text-left">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-900/50 border border-zinc-800/60">
            <div className="p-2 rounded-lg bg-zinc-800 text-lime-400">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-black text-white uppercase tracking-wider">Envíos Rápidos</div>
              <div className="text-[11px] text-zinc-400">A todo el país</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-900/50 border border-zinc-800/60">
            <div className="p-2 rounded-lg bg-zinc-800 text-lime-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-black text-white uppercase tracking-wider">100% Originales</div>
              <div className="text-[11px] text-zinc-400">Marcas oficiales</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-900/50 border border-zinc-800/60">
            <div className="p-2 rounded-lg bg-zinc-800 text-lime-400">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-black text-white uppercase tracking-wider">Stock Real</div>
              <div className="text-[11px] text-zinc-400">Despacho inmediato</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-900/50 border border-zinc-800/60">
            <div className="p-2 rounded-lg bg-zinc-800 text-lime-400">
              <MessageCircle className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-black text-white uppercase tracking-wider">Checkout WhatsApp</div>
              <div className="text-[11px] text-zinc-400">Atención directa</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
