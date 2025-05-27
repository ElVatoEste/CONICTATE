import { db } from '@/utils/firebaseConfig';
import { collection, doc, getDoc } from 'firebase/firestore';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

interface JobDetailsProps {
    params: { id: string };
}

export default async function JobDetails({ params }: JobDetailsProps) {
    // Fetch job
    const jobSnap = await getDoc(doc(db, 'jobs', params.id));
    if (!jobSnap.exists()) return notFound();
    const job = jobSnap.data();

    // Fetch creator
    const userSnap = await getDoc(doc(db, 'users', job.createdBy));
    const creator = userSnap.exists() ? userSnap.data() : { name: 'Desconocido' };

    return (
        <div className="max-w-3xl mx-auto my-12 p-6 bg-white rounded-xl shadow-lg">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
                {job.image && (
                    <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                        <Image
                            src={job.image}
                            alt={job.title}
                            width={96}
                            height={96}
                            className="object-cover"
                        />
                    </div>
                )}
                <div className="flex-1">
                    <h1 className="text-3xl font-bold text-gray-800">{job.title}</h1>
                    <div className="mt-1 flex flex-wrap items-center space-x-2 text-sm text-gray-500">
                        <span>{job.location}</span>
                        <span>·</span>
                        <span>{new Date(job.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="mt-3 flex flex-wrap space-x-2">
            <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs">
              {job.category || 'General'}
            </span>
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs">
              {job.jobtype}
            </span>
                    </div>
                </div>
            </div>

            {/* Salary & Creator */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700">
                <div className="flex items-center">
                    <svg className="w-6 h-6 mr-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 2a6 6 0 016 6v2a6 6 0 11-12 0V8a6 6 0 016-6z" />
                        <path d="M10 12v4m0 0l-2-2m2 2l2-2" />
                    </svg>
                    <p><strong>Salario:</strong> <span className="font-medium text-gray-900">{job.salary}</span></p>
                </div>
                <div className="flex items-center">
                    <svg className="w-6 h-6 mr-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M5 3a3 3 0 00-3 3v3h2V6a1 1 0 011-1h3V3H5z" />
                        <path d="M15 3h-3v2h3a1 1 0 011 1v3h2V6a3 3 0 00-3-3zM2 13v2a3 3 0 003 3h3v-2H5a1 1 0 01-1-1v-2H2zm13 0h2v2a1 1 0 01-1 1h-2v2h3a3 3 0 003-3v-2h-3zm-9-2h10v2H6v-2z" />
                    </svg>
                    <p><strong>Publicado por:</strong> <span className="font-medium text-gray-900">{creator.name}</span></p>
                </div>
            </div>

            {/* Divider */}
            <div className="my-8 border-t border-gray-200" />

            {/* Descripción */}
            <section className="space-y-4 text-gray-800">
                <h2 className="text-2xl font-semibold">Descripción</h2>
                <p className="leading-relaxed">
                    {job.description || 'Este trabajo no tiene descripción todavía.'}
                </p>
            </section>

            {/* Requerimientos */}
            {job.requirements && (
                <section className="mt-6 space-y-4 text-gray-800">
                    <h2 className="text-2xl font-semibold">Requerimientos</h2>
                    <p className="leading-relaxed">{job.requirements}</p>
                </section>
            )}


            {/* Footer Link */}
            <div className="mt-10">
                <Link
                    href="/dashboard"
                    className="inline-block text-indigo-600 hover:underline"
                >
                    ← Volver al Panel
                </Link>
            </div>
        </div>
    );
}
