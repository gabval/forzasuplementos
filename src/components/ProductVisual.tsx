import React from "react";
import { Product } from "@/types/product";

interface ProductVisualProps {
  product: Product;
  className?: string;
}

export const ProductVisual: React.FC<ProductVisualProps> = ({ product, className = "" }) => {
  const { categoria, nombre, marca } = product;

  // Visual style theme based on brand and category
  const isCreatina = categoria === "Creatinas";
  const isProteina = categoria === "Proteínas";
  const isPreentreno = categoria === "Pre-entrenos";
  const isSalud = categoria === "Salud y Vitaminas";
  const isShaker = categoria === "Accesorios";
  const isDoypack = nombre.toLowerCase().includes("doypack");
  const isCaps = nombre.toLowerCase().includes("caps");

  // Accent gradient based on category
  let gradientId = `grad-${product.id}`;
  let primaryColor = "#a3e635"; // lime-400
  let secondaryColor = "#4d7c0f";

  if (isProteina) {
    primaryColor = "#38bdf8"; // sky-400
    secondaryColor = "#0369a1";
  } else if (isPreentreno) {
    primaryColor = "#f97316"; // orange-500
    secondaryColor = "#c2410c";
  } else if (isSalud) {
    primaryColor = "#34d399"; // emerald-400
    secondaryColor = "#059669";
  } else if (isShaker) {
    primaryColor = "#fbbf24"; // amber-400
    secondaryColor = "#d97706";
  }

  return (
    <div className={`relative w-full aspect-square flex items-center justify-center p-4 overflow-hidden rounded-2xl bg-gradient-to-b from-zinc-800/40 via-zinc-900/60 to-zinc-950/80 group-hover:from-zinc-800/60 transition-all duration-300 ${className}`}>
      {/* Background ambient glow */}
      <div
        className="absolute inset-0 opacity-20 group-hover:opacity-45 transition-opacity blur-2xl rounded-full"
        style={{ background: `radial-gradient(circle, ${primaryColor} 0%, transparent 70%)` }}
      />

      {product.imagen ? (
        <div className="relative w-full h-full flex items-center justify-center p-2 z-10">
          <img
            src={product.imagen}
            alt={`${product.nombre} ${product.marca}`}
            className="max-w-full max-h-full object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.8)] transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      ) : (
        <svg
          viewBox="0 0 200 200"
          className="w-4/5 h-4/5 drop-shadow-[0_12px_24px_rgba(0,0,0,0.7)] transition-transform duration-300 group-hover:scale-105"
          xmlns="http://www.w3.org/2000/svg"
        >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#27272a" />
            <stop offset="50%" stopColor="#18181b" />
            <stop offset="100%" stopColor="#09090b" />
          </linearGradient>

          <linearGradient id={`accent-${product.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={primaryColor} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>

          <linearGradient id={`metallic-${product.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#52525b" />
            <stop offset="50%" stopColor="#27272a" />
            <stop offset="100%" stopColor="#18181b" />
          </linearGradient>
        </defs>

        {/* 1. DOYPACK POUCH (Creatine / Protein Doypack) */}
        {isDoypack && (
          <g>
            {/* Pouch base */}
            <path
              d="M 50 45 Q 100 48 150 45 L 160 170 Q 100 185 40 170 Z"
              fill={`url(#${gradientId})`}
              stroke="#3f3f46"
              strokeWidth="2"
            />
            {/* Top seal zipper */}
            <rect x="48" y="32" width="104" height="13" rx="3" fill="#18181b" stroke="#52525b" strokeWidth="1.5" />
            <line x1="55" y1="38" x2="145" y2="38" stroke="#71717a" strokeWidth="1" strokeDasharray="3 3" />

            {/* Accent strip */}
            <path d="M 46 80 L 154 80 L 156 102 L 44 102 Z" fill={`url(#accent-${product.id})`} opacity="0.9" />

            {/* Brand and category text */}
            <text x="100" y="72" textAnchor="middle" fill="#a1a1aa" fontSize="9" fontWeight="900" letterSpacing="1">
              {marca.toUpperCase()}
            </text>
            <text x="100" y="95" textAnchor="middle" fill="#09090b" fontSize="11" fontWeight="900" letterSpacing="0.5">
              {isCreatina ? "CREATINE" : "PURE WHEY"}
            </text>
            <text x="100" y="125" textAnchor="middle" fill="#e4e4e7" fontSize="10" fontWeight="700">
              100% MICRONIZED
            </text>
            <text x="100" y="142" textAnchor="middle" fill={primaryColor} fontSize="12" fontWeight="800">
              {product.cantidad}
            </text>

            {/* Reflection highlights */}
            <path d="M 55 50 Q 80 52 90 52 L 80 165 Q 65 168 48 160 Z" fill="white" opacity="0.04" />
          </g>
        )}

        {/* 2. SUPPLEMENT TUB / JAR (Whey Protein Tub, Creatine 1kg, Citrato, Colágeno) */}
        {!isDoypack && !isCaps && !isShaker && (
          <g>
            {/* Tub Body */}
            <rect
              x="45"
              y="55"
              width="110"
              height="115"
              rx="12"
              fill={`url(#${gradientId})`}
              stroke="#3f3f46"
              strokeWidth="2"
            />
            {/* Neck */}
            <rect x="58" y="42" width="84" height="14" rx="3" fill="#18181b" stroke="#3f3f46" strokeWidth="1" />
            {/* Large Screw Cap */}
            <rect
              x="52"
              y="26"
              width="96"
              height="18"
              rx="4"
              fill={`url(#metallic-${product.id})`}
              stroke="#52525b"
              strokeWidth="1.5"
            />
            {/* Cap Grips */}
            <line x1="65" y1="28" x2="65" y2="42" stroke="#71717a" strokeWidth="1.5" />
            <line x1="75" y1="28" x2="75" y2="42" stroke="#71717a" strokeWidth="1.5" />
            <line x1="85" y1="28" x2="85" y2="42" stroke="#71717a" strokeWidth="1.5" />
            <line x1="95" y1="28" x2="95" y2="42" stroke="#71717a" strokeWidth="1.5" />
            <line x1="105" y1="28" x2="105" y2="42" stroke="#71717a" strokeWidth="1.5" />
            <line x1="115" y1="28" x2="115" y2="42" stroke="#71717a" strokeWidth="1.5" />
            <line x1="125" y1="28" x2="125" y2="42" stroke="#71717a" strokeWidth="1.5" />
            <line x1="135" y1="28" x2="135" y2="42" stroke="#71717a" strokeWidth="1.5" />

            {/* Label Base */}
            <rect x="47" y="70" width="106" height="85" fill="#18181b" />
            {/* Dynamic Label Accent Banner */}
            <rect x="47" y="86" width="106" height="26" fill={`url(#accent-${product.id})`} />

            {/* Brand text */}
            <text x="100" y="80" textAnchor="middle" fill="#a1a1aa" fontSize="8" fontWeight="800" letterSpacing="1">
              {marca.toUpperCase()}
            </text>
            {/* Title on accent */}
            <text x="100" y="103" textAnchor="middle" fill="#09090b" fontSize="10" fontWeight="900" letterSpacing="0.5">
              {isProteina ? "WHEY PROTEIN" : isPreentreno ? "PUMP EXPLOSION" : isCreatina ? "CREATINE MONO" : "NUTRITION"}
            </text>
            {/* Sub details */}
            <text x="100" y="125" textAnchor="middle" fill="#e4e4e7" fontSize="8" fontWeight="700">
              PREMIUM FORMULA
            </text>
            <text x="100" y="142" textAnchor="middle" fill={primaryColor} fontSize="11" fontWeight="900">
              {product.cantidad}
            </text>

            {/* Shading / Reflection */}
            <rect x="47" y="55" width="22" height="115" rx="10" fill="white" opacity="0.05" />
          </g>
        )}

        {/* 3. CAPSULE BOTTLE (Vitamina C, Preentreno Caffeine, Omega 3) */}
        {isCaps && (
          <g>
            {/* Bottle Body */}
            <rect
              x="58"
              y="60"
              width="84"
              height="105"
              rx="14"
              fill="#18181b"
              stroke="#3f3f46"
              strokeWidth="2"
            />
            {/* Safety Cap */}
            <rect
              x="66"
              y="34"
              width="68"
              height="26"
              rx="5"
              fill={`url(#metallic-${product.id})`}
              stroke="#52525b"
              strokeWidth="1.5"
            />
            <line x1="75" y1="36" x2="75" y2="58" stroke="#71717a" strokeWidth="1" />
            <line x1="85" y1="36" x2="85" y2="58" stroke="#71717a" strokeWidth="1" />
            <line x1="95" y1="36" x2="95" y2="58" stroke="#71717a" strokeWidth="1" />
            <line x1="105" y1="36" x2="105" y2="58" stroke="#71717a" strokeWidth="1" />
            <line x1="115" y1="36" x2="115" y2="58" stroke="#71717a" strokeWidth="1" />
            <line x1="125" y1="36" x2="125" y2="58" stroke="#71717a" strokeWidth="1" />

            {/* Label */}
            <rect x="60" y="78" width="80" height="70" fill="#09090b" stroke="#27272a" strokeWidth="1" />
            <rect x="60" y="92" width="80" height="22" fill={`url(#accent-${product.id})`} />

            <text x="100" y="88" textAnchor="middle" fill="#a1a1aa" fontSize="7" fontWeight="800">
              {marca.toUpperCase()}
            </text>
            <text x="100" y="106" textAnchor="middle" fill="#09090b" fontSize="8" fontWeight="900">
              {nombre.includes("Caffeine") ? "CAFFEINE 200" : nombre.includes("Omega") ? "OMEGA 3" : "VITAMIN C"}
            </text>
            <text x="100" y="128" textAnchor="middle" fill="#f4f4f5" fontSize="8" fontWeight="700">
              HIGH POTENCY
            </text>
            <text x="100" y="140" textAnchor="middle" fill={primaryColor} fontSize="10" fontWeight="800">
              {product.cantidad}
            </text>

            <rect x="60" y="60" width="16" height="105" rx="8" fill="white" opacity="0.06" />
          </g>
        )}

        {/* 4. FITNESS SHAKER BOTTLE (Shaker Gold, Shaker Everlast) */}
        {isShaker && (
          <g>
            {/* Shaker body tapering down */}
            <polygon
              points="62,55 138,55 128,168 72,168"
              fill={`url(#metallic-${product.id})`}
              stroke="#52525b"
              strokeWidth="2"
            />
            {/* Lid base */}
            <rect x="58" y="42" width="84" height="15" rx="4" fill="#18181b" stroke="#3f3f46" strokeWidth="1.5" />
            {/* Flip cap spout */}
            <path d="M 70 42 L 70 30 Q 70 24 76 24 L 92 24 L 92 42 Z" fill={primaryColor} />
            <circle cx="81" cy="24" r="3" fill="#09090b" />
            {/* Carry loop */}
            <path d="M 120 42 C 120 30, 134 30, 134 42" stroke={primaryColor} strokeWidth="3" fill="none" />

            {/* Measurement markings */}
            <line x1="70" y1="75" x2="80" y2="75" stroke="#71717a" strokeWidth="1.5" />
            <line x1="72" y1="95" x2="82" y2="95" stroke="#71717a" strokeWidth="1.5" />
            <line x1="74" y1="115" x2="84" y2="115" stroke="#71717a" strokeWidth="1.5" />
            <line x1="76" y1="135" x2="86" y2="135" stroke="#71717a" strokeWidth="1.5" />

            {/* Brand Logo printed on shaker */}
            <text x="105" y="100" textAnchor="middle" fill="#fafafa" fontSize="10" fontWeight="900" letterSpacing="1">
              {marca.toUpperCase()}
            </text>
            <text x="105" y="115" textAnchor="middle" fill={primaryColor} fontSize="8" fontWeight="800">
              PRO SHAKER
            </text>
            <text x="105" y="145" textAnchor="middle" fill="#a1a1aa" fontSize="9" fontWeight="700">
              {product.cantidad}
            </text>

            {/* Subtle glow highlight */}
            <polygon points="64,57 78,57 88,166 74,166" fill="white" opacity="0.08" />
          </g>
        )}
      </svg>
      )}

      {/* Presentation Badge overlay on bottom right */}
      <span className="absolute bottom-2.5 right-2.5 text-[11px] font-bold px-2 py-0.5 rounded-md bg-zinc-950/80 border border-zinc-800 text-zinc-300 backdrop-blur-sm">
        {product.cantidad}
      </span>
    </div>
  );
};
