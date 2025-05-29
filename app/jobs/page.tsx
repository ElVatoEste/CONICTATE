// app/jobs/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { JobCard } from '@/paths';
import Link from 'next/link';

interface Job {
  id: string;
  title: string;
  salary: string;
  location: string;
  jobtype: string;
  description?: string;
  requirements?: string;
  category: string;
}
const categorias = [
  'General', 'Tecnología', 'Educación',
  'Salud', 'Construcción', 'Logística'
];


const JobListPage = () => {
  const searchParams = useSearchParams();
  const categoryQuery = searchParams.get('category');

  const [jobs, setJobs] = useState<Job[]>([]);
  const [filtered, setFiltered] = useState<Job[]>([]);
  const [category, setCategory] = useState<string>('Todas');

  useEffect(() => {
    if (categoryQuery && categorias.includes(categoryQuery)) {
      setCategory(categoryQuery);
    }
  }, [categoryQuery]);

  useEffect(() => {
    const fetchJobs = async () => {
      const res = await fetch('/api/jobs/all');
      const data = await res.json();
      setJobs(data.jobs);
    };
    fetchJobs();
  }, []);

  useEffect(() => {
    if (category === 'Todas') {
      setFiltered(jobs);
    } else {
      setFiltered(jobs.filter((job) => job.category === category));
    }
  }, [category, jobs]);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-[#05264e]">Ofertas de Trabajo</h1>

      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setCategory('Todas')}
          className={`px-4 py-2 rounded-full text-sm border ${
            category === 'Todas' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          Todas
        </button>
        {categorias.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm border ${
              category === cat ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid gap-4">
        {filtered.map((job) => (
            <Link key={job.id} href={`/job/jobDetails/${job.id}`} className="block">
                <JobCard job={job} />
            </Link>
        ))}

      </div>
    </div>
  );
};

export default JobListPage;
