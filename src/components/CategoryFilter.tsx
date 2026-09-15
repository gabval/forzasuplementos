"use client";

import React from "react";
import { ProductCategory } from "@/types/product";
import { CATEGORIES } from "@/data/products";

interface CategoryFilterProps {
  selectedCategory: ProductCategory;
  onSelectCategory: (category: ProductCategory) => void;
  counts: Record<ProductCategory, number>;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
  counts,
}) => {
  return (
    <div className="w-full">
      {/* Scrollable pill container */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 pt-1 scrollbar-none snap-x touch-pan-x">
        {CATEGORIES.map((category) => {
          const isSelected = selectedCategory === category;
          const count = counts[category] || 0;

          return (
            <button
              key={category}
              onClick={() => onSelectCategory(category)}
              className={`snap-start shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                isSelected
                  ? "bg-[#569f87] text-white shadow-md shadow-[#569f87]/20 border border-[#6cb39c]"
                  : "bg-zinc-900/60 text-zinc-400 hover:text-white hover:bg-zinc-800/60 border border-zinc-800/80 hover:border-zinc-700"
              }`}
            >
              <span>{category}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  isSelected
                    ? "bg-black/25 text-white"
                    : "bg-zinc-800 text-zinc-400"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
