import React from 'react';
import { CATEGORIES } from '../config/constants';

export function CategoryPills({ activeCategory, onSelectCategory }) {
  return (
    <div
      className="w-full overflow-x-auto no-scrollbar py-space-sm px-margin flex items-center gap-space-xs"
      data-testid="category-pills"
    >
      {CATEGORIES.map(category => {
        const isActive = activeCategory === category;
        return (
          <button
            key={category}
            className={`cat-pill flex items-center h-8 px-4 rounded-full font-label-md text-label-md transition-all active:scale-95 select-none ${
              isActive
                ? 'bg-primary text-on-primary shadow-sm'
                : 'bg-surface-container text-on-surface-variant'
            }`}
            onClick={() => onSelectCategory(category)}
            type="button"
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}

