"use client";

import React, { useState, useMemo } from "react";
import { Product, ProductCategory } from "@/types/product";
import { ProductCard } from "./ProductCard";
import { CategoryFilter } from "./CategoryFilter";
import { Search, SlidersHorizontal, PackageX, Sparkles } from "lucide-react";

interface ProductGridProps {
  products: Product[];
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>("Todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc">("featured");

  // Calculate counts per category
  const categoryCounts = useMemo(() => {
    const counts: Record<ProductCategory, number> = {
      Todos: products.length,
      Creatinas: 0,
      Proteínas: 0,
      "Pre-entrenos": 0,
      "Salud y Vitaminas": 0,
      Accesorios: 0,
    };

    products.forEach((p) => {
      if (counts[p.categoria] !== undefined) {
        counts[p.categoria]++;
      }
    });

    return counts;
  }, [products]);

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category match
        if (selectedCategory !== "Todos" && p.categoria !== selectedCategory) {
          return false;
        }
        // Search query match (name or brand or quantity)
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchName = p.nombre.toLowerCase().includes(q);
          const matchBrand = p.marca.toLowerCase().includes(q);
          const matchQty = p.cantidad.toLowerCase().includes(q);
          if (!matchName && !matchBrand && !matchQty) return false;
        }
        return true;
      })
      .sort((a, b) => {
        const priceA = a.precio_promo ?? a.precio;
        const priceB = b.precio_promo ?? b.precio;

        if (sortBy === "price-asc") {
          return priceA - priceB;
        }
        if (sortBy === "price-desc") {
          return priceB - priceA;
        }
        // Featured: In-stock items first, then by id
        if (a.stock !== b.stock) {
          return a.stock ? -1 : 1;
        }
        return a.id - b.id;
      });
  }, [products, selectedCategory, searchQuery, sortBy]);

  return (
    <section id="catalogo" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#569f87] mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Catálogo Oficial</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-white">
            Nuestros Suplementos
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Filtra por categoría o busca tu producto favorito. Precios actualizados en pesos argentinos (ARS).
          </p>
        </div>

        {/* Search & Sort Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Real-time search bar */}
          <div className="relative min-w-[240px]">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Buscar producto, marca..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#569f87] focus:ring-1 focus:ring-[#569f87] transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-500 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>

          {/* Sort selector */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="appearance-none w-full sm:w-auto px-4 py-2.5 pr-8 rounded-xl bg-zinc-900/80 border border-zinc-800 text-xs font-bold text-zinc-300 uppercase tracking-wider focus:outline-none focus:border-[#569f87] cursor-pointer"
            >
              <option value="featured">Destacados</option>
              <option value="price-asc">Precio: Menor a Mayor</option>
              <option value="price-desc">Precio: Mayor a Menor</option>
            </select>
            <SlidersHorizontal className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="mb-8">
        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          counts={categoryCounts}
        />
      </div>

      {/* Product Results Counter */}
      <div className="flex items-center justify-between text-xs text-zinc-500 mb-6 px-1">
        <span>
          Mostrando <strong className="text-zinc-300">{filteredProducts.length}</strong> de{" "}
          {products.length} suplementos
        </span>
        {selectedCategory !== "Todos" && (
          <button
            onClick={() => setSelectedCategory("Todos")}
            className="text-[#569f87] hover:underline font-semibold"
          >
            Limpiar filtro de categoría
          </button>
        )}
      </div>

      {/* Responsive Grid */}
      {filteredProducts.length === 0 ? (
        <div className="py-16 text-center rounded-2xl bg-zinc-900/50 border border-zinc-800/80 p-8">
          <PackageX className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
          <h3 className="text-lg font-bold uppercase text-white">
            No se encontraron productos
          </h3>
          <p className="text-sm text-zinc-400 mt-1 max-w-sm mx-auto">
            No encontramos suplementos con el término &ldquo;{searchQuery}&rdquo; en la categoría seleccionada.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("Todos");
            }}
            className="mt-5 px-5 py-2.5 rounded-xl bg-[#569f87] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#4a8f79] transition-colors"
          >
            Ver todos los productos
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
};
