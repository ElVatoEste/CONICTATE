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
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto mt-10">
      <h2 className="text-xl font-bold">Editar Trabajo</h2>

      <input name="title" value={formData.title} onChange={handleChange} placeholder="Título" className="input" />
      <input name="salary" value={formData.salary} onChange={handleChange} placeholder="Salario" className="input" />
      <input name="location" value={formData.location} onChange={handleChange} placeholder="Ubicación" className="input" />
      
      <select name="jobtype" value={formData.jobtype} onChange={handleChange} className="input">
        <option value="Full time">Full time</option>
        <option value="Mid time">Mid time</option>
        <option value="Freelance">Freelance</option>
      </select>

      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Descripción del trabajo"
        className="input"
      />

      <textarea
        name="requirements"
        value={formData.requirements}
        onChange={handleChange}
        placeholder="Requisitos del trabajo"
        className="input"
      />
      <select name="category" value={formData.category} onChange={handleChange} className="input">
        <option value="General">General</option>
        <option value="Tecnología">Tecnología</option>
        <option value="Educación">Educación</option>
        <option value="Salud">Salud</option>
        <option value="Construcción">Construcción</option>
        <option value="Logística">Logística</option>
        </select>

      <button type="submit" className="btn">Guardar Cambios</button>
    </form>
  );
}
