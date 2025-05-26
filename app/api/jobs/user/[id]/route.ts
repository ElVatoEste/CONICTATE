// app/api/jobs/user/[id]/route.ts
import { db } from '@/utils/firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
    const userId = params.id;

    if (!userId) {
        return NextResponse.json({ error: 'Falta el ID del usuario' }, { status: 400 });
    }
    try {
        const q = query(collection(db, 'jobs'), where('createdBy', '==', userId));
        const snapshot = await getDocs(q);
        const jobs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        return NextResponse.json({ jobs });
    } catch (err) {
        console.error('Error al obtener trabajos del usuario:', err);
        return NextResponse.json({ error: 'Error del servidor' }, { status: 500 });
    }
}
