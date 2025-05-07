'use client'
import React from 'react'
import signupImage from '@/public/images/chair.jpg'
import Image from 'next/image'
import ImageContratista from '@/public/images/silla1.png'
import { signIn } from 'next-auth/react'

const SignUp = () => {
    const handleSignIn = (role: 'contractor' | 'employee') => {
        signIn('google', {
            callbackUrl: `/dashboard?role=${role}`,
        })
    }

    return (
        <div className="min-h-screen bg-gradient-to-br  flex flex-col items-center justify-center px-4 py-12">
            {/* Header */}
            <div className="text-center mb-10">
                <h1 className="text-4xl font-bold text-gray-800">Regístrate en Conictate</h1>
                <p className="mt-2 text-gray-600">Selecciona tu rol y accede fácilmente con Google</p>
            </div>

            {/* Cards Container */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-4xl">
                {/* Contractor Card */}
                <button
                    onClick={() => handleSignIn('contractor')}
                    aria-label="Registrarse como Contratista"
                    className="group flex flex-col bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-purple-600 transition-shadow duration-300"
                >
                    <div className="relative h-64 w-full">
                        <Image
                            src={ImageContratista}
                            alt="Contratista usando laptop"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="p-6 text-center">
                        <h2 className="text-2xl font-semibold text-gray-800 group-hover:text-purple-600 transition-colors duration-200">
                            Soy Contratista
                        </h2>
                        <p className="mt-2 text-gray-600">Encuentra proyectos y ofrece tus servicios.</p>
                    </div>
                </button>

                {/* Employee Card */}
                <button
                    onClick={() => handleSignIn('employee')}
                    aria-label="Registrarse como Empleado"
                    className="group flex flex-col bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-green-600 transition-shadow duration-300"
                >
                    <div className="relative h-64 w-full">
                        <Image
                            src={signupImage}
                            alt="Empleado satisfecho"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="p-6 text-center">
                        <h2 className="text-2xl font-semibold text-gray-800 group-hover:text-green-600 transition-colors duration-200">
                            Soy Empleado
                        </h2>
                        <p className="mt-2 text-gray-600">Descubre y aplica a vacantes que te interesen.</p>
                    </div>
                </button>
            </div>

            {/* Footer note */}
            <div className="mt-12 text-sm text-gray-500">Al registrarte aceptas nuestros Términos y Condiciones.</div>
        </div>
    )
}

export default SignUp;
