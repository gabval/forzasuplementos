import React from "react";
import Image from "next/image";
import { STORE_CONFIG } from "@/data/config";
import { MessageCircle, ShieldCheck } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="mt-20 border-t border-zinc-850 bg-zinc-950 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Brand & Logo */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border border-zinc-700/60 shadow-md">
                <Image
                  src="/logo.webp"
                  alt={STORE_CONFIG.name}
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-xl font-bold uppercase tracking-tight text-white">
                {STORE_CONFIG.name}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-md leading-relaxed">
              Especialistas en suplementación deportiva y nutrición de alto rendimiento.
              Garantía de pureza, productos 100% legítimos y sellados.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs text-[#569f87] font-semibold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Garantía de originalidad certificada</span>
            </div>
          </div>

          {/* Col 2: Categories */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-200 mb-3">
              Categorías
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li><a href="#catalogo" className="hover:text-[#569f87] transition-colors">Creatinas Micronizadas</a></li>
              <li><a href="#catalogo" className="hover:text-[#569f87] transition-colors">Proteínas & Whey Isolate</a></li>
              <li><a href="#catalogo" className="hover:text-[#569f87] transition-colors">Pre-entrenos & Foco</a></li>
              <li><a href="#catalogo" className="hover:text-[#569f87] transition-colors">Vitaminas y Salud</a></li>
              <li><a href="#catalogo" className="hover:text-[#569f87] transition-colors">Shakers y Accesorios</a></li>
            </ul>
          </div>

          {/* Col 3: Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-200 mb-3">
              Atención Directa
            </h4>
            <p className="text-xs text-zinc-400 mb-3 leading-relaxed">
              ¿Dudas sobre tomas o combinaciones? Escríbenos directamente a WhatsApp.
            </p>
            <a
              href={`https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                "¡Hola! Quisiera hacer una consulta sobre los productos de Forza Suplementos."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900/80 hover:bg-zinc-850 border border-zinc-800 text-xs font-semibold text-zinc-200 hover:text-white transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-[#569f87]" />
              <span>{STORE_CONFIG.whatsappDisplay}</span>
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div>
            © {new Date().getFullYear()} {STORE_CONFIG.name}. Todos los derechos reservados.
          </div>
          <div className="flex items-center gap-1.5 text-zinc-400">
            <span>Envíos a todo el país</span>
            <span className="text-[#569f87]">•</span>
            <span>Tienda Oficial</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
