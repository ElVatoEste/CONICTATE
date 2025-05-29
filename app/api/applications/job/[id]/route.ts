import { db } from '@/utils/firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { NextResponse } from 'next/server';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const q = query(collection(db, 'applications'), where('jobId', '==', params.id));
    const snapshot = await getDocs(q);
    const applications = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    return NextResponse.json({ applications });
  } catch (error) {
    console.error('Error al obtener postulaciones:', error);
    return NextResponse.json({ error: 'Error al obtener postulaciones' }, { status: 500 });
  }
}
