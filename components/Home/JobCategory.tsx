'use client';

import React, { useEffect, useState } from 'react';
import { Heading, JobCategoryCard } from '../../paths';

interface CategoryCount {
  [key: string]: number;
}

const categorias = [
  'General', 'Tecnología', 'Educación',
  'Salud', 'Construcción', 'Logística'
];

const JobCategory = () => {
  const [counts, setCounts] = useState<CategoryCount>({});

  useEffect(() => {
    const fetchJobs = async () => {
      const res = await fetch('/api/jobs/all');
      const data = await res.json();
      const jobs = data.jobs;

      const countMap: CategoryCount = {};
      for (const job of jobs) {
        if (categorias.includes(job.category)) {
          countMap[job.category] = (countMap[job.category] || 0) + 1;
        }
      }
      setCounts(countMap);
    };

    fetchJobs();
  }, []);

  return (
    <div className='pt-8 md:pt-1 pb-8 md:pb-12'>
      <Heading mainHeading="Categoría populares de trabajo" subHeading="Trabajos del 2025 - 293 añadidos hoy" />

      <div className="w-[80%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4 gap-3 items-center">
        {categorias.map((cat, idx) => (
          <JobCategoryCard
            key={cat}
            image={`/images/icon${idx + 1}.png`}
            category={cat}
            openPosition={counts[cat]?.toString() || '0'}
          />
        ))}
      </div>
    </div>
  );
};

export default JobCategory;
