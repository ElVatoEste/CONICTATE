// components/JobCategoryCard.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface Props {
  image: string;
  category: string;
  openPosition: string;
}

export const JobCategoryCard: React.FC<Props> = ({ category, image, openPosition }) => {
  return (
    <Link
      href={`/jobs?category=${encodeURIComponent(category)}`}
      className="flex space-x-4 p-4 border-2 cursor-pointer hover:scale-105 hover:shadow-sm transition-transform border-gray-600 rounded-lg border-opacity-20"
    >
      <Image src={image} alt={`${category} job category image`} width={50} height={50} className="object-contain" />
      <div>
        <h3 className="text-base font-semibold mb-[0.4rem]">{category}</h3>
        <p className="text-sm text-black font-semibold text-opacity-50">
          ({openPosition}) posiciones abiertas
        </p>
      </div>
    </Link>
  );
};
