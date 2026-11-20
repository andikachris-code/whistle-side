import { useState } from 'react';
import { ClubInfo } from '../types/football';

interface ClubBadgeProps {
  club: ClubInfo;
  size?: 'xs' | 'sm' | 'md';
}

export function ClubBadge({ club, size = 'md' }: ClubBadgeProps) {
  const [imgError, setImgError] = useState(false);

  const dims =
    size === 'xs'
      ? 'h-5 w-5 text-[8px]'
      : size === 'sm'
      ? 'h-7 w-7 text-[9px]'
      : 'h-9 w-9 text-[10px]';

  if (club.logoUrl && !imgError) {
    return (
      <span
        className={`inline-flex shrink-0 items-center justify-center rounded-md bg-white p-0.5 border border-black/10 overflow-hidden ${dims}`}
        title={club.name}
      >
        <img
          src={club.logoUrl}
          alt={`Logo ${club.name}`}
          referrerPolicy="no-referrer"
          loading="lazy"
          onError={() => setImgError(true)}
          className="h-full w-full object-contain"
        />
      </span>
    );
  }

  const isLightBg =
    club.primaryColor.toUpperCase() === '#F5F5F5' ||
    club.primaryColor.toUpperCase() === '#FBC02D';

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-md font-bold tracking-tight border border-black/10 ${dims}`}
      style={{
        backgroundColor: club.primaryColor,
        color: isLightBg ? '#111111' : club.secondaryColor,
      }}
      title={club.name}
      aria-hidden="true"
    >
      {club.shortName}
    </span>
  );
}
