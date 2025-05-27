'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { FaPlus } from 'react-icons/fa';

export const CreateJobForm = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    salary: '',
    location: '',
    jobtype: 'Full time',
    description: '',
    requirements: '',
    category: 'General',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user?.id) {
      alert('No estás autenticado.');
      return;
    }

    setLoading(true);

    const res = await fetch('/api/job/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        createdBy: session.user.id,
      }),
    });

    setLoading(false);

    if (res.ok) {
      router.push('/dashboard');
    } else {
      alert('Error al crear el trabajo');
    }
  };

  return (
      <div className="max-w-2xl mx-auto mt-10 p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Publicar nuevo trabajo</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Título */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Título del trabajo</label>
            <input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Ej. Diseñador UI/UX"
                className="mt-1 w-full border rounded-md px-4 py-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                required
            />
          </div>

          {/* Salario */}
          <div>
            <label htmlFor="salary" className="block text-sm font-medium text-gray-700">Salario</label>
            <input
                id="salary"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                placeholder="Ej. C$ 50,000"
                className="mt-1 w-full border rounded-md px-4 py-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                required
            />
          </div>

          {/* Ubicación */}
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">Ubicación</label>
            <input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Ej. Managua, Nicaragua"
                className="mt-1 w-full border rounded-md px-4 py-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                required
            />
          </div>

          {/* Tipo de trabajo */}
          <div>
            <label htmlFor="jobtype" className="block text-sm font-medium text-gray-700">Tipo de trabajo</label>
            <select
                id="jobtype"
                name="jobtype"
                value={formData.jobtype}
                onChange={handleChange}
                className="mt-1 w-full border rounded-md px-4 py-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="Full time">Full time</option>
              <option value="Mid time">Mid time</option>
              <option value="Freelance">Freelance</option>
            </select>
          </div>

          {/* Categoría */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Categoría</label>
            <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="mt-1 w-full border rounded-md px-4 py-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="General">General</option>
              <option value="Tecnología">Tecnología</option>
              <option value="Educación">Educación</option>
              <option value="Salud">Salud</option>
              <option value="Construcción">Construcción</option>
              <option value="Logística">Logística</option>
            </select>
          </div>

          {/* Descripción */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descripción</label>
            <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe las responsabilidades del puesto"
                rows={4}
                className="mt-1 w-full border rounded-md px-4 py-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Requisitos */}
          <div>
            <label htmlFor="requirements" className="block text-sm font-medium text-gray-700">Requisitos</label>
            <input
                id="requirements"
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                placeholder="Ej. Licenciatura en Ingeniería de Software"
                className="mt-1 w-full border rounded-md px-4 py-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Botón */}
          <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-md shadow inline-flex items-center justify-center disabled:opacity-50"
          >
            {loading ? (
                <span className="animate-pulse">Publicando...</span>
            ) : (
                <>
                  <FaPlus className="mr-2" />
                  Publicar trabajo
                </>
            )}
          </button>
        </form>
      </div>
  );
};
