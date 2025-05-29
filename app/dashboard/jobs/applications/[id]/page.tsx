'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import router, { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

interface Application {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  message: string;
  phone?: string;
  portfolio?: string;
  fileUrl: string;
}

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
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">Postulaciones</h1>
      {loading ? (
        <p>Cargando...</p>
      ) : applications.length === 0 ? (
        <p>No hay postulaciones todavía.</p>
      ) : (
        <ul className="space-y-4">
          {applications.map(app => (
            <li key={app.id} className="p-4 border rounded shadow flex flex-col space-y-2">
              <p><strong>Nombre:</strong> {app.userName}</p>
              <p><strong>Email:</strong> {app.userEmail}</p>
              <p><strong>Mensaje:</strong> {app.message}</p>
              {app.phone && <p><strong>Teléfono:</strong> {app.phone}</p>}
              {app.portfolio && <p><strong>Portafolio:</strong> <a href={app.portfolio} target="_blank" className="text-blue-600 underline">{app.portfolio}</a></p>}
              <a href={app.fileUrl} target="_blank" className="text-blue-600 underline">Ver CV</a>
              <button
                onClick={async () => {
                  if (!session?.user?.id) return alert('Sesión inválida');
                  const res = await fetch('/api/chat/start', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      toUserId: app.userId
                    }),
                  });
                  const data = await res.json();
                  if (res.ok) {
                    router.push(`/chat/${data.chatId}`);
                  } else {
                    alert('Error al iniciar el chat.');
                  }
                }}
                className="bg-blue-600 text-white px-3 py-1.5 text-sm rounded hover:bg-blue-700 w-fit"
              >
                Chatear
              </button>

            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
