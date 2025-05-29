'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function EditJobPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    title: '',
    salary: '',
    location: '',
    jobtype: 'Full time',
    description: '',
    requirements: '',
    category: 'General',
  });

  useEffect(() => {
    const fetchJob = async () => {
      const res = await fetch(`/api/job/${params.id}`);
      const data = await res.json();
      setFormData({
        title: data.title || '',
        salary: data.salary || '',
        location: data.location || '',
        jobtype: data.jobtype || 'Full time',
        description: data.description || '',
        requirements: data.requirements || '',
        category: data.category || 'General',
      });
    };
    fetchJob();
  }, [params.id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`/api/job/${params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      router.push('/dashboard');
    } else {
      alert('Error al actualizar trabajo');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-8 rounded-xl shadow space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Editar Trabajo</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Título */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Título</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Título del trabajo"
            required
          />
        </div>

        {/* Salario y Ubicación */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Salario</label>
            <input
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ej.: C$10k - C$12k"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Ubicación</label>
            <input
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ciudad, Departamento"
              required
            />
          </div>
        </div>

        {/* Tipo de trabajo */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Tipo de trabajo</label>
          <select
            name="jobtype"
            value={formData.jobtype}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-md"
          >
            <option value="Full time">Full time</option>
            <option value="Mid time">Mid time</option>
            <option value="Freelance">Freelance</option>
          </select>
        </div>

        {/* Categoría */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Categoría</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-md"
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
          <label className="block text-sm font-medium text-gray-700">Descripción</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            placeholder="Describe el puesto y las responsabilidades"
            className="w-full mt-1 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Requisitos */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Requisitos</label>
          <textarea
            name="requirements"
            value={formData.requirements}
            onChange={handleChange}
            rows={3}
            placeholder="Lista los requisitos o habilidades necesarias"
            className="w-full mt-1 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Botón */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition"
          >
            Guardar Cambios
          </button>
        </div>
      </form>
    </div>
  );
}
