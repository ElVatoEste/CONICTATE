// app/job/jobDetails/[id]/page.tsx
'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

interface Job {
  id: string;
  title: string;
  location: string;
  salary: string;
  jobtype: string;
  category: string;
  description?: string;
  requirements?: string;
  createdBy?: string;
}

export default function JobDetailPage() {
  const { id } = useParams();
  const { data: session } = useSession();
  const router = useRouter();

  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(false);
const [file, setFile] = useState<File | null>(null);
const [message, setMessage] = useState('');
const [phone, setPhone] = useState('');
    const [portfolio, setPortfolio] = useState('');


  useEffect(() => {
    const fetchJob = async () => {
      const res = await fetch(`/api/job/${id}`);
      const data = await res.json();
      setJob(data);
    };
    fetchJob();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user || !file) return alert('Debe estar autenticado y subir un archivo');

    setLoading(true);

    // 1. Subir a Firebase Storage
    const formData = new FormData();
    formData.append('file', file);
    formData.append('jobId', id as string);
    formData.append('userId', session.user.id ?? '');
    formData.append('userName', session.user.name || '');
    formData.append('userEmail', session.user.email || '');
    formData.append('message', message);
    formData.append('phone', phone);
    formData.append('portfolio', portfolio);


    const res = await fetch('/api/apply', {
      method: 'POST',
      body: formData,
    });

    if (res.ok) {
      alert('Postulación enviada exitosamente.');
      router.push('/dashboard'); // o a una vista de postulaciones
    } else {
      alert('Error al enviar postulación.');
    }

    setLoading(false);
  };

  if (!job) return <p>Cargando...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 space-y-6">
      <h1 className="text-2xl font-bold">{job.title}</h1>
      <p className="text-gray-700">{job.location} - {job.jobtype}</p>
      <p className="text-gray-700">Salario: {job.salary}</p>
      <p className="text-gray-700">Categoría: {job.category}</p>

      <div>
        <h2 className="font-semibold">Descripción</h2>
        <p>{job.description || 'Sin descripción'}</p>
      </div>

      <div>
        <h2 className="font-semibold">Requisitos</h2>
        <p>{job.requirements || 'No especificados'}</p>
      </div>

      {session?.user?.role === 'employee' && (
        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
            <label className="block text-sm font-medium">Subí tu CV (.pdf)</label>
            <input
            type="file"
            accept=".pdf"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="border p-2 rounded w-full"
            required
            />

            <textarea
            placeholder="Mensaje de presentación"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="border p-2 rounded w-full"
            required
            />

            <input
            type="text"
            placeholder="Teléfono (opcional)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border p-2 rounded w-full"
            />

            <input
            type="url"
            placeholder="URL de portafolio (opcional)"
            value={portfolio}
            onChange={(e) => setPortfolio(e.target.value)}
            className="border p-2 rounded w-full"
            />

            <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            disabled={loading}
            >
            {loading ? 'Enviando...' : 'Postularme'}
            </button>
        </form>
        )}

    </div>
  );
}
