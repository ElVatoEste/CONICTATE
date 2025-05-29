'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { FaBriefcase, FaPlus, FaRecycle } from 'react-icons/fa';

interface Job {
  id: string;
  title: string;
  salary: string;
  location: string;
  jobtype: string;
  description?: string;
  requirements?: string;
  category?: string;
  createdAt: string;
}

interface ContractorDashboardProps {
  userName: string;
}

export const ContractorDashboard: React.FC<ContractorDashboardProps> = ({ userName }) => {
  const { data: session } = useSession();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loadingReset, setLoadingReset] = useState(false);

  // Estadísticas
  const totalJobs = jobs.length;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const addedToday = jobs.filter(j => new Date(j.createdAt) >= today).length;
  const categories = Array.from(new Set(jobs.map(j => j.category || 'General'))).length;

  const fetchJobs = async () => {
    if (!session?.user?.id) return;
    const res = await fetch(`/api/jobs/user/${session.user.id}`);
    if (res.ok) {
      const data = await res.json();
      setJobs(data.jobs);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [session?.user?.id]);

  const handleReset = async () => {
    if (!confirm('Esto borrará **todos** los trabajos y los poblará de nuevo. ¿Continuar?')) return;
    setLoadingReset(true);
    const res = await fetch('/api/job/reset', { method: 'POST' });
    const json = await res.json();
    setLoadingReset(false);
    if (res.ok) {
      alert(`Hecho: ${json.deleted} eliminados, ${json.created} creados.`);
      fetchJobs();
    } else {
      alert('Error al ejecutar reset.');
    }
  };

  return (
      <div className="space-y-8 px-16 min-h-screen">
        {/* Header */}
        <div className="bg-white shadow rounded-lg p-6">
          <nav className="text-sm text-gray-500 mb-2">
            Contratista
          </nav>
          <h1 className="text-2xl font-semibold text-gray-800">
            Bienvenido, {userName}
          </h1>
          <p className="text-gray-600 mt-1">
            Administra tus trabajos y conecta con talento.
          </p>
        </div>

        {/* Panel de métricas */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow flex items-center">
            <FaBriefcase className="text-indigo-500 text-3xl mr-4" />
            <div>
              <p className="text-sm text-gray-500">Total de trabajos</p>
              <p className="text-xl font-bold">{totalJobs}</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow flex items-center">
            <FaPlus className="text-green-500 text-3xl mr-4" />
            <div>
              <p className="text-sm text-gray-500">Añadidos hoy</p>
              <p className="text-xl font-bold">{addedToday}</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow flex items-center">
            <FaRecycle className="text-yellow-500 text-3xl mr-4" />
            <div>
              <p className="text-sm text-gray-500">Categorías</p>
              <p className="text-xl font-bold">{categories}</p>
            </div>
          </div>
        </div>

        {/* Acciones */}
        <div className="flex flex-wrap gap-3">
          <Link href="/dashboard/jobs/new">
            <button className="flex items-center bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-lg shadow">
              <FaPlus className="mr-2" /> Crear trabajo
            </button>
          </Link>
          <button
              onClick={handleReset}
              disabled={loadingReset}
              className="flex items-center bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg shadow disabled:opacity-50"
          >
            {loadingReset ? 'Reseteando...' : <><FaRecycle className="mr-2" /> Borrar todos</>}
          </button>
        </div>

        {/* Grid de trabajos */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Mis Trabajos
          </h2>
          {jobs.length === 0 ? (
              <p className="text-gray-600">No hay trabajos para mostrar.</p>
          ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobs.map((job) => (
                    <div
                        key={job.id}
                        className="bg-white rounded-lg shadow hover:shadow-lg transition p-5 flex flex-col justify-between"
                    >
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">
                          {job.title}
                        </h3>
                        <span className="inline-block mt-2 text-sm bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">
                    {job.category || 'General'}
                  </span>
                        <p className="mt-3 text-gray-600 text-sm line-clamp-3">
                          {job.description || 'Sin descripción'}
                        </p>
                      </div>

                      <div className="mt-4 space-y-1 text-gray-700 text-sm">
                        <p><strong>Ubicación:</strong> {job.location}</p>
                        <p><strong>Tipo:</strong> {job.jobtype}</p>
                        <p><strong>Salario:</strong> {job.salary}</p>
                      </div>

                      <div className="mt-5 flex justify-between items-center">
                        <Link
                            href={`/job/jobDetails/${job.id}`}
                            className="text-indigo-600 hover:underline text-sm"
                        >
                          Ver detalles
                        </Link>
                        <Link href={`/dashboard/jobs/applications/${job.id}`} className="text-indigo-600 hover:underline text-sm">
                          Ver postulaciones
                        </Link>

                        <div className="space-x-3">
                          <Link
                              href={`/dashboard/jobs/edit/${job.id}`}
                              className="text-blue-600 hover:underline text-sm"
                          >
                            Editar
                          </Link>
                          <button
                              onClick={async () => {
                                if (!confirm('¿Eliminar este trabajo?')) return;
                                const res = await fetch(`/api/job/${job.id}`, { method: 'DELETE' });
                                if (res.ok) setJobs(prev => prev.filter(j => j.id !== job.id));
                              }}
                              className="text-red-600 hover:underline text-sm"
                          >
                            Eliminar
                          </button>
                        </div>
                      </div>
                    </div>
                ))}
              </div>
          )}
        </section>
      </div>
  );
};
