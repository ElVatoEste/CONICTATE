'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

interface Job {
  id: string;
  title: string;
  salary: string;
  location: string;
  jobtype: string;
  description?: string;
  requirements?: string;
  category?: string;
}

interface ContractorDashboardProps {
  userName: string;
}

export const ContractorDashboard: React.FC<ContractorDashboardProps> = ({ userName }) => {
  const { data: session } = useSession();
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      if (!session?.user?.id) return;
      const res = await fetch(`/api/jobs/user/${session.user.id}`);
      if (res.ok) {
        const data = await res.json();
        setJobs(data.jobs);
      }
    };
    fetchJobs();
  }, [session?.user?.id]);

  return (
    <div className="space-y-8">
      <header>
        <h2 className="text-3xl font-bold text-[#05264e]">
          Panel de Contratista, {userName}
        </h2>
        <p className="mt-2 text-gray-700">
          Bienvenido a tu panel como contratista. Aquí puedes gestionar tus proyectos y conectar con talentos.
        </p>
      </header>

      {/* Botón para crear trabajo */}
      <div>
        <Link href="/dashboard/jobs/new">
          <button className="bg-emerald-600 text-white px-6 py-2 rounded hover:bg-emerald-700">
            + Crear nuevo trabajo
          </button>
        </Link>
      </div>

      {/* Lista de trabajos creados */}
      <section>
        <h3 className="text-xl font-semibold mb-4 text-[#05264e]">Mis Trabajos</h3>
        {jobs.length === 0 ? (
          <p className="text-gray-600">No has creado trabajos aún.</p>
        ) : (
          <ul className="space-y-4">
            {jobs.map((job) => (
              <li key={job.id} className="border p-4 rounded shadow space-y-2">
                <h2 className="text-xl font-semibold">{job.title}</h2>
                <p className="text-gray-700">Ubicación: {job.location}</p>
                <p className="text-gray-700">Tipo: {job.jobtype}</p>
                <p className="text-gray-700">Salario: {job.salary}</p>
                <p className="text-gray-700">Categoría: {job.category || 'General'}</p>

                {job.description && (
                  <p className="text-gray-600 italic">
                    Descripcion: {job.description.length > 100
                      ? job.description.slice(0, 100) + '...'
                      : job.description}
                  </p>
                )}

                {job.requirements && (
                  <p className="text-gray-600 italic">
                    Requerimientos: {job.requirements.length > 100
                      ? job.requirements.slice(0, 100) + '...'
                      : job.requirements}
                  </p>
                )}

                <div className="flex space-x-4">
                  <Link href={`/job/jobDetails/${job.id}`} className="text-blue-600 underline">
                    Ver detalles
                  </Link>
                  <Link href={`/dashboard/jobs/edit/${job.id}`} className="text-blue-600 underline">
                    Editar
                  </Link>
                  <button
                    onClick={async () => {
                      const confirmDelete = confirm("¿Seguro que querés eliminar este trabajo?");
                      if (!confirmDelete) return;

                      const res = await fetch(`/api/job/${job.id}`, {
                        method: 'DELETE',
                      });

                      if (res.ok) {
                        setJobs(prev => prev.filter(j => j.id !== job.id));
                      } else {
                        alert("Error al eliminar el trabajo.");
                      }
                    }}
                    className="text-red-600 underline"
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};
