"use client";

import React from "react";
import Image from "next/image";
import { STORE_CONFIG } from "@/data/config";
import { ArrowDown, MessageCircle, ShieldCheck, Truck, Sparkles } from "lucide-react";

export const Hero: React.FC = () => {
  const scrollToProducts = () => {
    const section = document.getElementById("catalogo");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative overflow-hidden bg-zinc-950 pt-16 pb-14 md:pt-24 md:pb-20 border-b border-zinc-800/50">
      {/* Refined minimalist ambient glow in brand sage-mint color */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#569f87]/12 blur-[140px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Subtle Brand Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800 text-zinc-300 text-xs font-semibold uppercase tracking-wider mb-6">
          <span className="w-2 h-2 rounded-full bg-[#569f87]" />
          <span>Nutrición Deportiva Certificada</span>
        </div>

        {/* Hero Title with Minimalist Elegance */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white leading-none max-w-4xl">
          POTENCIA TU <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#70b8a1] to-[#569f87] drop-shadow-[0_0_25px_rgba(86,159,135,0.25)]">
            RENDIMIENTO
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-5 text-base sm:text-lg md:text-xl text-zinc-400 max-w-2xl font-normal leading-relaxed">
          Suplementos seleccionados para atletas que buscan pureza y resultados reales.
          Marcas líderes 100% legítimas y asesoramiento personalizado.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto">
          <button
            onClick={scrollToProducts}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-[#569f87] hover:bg-[#4d8e78] text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-[#569f87]/20 hover:shadow-[#569f87]/30 transition-all duration-200 cursor-pointer group"
          >
            <span>Explorar Catálogo</span>
            <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
          </button>

          <a
            href={`https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
              "¡Hola Forza Suplementos! Quisiera recibir asesoramiento sobre qué suplementos se adaptan a mi objetivo de entrenamiento."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white font-semibold text-xs sm:text-sm uppercase tracking-wider border border-zinc-800/90 transition-all duration-200"
          >
            <MessageCircle className="w-4 h-4 text-[#569f87]" />
            <span>Asesoramiento por WhatsApp</span>
          </a>
        </div>

        {/* Streamlined Minimalist Trust Bar */}
        <div className="mt-14 pt-6 border-t border-zinc-850 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-zinc-400 font-medium">
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-[#569f87]" />
            <span>Envíos a todo el país</span>
          </div>
          <span className="hidden sm:inline text-zinc-700">•</span>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#569f87]" />
            <span>100% Originales y sellados</span>
          </div>
          <span className="hidden sm:inline text-zinc-700">•</span>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#569f87]" />
            <span>Stock oficial garantizado</span>
          </div>
        </div>
      </div>
    </section>
  );
};
