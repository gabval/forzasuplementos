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
      {/* Scrollable pill container with scrollbar hidden */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-3 pt-1 scrollbar-none snap-x touch-pan-x">
        {CATEGORIES.map((category) => {
          const isSelected = selectedCategory === category;
          const count = counts[category] || 0;

          return (
            <button
              key={category}
              onClick={() => onSelectCategory(category)}
              className={`snap-start shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                isSelected
                  ? "bg-lime-400 text-zinc-950 shadow-lg shadow-lime-400/20 scale-105 border border-lime-300"
                  : "bg-zinc-900 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 border border-zinc-800/90 hover:border-zinc-700"
              }`}
            >
              <span>{category}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${
                  isSelected
                    ? "bg-zinc-950 text-lime-400"
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
