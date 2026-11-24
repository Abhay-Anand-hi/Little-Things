import React from 'react';
import { MainCategoryHer } from '../types';
import { ArrowUpRight } from 'lucide-react';

interface CategoryCardProps {
  category: MainCategoryHer;
  onClick: (category: MainCategoryHer) => void;
  index: number;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  onClick,
  index
}) => {
  return (
    <div
      onClick={() => onClick(category)}
      className="group relative cursor-pointer overflow-hidden rounded-2xl sm:rounded-3xl bg-white border border-stone-200/70 shadow-xs hover:shadow-xl transition-all duration-500 flex flex-col justify-between"
    >
      {/* Editorial Image container with zoom effect */}
      <div className="relative h-60 sm:h-72 w-full overflow-hidden bg-stone-100">
        <img
          src={category.image}
          alt={category.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />
        {/* Soft vignette gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* Top Floating Badge */}
        <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-stone-800 text-xs font-medium tracking-wide shadow-sm">
          <span>{category.emoji}</span>
          <span className="uppercase text-[11px] tracking-wider font-semibold">{category.title}</span>
        </div>

        {/* Hover Arrow Icon */}
        <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-stone-800 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0 shadow-sm">
          <ArrowUpRight className="w-4 h-4 text-stone-900" />
        </div>

        {/* Bottom Title on Image */}
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <p className="text-xs uppercase tracking-widest text-rose-200 font-medium">Category</p>
          <h3 className="font-serif text-2xl sm:text-3xl font-normal leading-tight text-white drop-shadow-sm">
            {category.title}
          </h3>
        </div>
      </div>

      {/* Card Content & Emotional Microcopy */}
      <div className="p-5 sm:p-6 flex flex-col justify-between flex-grow bg-white">
        <div>
          <p className="font-serif italic text-base sm:text-lg text-stone-800 leading-snug">
            “{category.tagline}”
          </p>
          <p className="mt-2 text-xs sm:text-sm text-stone-500 leading-relaxed line-clamp-2">
            {category.description}
          </p>
        </div>

        {/* Subcategories Sneak Peek */}
        <div className="mt-4 pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-400">
          <span className="truncate max-w-[200px]">
            {category.subcategories.slice(0, 3).join(' • ')}...
          </span>
          <span className="text-rose-600 font-medium group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
            Explore <span>→</span>
          </span>
        </div>
      </div>
    </div>
  );
};
