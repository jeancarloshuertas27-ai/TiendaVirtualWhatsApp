import React from 'react';

export function AnnouncementBanner() {
  return (
    <div className="px-margin mt-space-xs mb-space-sm">
      <div className="bg-surface-container-high rounded-xl p-space-sm flex items-center justify-between">
        <div className="flex items-center gap-space-sm min-w-0">
          <span className="material-symbols-outlined text-secondary text-[20px] flex-shrink-0">
            bolt
          </span>
          <p className="font-body-sm text-body-sm text-on-surface truncate">
            Envíos express prioritarios en 24h a todo el país
          </p>
        </div>
        <span className="font-label-sm text-label-sm text-secondary font-bold flex-shrink-0 ml-2">
          GRATIS
        </span>
      </div>
    </div>
  );
}

