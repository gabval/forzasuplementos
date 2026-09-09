import React from "react";
import { STORE_CONFIG } from "@/data/config";
import { Zap, MessageCircle, ShieldCheck, Heart } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="mt-20 border-t border-zinc-800 bg-zinc-950 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-lg bg-lime-400 flex items-center justify-center text-zinc-950 font-black">
                <Zap className="w-4 h-4 fill-zinc-950 stroke-zinc-950" />
              </div>
              <span className="text-xl font-black uppercase tracking-tight text-white">
                {STORE_CONFIG.name}
              </span>
            </div>
            <p className="text-sm text-zinc-400 max-w-md leading-relaxed">
              Especialistas en nutrición y suplementación deportiva para maximizar tu fuerza,
              resistencia y recuperación. Productos 100% legítimos y sellados.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs text-lime-400 font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Garantía de originalidad certificada</span>
            </div>
          </div>

          {/* Col 2: Categories */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-zinc-200 mb-3">
              Categorías
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li><a href="#catalogo" className="hover:text-lime-400 transition-colors">Creatinas Micronizadas</a></li>
              <li><a href="#catalogo" className="hover:text-lime-400 transition-colors">Proteínas & Whey Isolate</a></li>
              <li><a href="#catalogo" className="hover:text-lime-400 transition-colors">Pre-entrenos & Cafeína</a></li>
              <li><a href="#catalogo" className="hover:text-lime-400 transition-colors">Vitaminas y Salud</a></li>
              <li><a href="#catalogo" className="hover:text-lime-400 transition-colors">Shakers y Accesorios</a></li>
            </ul>
          </div>

          {/* Col 3: Contact */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-zinc-200 mb-3">
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
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{STORE_CONFIG.whatsappDisplay}</span>
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div>
            © {new Date().getFullYear()} {STORE_CONFIG.name}. Todos los derechos reservados.
          </div>
          <div className="flex items-center gap-1">
            <span>Diseñado con pasión deportiva</span>
            <span className="text-lime-400 font-bold">•</span>
            <span>Envíos a todo el país</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
