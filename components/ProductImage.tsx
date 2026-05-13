'use client';

import { useState } from 'react';

export default function ProductImage({
  src,
  alt,
  aspectRatio = '1 / 1',
  borderRadius = 18,
}: {
  src?: string | null;
  alt: string;
  aspectRatio?: string;
  borderRadius?: number;
}) {
  const [error, setError] = useState(false);

  if (!src || error) {
    return (
      <div
        style={{
          aspectRatio,
          background: '#f1f1f1',
          borderRadius,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#999',
          fontSize: 14,
        }}
      >
        暫無圖片
      </div>
    );
  }

  return (
    <div
      style={{
        aspectRatio,
        borderRadius,
        overflow: 'hidden',
        background: '#f1f1f1',
      }}
    >
      <img
        src={src}
        alt={alt}
        onError={() => setError(true)}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
        }}
      />
    </div>
  );
}
