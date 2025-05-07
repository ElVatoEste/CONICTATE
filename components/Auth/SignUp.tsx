'use client'
import React from 'react'
import signupImage from '@/public/images/chair.jpg'
import Image from 'next/image'
import { signIn } from 'next-auth/react'

const SignUp = () => {
    const handleSignIn = (role: 'contractor' | 'employee') => {
        signIn('google', {
            callbackUrl: `${process.env.NEXT_PUBLIC_URL}/dashboard?role=${role}`
        })
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-4xl">
                {/* Contratista */}
                <div className="flex flex-col items-center space-y-4">
                    <Image
                        src={signupImage}
                        alt="Contratista"
                        width={400}
                        height={250}
                        className="rounded-md object-cover cursor-pointer shadow-lg hover:scale-105 transition-transform"
                        onClick={() => handleSignIn('contractor')}
                    />
                    <button
                        type="button"
                        onClick={() => handleSignIn('contractor')}
                        className="w-full max-w-xs px-6 py-3 bg-purple-700 hover:bg-purple-900 text-white font-semibold rounded-lg transition-colors duration-300"
                    >
                        Soy Contratista
                    </button>
                </div>

                {/* Empleado */}
                <div className="flex flex-col items-center space-y-4">
                    <Image
                        src={signupImage}
                        alt="Empleado"
                        width={400}
                        height={250}
                        className="rounded-md object-cover cursor-pointer shadow-lg hover:scale-105 transition-transform"
                        onClick={() => handleSignIn('employee')}
                    />
                    <button
                        type="button"
                        onClick={() => handleSignIn('employee')}
                        className="w-full max-w-xs px-6 py-3 bg-green-600 hover:bg-green-800 text-white font-semibold rounded-lg transition-colors duration-300"
                    >
                        Soy Empleado
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SignUp
