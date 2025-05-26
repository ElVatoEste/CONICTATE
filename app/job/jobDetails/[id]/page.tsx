import { db } from '@/utils/firebaseConfig';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

interface JobDetailsProps {
  params: { id: string };
}

export default async function JobDetails({ params }: JobDetailsProps) {
  const docRef = doc(db, 'jobs', params.id);
  const snapshot = await getDoc(docRef);

  if (!snapshot.exists()) return notFound();

  const job = snapshot.data();
  const userRef = doc(db, 'users', job.createdBy); // ← directamente por ID
  const userSnap = await getDoc(userRef);
  const userData = userSnap.exists() ? userSnap.data() : null;

  return (
    <div className="max-w-4xl mx-auto mt-10 space-y-6">
      <div className="flex items-center space-x-4">
        {job.image && (
          <Image
            src={job.image}
            alt={job.title}
            width={64}
            height={64}
            className="object-contain"
          />
        )}
        <div>
          <h1 className="text-2xl font-bold">{job.title}</h1>
          <p className="text-gray-600">{job.location}</p>
        </div>
      </div>

      <div className="space-y-2 text-gray-800">
        <p><strong>Tipo:</strong> {job.jobtype}</p>
        <p><strong>Salario:</strong> {job.salary}</p>
        <p><strong>Publicado por:</strong> {userData?.name}</p>
      </div>

      <div className="mt-6 space-y-4">
        <h2 className="text-xl font-semibold">Descripción</h2>
        <p className="text-gray-700">
          {job.description || 'Este trabajo no tiene descripción todavía.'}
        </p>
      </div>


      <div className="space-y-2 text-gray-800">
        <p><strong>Categoría:</strong> {job.category}</p>
        <p><strong>Requerimientos:</strong> {job.requirements}</p>
      </div>
      <div className="mt-6">
        <Link
          href="/dashboard"
          className="text-blue-600 underline hover:text-blue-800"
        >
          ← Volver al dashboard
        </Link>
      </div>
    </div>
  );
}
