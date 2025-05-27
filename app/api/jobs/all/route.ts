// app/api/jobs/all/route.ts
import { db }                           from '@/utils/firebaseConfig';
import { collection, getDocs }          from 'firebase/firestore';
import { NextResponse }                 from 'next/server';

export const revalidate = 30;  // cache ISR por 30 segundos

export async function GET() {
  try {
    const snapshot = await getDocs(collection(db, 'jobs'));
    console.log("🔑 Jobs fetched:", snapshot.docs.length);
    const jobs = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return NextResponse.json({ jobs });
  } catch (err) {
    console.error('Error al obtener todos los trabajos:', err);
    return NextResponse.json(
        { error: 'Error del servidor' },
        { status: 500 }
    );
  }
}
