'use client';
import { useEffect, useRef, useState } from 'react';

/** Profile photo with a graceful fallback (initials) if the file is missing. */
export default function Photo({ src, name = '' }) {
  const ref = useRef(null);
  const [bad, setBad] = useState(!src);
  const initials = name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();

  // handles images that already failed before React attached onError
  useEffect(() => {
    const img = ref.current;
    if (img && img.complete && img.naturalWidth === 0) setBad(true);
  }, []);

  if (bad) return <div className="photo-fallback" role="img" aria-label={name}>{initials}</div>;
  return <img ref={ref} className="photo" src={src} alt={name} onError={() => setBad(true)} />;
}
