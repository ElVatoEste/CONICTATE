// components/Dashboard/EmployDashboard.tsx
'use client'
import React from 'react'
import { FaUserCheck, FaBriefcase, FaThumbsUp, FaCheckCircle } from 'react-icons/fa'
import { FeatureJobs } from '@/paths'

interface EmployDashboardProps {
    userName: string
}

export const EmployDashboard: React.FC<EmployDashboardProps> = ({ userName }) => {
    // datos estáticos de ejemplo; podrías pasarlos como props o sacarlos de un hook
    // const stats = [
    //     { icon: <FaUserCheck className="text-indigo-500 text-2xl" />, label: 'Conexiones', value: 24 },
    //     { icon: <FaBriefcase className="text-green-500 text-2xl" />, label: 'Empleos Aplicados', value: 5 },
    //     { icon: <FaThumbsUp className="text-yellow-500 text-2xl" />, label: 'Recomendaciones', value: 3 },
    //     { icon: <FaCheckCircle className="text-blue-500 text-2xl" />, label: 'Perfil Completo', value: '80%' },
    // ]

    const objectives = [
        'Actualizar perfil con recomendaciones',
        'Explorar 3 nuevas ofertas',
        'Establecer 5 conexiones'
    ]

    return (
        <div className="min-h-screen  p-6 space-y-8">
            {/* Breadcrumb + Header */}
            <div className="bg-white p-6 rounded-lg shadow">
                <nav className="text-sm text-gray-500 mb-2">
                    Empleado
                </nav>
                <h1 className="text-3xl font-bold text-gray-800 mb-1">
                    ¡Hola, {userName}!
                </h1>
                <p className="text-gray-600">
                    Bienvenido a <span className="font-semibold text-indigo-600">CONICTATE</span>, conecta con oportunidades de forma innovadora.
                </p>
            </div>

            {/* Estadísticas */}
            {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <div key={stat.label} className="bg-white rounded-lg shadow p-5 flex items-center space-x-4">
                        {stat.icon}
                        <div>
                            <p className="text-sm text-gray-500">{stat.label}</p>
                            <p className="text-2xl font-semibold text-gray-800">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div> */}

            {/* Objetivos a Corto Plazo */}
            {/* <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Objetivos a Corto Plazo</h2>
                <ul className="space-y-3">
                    {objectives.map((obj) => (
                        <li key={obj} className="flex items-start space-x-3">
              <span className="mt-1 text-green-500">
                <FaCheckCircle />
              </span>
                            <p className="text-gray-700">{obj}</p>
                        </li>
                    ))}
                </ul>
            </div> */}

            {/* Ofertas Recomendadas */}
            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Ofertas Recomendadas</h2>
                <FeatureJobs />
            </div>
        </div>
    )
}
