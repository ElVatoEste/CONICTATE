'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export const CreateJobForm = () => {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user?.id) {
      alert('No estás autenticado.');
      return;
    }
    const res = await fetch('/api/job/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        createdBy: session.user.id, // 👈 aquí lo agregás
      }),
    });

    if (res.ok) {
      window.location.href = '/dashboard';
    } else {
      alert('Error al crear el trabajo');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto mt-10">
      <input name="title" value={formData.title} onChange={handleChange} placeholder="Título" className="input" />
      <input name="salary" value={formData.salary} onChange={handleChange} placeholder="Salario" className="input" />
      <input name="location" value={formData.location} onChange={handleChange} placeholder="Ubicación" className="input" />
      <select name="jobtype" value={formData.jobtype} onChange={handleChange} className="input">
        <option value="Full time">Full time</option>
        <option value="Mid time">Mid time</option>
        <option value="Freelance">Freelance</option>
      </select>
      <select name="category" value={formData.category} onChange={handleChange} className="input">
        <option value="General">General</option>
        <option value="Tecnología">Tecnología</option>
        <option value="Educación">Educación</option>
        <option value="Salud">Salud</option>
        <option value="Construcción">Construcción</option>
        <option value="Logística">Logística</option>
        </select>

      <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Descripción del trabajo" className="input" />
    <input name="requirements" value={formData.requirements} onChange={handleChange} placeholder="Requisitos" className="input" />

      <button type="submit" className="btn">Crear trabajo</button>
    </form>
  );
};
