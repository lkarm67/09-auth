// components/Loader/Loader.tsx
'use client';

import './Loader.css';

export default function Loader() {
  return (
    <div className="loader-overlay">
      <div className="loader-spinner"></div>
    </div>
  );
}
