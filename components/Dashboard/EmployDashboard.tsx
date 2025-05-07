// components/Dashboard/EmployDashboard.tsx
'use client'
import React from 'react'
import { FeatureJobs } from '@/paths'

interface EmployDashboardProps {
    userName: string
}

export const EmployDashboard: React.FC<EmployDashboardProps> = ({ userName }) => {
    return (
        <div className="space-y-8">
            {/* Header */}
            <header>
                <h2 className="text-3xl font-bold text-[#05264e]">Panel de Empleado, {userName}</h2>
                <p className="mt-2 text-gray-700">
                    Bienvenido a CONICTATE, plataforma inclusiva que conecta empleadores y trabajadores de manera innovadora.
                </p>
            </header>

            {/* Estadísticas y Objetivos */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Estadísticas */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-xl font-semibold mb-4 text-[#05264e]">Tus Estadísticas</h3>
                    <ul className="space-y-2 text-gray-700">
                        <li><strong>Conexiones Realizadas:</strong> 24</li>
                        <li><strong>Empleos Aplicados:</strong> 5</li>
                        <li><strong>Recomendaciones Recibidas:</strong> 3</li>
                        <li><strong>Perfil Completo:</strong> 80%</li>
                    </ul>
                </div>
                {/* Objetivos Corto Plazo */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-xl font-semibold mb-4 text-[#05264e]">Objetivos a Corto Plazo</h3>
                    <ul className="list-disc list-inside text-gray-700">
                        <li>Actualizar perfil con recomendaciones de usuarios</li>
                        <li>Explorar al menos 3 nuevas ofertas relevantes</li>
                        <li>Establecer 5 conexiones profesionales</li>
                    </ul>
                </div>
            </section>

            {/* Ofertas Recomendadas */}
            <section>
                <FeatureJobs />
            </section>

            {/* Nuestros Valores */}
            <section className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-semibold mb-4 text-[#05264e]">Nuestros Valores</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-gray-700">
                    <span>Transparencia</span>
                    <span>Accesibilidad</span>
                    <span>Innovación</span>
                    <span>Confianza</span>
                    <span>Inclusión</span>
                    <span>Empatía</span>
                </div>
            </section>
        </div>
    )
}
