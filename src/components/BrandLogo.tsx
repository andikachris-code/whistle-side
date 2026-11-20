import { BRAND_ASSETS } from '../data/media';

interface BrandLogoProps {
  variant?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg';
}

const SIZE_CLASSES = {
  sm: 'h-8 w-[76px]',
  md: 'h-10 w-[96px]',
  lg: 'h-12 w-[115px]',
};

/**
 * Renders the official Whistle Side logo PNG preserving its exact original artwork
 * and aspect ratio while framing out the empty square canvas padding around the mark.
 */
export function BrandLogo({ variant = 'dark', size = 'md' }: BrandLogoProps) {
  const src =
    variant === 'light'
      ? BRAND_ASSETS.logoWhiteOnTransparent
      : BRAND_ASSETS.logoBlackOnTransparent;

  return (
    <span
      className={`relative inline-block overflow-hidden shrink-0 select-none ${SIZE_CLASSES[size]}`}
      aria-label="Whistle Side"
    >
      <img
        src={src}
        alt="Logo resmi Whistle Side"
        referrerPolicy="no-referrer"
        className="absolute max-w-none pointer-events-none"
        style={{
          width: '170.94%',
          height: 'auto',
          left: '-34.36%',
          top: '-112.65%',
        }}
      />
    </span>
  );
}
