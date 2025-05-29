'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import {Application} from "@/types/application";
import ApplicationCard from "@/components/Dashboard/ApplicationCard";


export default function ApplicationsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const res = await fetch(`/api/applications/job/${id}`);
      const data = await res.json();
      setApplications(data.applications || []);
      setLoading(false);
    }
    load();
  }, [id]);

  return (
      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-10 min-h-[80vh]">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Postulaciones</h1>

        {loading ? (
            <p className="text-center text-gray-500">Cargando...</p>
        ) : applications.length === 0 ? (
            <p className="text-center text-gray-500">No hay postulaciones todavía.</p>
        ) : (
            <ul className="space-y-6">
              {applications.map(app => (
                  <li key={app.id}>
                    <ApplicationCard application={app} />
                  </li>
              ))}
            </ul>
        )}
      </div>
  );
}