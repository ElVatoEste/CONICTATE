// app/dashboard/page.tsx
import React from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/Auth'
import { redirect } from 'next/navigation'
import {FeatureJobs} from "@/paths";

interface DashboardPageProps {
    searchParams: { role?: string }
}

const DashboardPage = async({ searchParams }: DashboardPageProps) => {
    // 1. Verificar sesión
    const session = await getServerSession(authOptions)
    if (!session) {
        // Si no hay sesión, redirige al signup
        redirect('/signup')
    }

    // 2. Detectar rol (contractor || employee)
    const role = searchParams.role === 'contractor' ? 'contractor' : 'employee'

    return (
        <div className="min-h-screen flex flex-col">

            {/* Contenido principal */}
            <main className="flex-grow p-8">
                <h1 className="text-3xl font-bold mb-4 text-[#05264e]">
                    {role === 'contractor'
                        ? `Panel de Contratista, ${session.user?.name}`
                        : `Panel de Empleado, ${session.user?.name}`}
                </h1>

                {role === 'contractor' ? (
                    <section>
                        <p className="text-lg text-gray-700">
                            Aquí puedes crear proyectos, revisar propuestas y gestionar tus contrataciones.
                        </p>
                        {/* ... Más componentes específicos para contratistas */}
                    </section>
                ) : (
                    <section>
                        <p className="text-lg text-gray-700">
                            Aquí puedes buscar ofertas, postularte a empleos y administrar tu perfil.
                        </p>
                        <FeatureJobs/>
                    </section>
                )}
            </main>
        </div>
    )
}

export default DashboardPage
