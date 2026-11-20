import { useState } from 'react';
import { BRAND_ASSETS } from '../data/media';

interface EditorialImageProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  aspectClassName?: string;
}

export function EditorialImage({
  src,
  alt,
  className = '',
  imgClassName = '',
  aspectClassName = 'aspect-[4/3]',
}: EditorialImageProps) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={`relative overflow-hidden bg-[#111111] ${aspectClassName} ${className}`}
    >
      {!failed ? (
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          onError={() => setFailed(true)}
          className={`h-full w-full object-cover ${imgClassName}`}
          loading="lazy"
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#18181B] via-[#111111] to-[#27272A] p-4 text-center">
          <img
            src={BRAND_ASSETS.whistleMarkWhite}
            alt=""
            className="h-12 w-12 object-contain opacity-80"
          />
          <span className="mt-2 text-xs font-medium text-zinc-400 line-clamp-2">
            {alt}
          </span>
        </div>
      )}
    </div>
  );
}
