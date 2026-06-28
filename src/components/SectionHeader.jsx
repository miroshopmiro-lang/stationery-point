import React from 'react';

export default function SectionHeader({ subHeader, title, subDesc }) {
  return (
    <div className="max-w-3xl mb-10">
      {subHeader && (
        <p className="text-sm font-medium text-gray-400 mb-2">{subHeader}</p>
      )}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-left text-balance">
        {title}
      </h2>
      {subDesc && <p className="mt-3 text-gray-500">{subDesc}</p>}
    </div>
  );
}
