import { db } from '@/utils/firebaseConfig';
import {
    collection,
    query,
    where,
    orderBy,
    limit as limitFn,
    startAfter,
    getDocs,
    DocumentData
} from 'firebase/firestore';
import { NextResponse } from 'next/server';

// Tu interfaz base
export interface Job {
    id: string;
    title: string;
    salary: string;
    location: string;
    jobtype: string;
    description?: string;
    requirements?: string;
    category: string;
}

// Extiende para incluir createdAt
interface JobWithDate extends Job {
    createdAt: string;
}

export const revalidate = 60; // ISR: cachea 60s

export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {
    const userId = params.id;
    if (!userId) {
        return NextResponse.json(
            { error: 'Falta el ID del usuario' },
            { status: 400 }
        );
    }

    try {
        const url = new URL(req.url);
        const limit = Math.min(Number(url.searchParams.get('limit') || '20'), 50);
        const cursor = url.searchParams.get('cursor');

        // Query compuesta: filtrado y orden
        let jobsQuery = query(
            collection(db, 'jobs'),
            where('createdBy', '==', userId),
            orderBy('createdAt', 'desc'),
            limitFn(limit)
        );

        if (cursor) {
            const cursorDate = new Date(cursor);
            jobsQuery = query(jobsQuery, startAfter(cursorDate));
        }

        const snap = await getDocs(jobsQuery);

        // Mapea con tipo explícito
        const jobs: JobWithDate[] = snap.docs.map(doc => {
            const data = doc.data() as DocumentData;
            return {
                id: doc.id,
                title:      data.title,
                salary:     data.salary,
                location:   data.location,
                jobtype:    data.jobtype,
                description:data.description,
                requirements:data.requirements,
                category:   data.category,
                createdAt:  data.createdAt as string
            };
        });

        // Próximo cursor si hay más páginas
        const nextCursor = jobs.length > 0
            ? jobs[jobs.length - 1].createdAt
            : null;

        const res = NextResponse.json({ jobs, nextCursor });

        // Cache en CDN y navegador
        res.headers.set(
            'Cache-Control',
            'public, max-age=60, s-maxage=60, stale-while-revalidate=300'
        );

        return res;
    } catch (err) {
        console.error('Error al obtener trabajos del usuario:', err);
        return NextResponse.json(
            { error: 'Error del servidor' },
            { status: 500 }
        );
    }
}
