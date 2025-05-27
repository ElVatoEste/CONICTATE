// /app/api/job/reset/route.ts
import { NextResponse } from 'next/server'
import { db } from '@/utils/firebaseConfig'
import {
    collection,
    getDocs,
    deleteDoc,
    doc,
    addDoc,
    DocumentData
} from 'firebase/firestore'

const USER_IDS = [
    'FPhwImJn8zrGUJHUe6cA',
    'RbDtZ2jN8NaPAZcCywaB'
] as const

// Datos de ejemplo para poblar; varios para cada userId
const SEED_JOBS: Omit<DocumentData, 'id' | 'createdAt'>[] = [
    {
        title: 'Desarrollador Frontend',
        salary: 'C$ 120,000',
        location: 'Managua, Nicaragua',
        jobtype: 'Full time',
        description: 'Constructor de interfaces web con React y Next.js.',
        requirements: 'Experiencia mínima de 2 años en React.',
        category: 'Tecnología',
        createdBy: USER_IDS[0]
    },
    {
        title: 'Especialista en Soporte TI',
        salary: 'C$ 80,000',
        location: 'León, Nicaragua',
        jobtype: 'Mid time',
        description: 'Atención a usuarios y mantenimiento de equipos.',
        requirements: 'Conocimientos en hardware y redes.',
        category: 'Tecnología',
        createdBy: USER_IDS[0]
    },
    {
        title: 'Backend Developer (.NET)',
        salary: 'C$ 130,000',
        location: 'Managua, Nicaragua',
        jobtype: 'Full time',
        description: 'Desarrollo de API REST con ASP.NET Core.',
        requirements: '3+ años de experiencia en C# y EF Core.',
        category: 'Tecnología',
        createdBy: USER_IDS[0]
    },
    {
        title: 'Analista de Datos',
        salary: 'C$ 95,000',
        location: 'Chinandega, Nicaragua',
        jobtype: 'Mid time',
        description: 'Procesamiento y visualización de conjuntos de datos.',
        requirements: 'Manejo de Python y SQL.',
        category: 'Tecnología',
        createdBy: USER_IDS[0]
    },
    {
        title: 'Diseñador UX/UI',
        salary: 'C$ 110,000',
        location: 'Estelí, Nicaragua',
        jobtype: 'Freelance',
        description: 'Creación de prototipos y guías de estilo.',
        requirements: 'Portfolio con proyectos React o Figma.',
        category: 'Diseño',
        createdBy: USER_IDS[1]
    },
    {
        title: 'Profesor de Inglés',
        salary: 'C$ 60,000',
        location: 'Granada, Nicaragua',
        jobtype: 'Freelance',
        description: 'Clases particulares de inglés para adultos.',
        requirements: 'Certificación TOEFL o similar.',
        category: 'Educación',
        createdBy: USER_IDS[1]
    },
    {
        title: 'Auxiliar de Farmacia',
        salary: 'C$ 70,000',
        location: 'Masaya, Nicaragua',
        jobtype: 'Full time',
        description: 'Apoyo en dispensación y gestión de inventario.',
        requirements: 'Técnico en farmacia.',
        category: 'Salud',
        createdBy: USER_IDS[1]
    },
    {
        title: 'Enfermero General',
        salary: 'C$ 85,000',
        location: 'Matagalpa, Nicaragua',
        jobtype: 'Mid time',
        description: 'Atención y cuidado de pacientes en hospital.',
        requirements: 'Licencia de enfermería vigente.',
        category: 'Salud',
        createdBy: USER_IDS[1]
    },
    {
        title: 'Conductor de Reparto',
        salary: 'C$ 50,000',
        location: 'Masaya, Nicaragua',
        jobtype: 'Full time',
        description: 'Reparto de productos en área metropolitana.',
        requirements: 'Licencia de conducir categoría B.',
        category: 'Logística',
        createdBy: USER_IDS[0]
    },
    {
        title: 'Vendedor Minorista',
        salary: 'C$ 45,000',
        location: 'Rivas, Nicaragua',
        jobtype: 'Mid time',
        description: 'Atención al cliente y manejo de caja.',
        requirements: 'Experiencia en ventas presenciales.',
        category: 'Ventas',
        createdBy: USER_IDS[1]
    }
]


export async function POST() {
    // 1) Eliminar todos los jobs
    const jobsCol = collection(db, 'jobs')
    const snapshot = await getDocs(jobsCol)
    const deletePromises = snapshot.docs.map(docSnap =>
        deleteDoc(doc(db, 'jobs', docSnap.id))
    )
    await Promise.all(deletePromises)

    // 2) Poblar con los nuevos trabajos
    const addPromises = SEED_JOBS.map(jobData =>
        addDoc(jobsCol, {
            ...jobData,
            createdAt: new Date().toISOString()
        })
    )
    await Promise.all(addPromises)

    return NextResponse.json({
        success: true,
        deleted: snapshot.size,
        created: SEED_JOBS.length
    })
}
