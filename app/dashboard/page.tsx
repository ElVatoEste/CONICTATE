'use client'
import React from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/Auth'
import { redirect } from 'next/navigation'
import { EmployDashboard } from '@/components/Dashboard/EmployDashboard'

interface DashboardPageProps {
    searchParams: { role?: string }
}

const DashboardPage = async({ searchParams }: DashboardPageProps) => {
    // Verificar sesión
    const session = await getServerSession(authOptions)
    if (!session) redirect('/signup')

    // Detectar rol
    const role = searchParams.role === 'contractor' ? 'contractor' : 'employee'
    const userName = session.user?.name || 'Usuario'

    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-grow p-8">
                {role === 'contractor' ? (
                    <section className="space-y-4 items-center">
                        <h1 className="text-3xl font-bold text-[#05264e]">
                            Panel de Contratista, {userName}
                        </h1>
                        <p className="text-lg text-gray-700">
                            Aquí puedes crear proyectos, revisar propuestas y gestionar tus contrataciones.
                        </p>

                    </section>
                ) : (
                    <EmployDashboard userName={userName} />
                )}
            </main>
        </div>
    )
}

export default DashboardPage
