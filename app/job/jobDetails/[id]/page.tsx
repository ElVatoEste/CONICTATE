'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { FaPaperPlane, FaFilePdf, FaComment, FaPhone, FaLink } from 'react-icons/fa';
import {Job} from "@/data";


export default function JobDetailPage() {
    const { id } = useParams();
    const { data: session } = useSession();
    const router = useRouter();

    const [job, setJob] = useState<Job | null>(null);
    const [loadingJob, setLoadingJob] = useState(true);

    // Form state
    const [file, setFile] = useState<File | null>(null);
    const [message, setMessage] = useState('');
    const [phone, setPhone] = useState('');
    const [portfolio, setPortfolio] = useState('');
    const [sending, setSending] = useState(false);

    // Carga del trabajo
    useEffect(() => {
        async function loadJob() {
            setLoadingJob(true);
            const res = await fetch(`/api/job/${id}`);
            if (res.ok) {
                setJob(await res.json());
            }
            setLoadingJob(false);
        }
        loadJob();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!session?.user?.id || !file) {
            return alert('Debes iniciar sesión y subir tu CV.');
        }


        setSending(true);
        const fd = new FormData();
        fd.append('file', file);
        fd.append('jobId', String(id));
        fd.append('userId', session.user.id);
        fd.append('userName', session.user.name || '');
        fd.append('userEmail', session.user.email || '');
        fd.append('message', message);
        fd.append('phone', phone);
        fd.append('portfolio', portfolio);

        const res = await fetch('/api/apply', { method: 'POST', body: fd });
        setSending(false);

        if (res.ok) {
            alert('👍 Tu postulación ha sido enviada.');
            router.push('/dashboard');
        } else {
            alert('❌ Error al enviar la postulación.');
        }
    };

    if (loadingJob) {
        return <div className="py-20 text-center text-gray-500">Cargando trabajo…</div>;
    }
    if (!job) {
        return <div className="py-20 text-center text-red-500">Trabajo no encontrado.</div>;
    }

    return (
        <div className="max-w-3xl mx-auto mt-10 space-y-8">
            {/* Detalles del trabajo */}
            <div className="bg-white p-8 rounded-xl shadow">
                <h1 className="text-3xl font-bold text-gray-800">{job.title}</h1>
                <div className="mt-2 flex flex-wrap items-center text-gray-600 space-x-4 text-sm">
                    <span>{job.location}</span>
                    <span>·</span>
                    <span>{job.jobtype}</span>
                    <span>·</span>
                    <span>{job.category}</span>
                </div>
                <p className="mt-6 text-gray-700 leading-relaxed">{job.description || 'Sin descripción disponible.'}</p>
                <div className="mt-6 text-gray-700">
                    <h2 className="font-semibold mb-1">Requisitos</h2>
                    <p>{job.requirements || 'No especificados.'}</p>
                </div>
                <div className="mt-6 text-gray-800">
          <span className="inline-block bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-xs">
            Salario: {job.salary}
          </span>
                </div>
            </div>

            {/* Formulario de postulación (solo employee) */}
            {session?.user?.role === 'employee' && (
                <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow space-y-6">
                    <h2 className="text-2xl font-semibold text-gray-800">Postúlate a este puesto</h2>

                    {/* CV */}
                    <div>
                        <label className="flex items-center text-sm font-medium text-gray-700">
                            <FaFilePdf className="mr-2 text-gray-500" /> Tu CV (PDF)
                        </label>
                        <input
                            type="file"
                            accept=".pdf"
                            onChange={e => setFile(e.target.files?.[0] || null)}
                            className="mt-1 w-full border rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </div>

                    {/* Mensaje */}
                    <div>
                        <label className="flex items-center text-sm font-medium text-gray-700">
                            <FaComment className="mr-2 text-gray-500" /> Mensaje
                        </label>
                        <textarea
                            value={message}
                            onChange={e => setMessage(e.target.value)}
                            placeholder="Déjanos un breve mensaje de presentación"
                            rows={4}
                            className="mt-1 w-full border rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </div>

                    {/* Teléfono y portafolio */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="flex items-center text-sm font-medium text-gray-700">
                                <FaPhone className="mr-2 text-gray-500" /> Teléfono
                            </label>
                            <input
                                type="text"
                                value={phone}
                                onChange={e => setPhone(e.target.value)}
                                placeholder="Opcional"
                                className="mt-1 w-full border rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                        <div>
                            <label className="flex items-center text-sm font-medium text-gray-700">
                                <FaLink className="mr-2 text-gray-500" /> Portafolio
                            </label>
                            <input
                                type="url"
                                value={portfolio}
                                onChange={e => setPortfolio(e.target.value)}
                                placeholder="Opcional"
                                className="mt-1 w-full border rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                    </div>

                    {/* Botón */}
                    <button
                        type="submit"
                        disabled={sending}
                        className="w-full inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md shadow disabled:opacity-50"
                    >
                        {sending
                            ? 'Enviando…'
                            : (
                                <>
                                    <FaPaperPlane className="mr-2" />
                                    Enviar Postulación
                                </>
                            )}
                    </button>
                </form>
            )}
        </div>
    );
}
