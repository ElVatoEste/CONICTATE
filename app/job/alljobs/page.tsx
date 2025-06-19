'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { JobCard } from '@/paths';
import { Job } from '@/types/job';

const AllJobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      const res = await fetch('/api/jobs/all');
      const data = await res.json();
      setJobs(data.jobs || []);
      setLoading(false);
    };

    fetchJobs();
  }, []);

  return (
    <div className='mt-12 w-[80%] mx-auto mb-12 min-h-[80vh]'>
      <div className='mb-12'>
        <h1 className='font-semibold text-xl'>Mostrar Resultados ({jobs.length})</h1>
      </div>
      <div className="space-y-10">
        {loading ? (
          <div className="h-40 flex items-center justify-center text-gray-400">Cargando trabajos...</div>
        ) : (
          jobs.map((job) => (
            <Link key={job.id} href={`/job/jobDetails/${job.id}`}>
              <JobCard job={job} />
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default AllJobs;
