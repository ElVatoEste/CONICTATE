import Link from 'next/link'
import React from 'react'
import LogoImage from '@/public/images/logo.png'
import Image from 'next/image'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/Auth'
import UserDropdown from "@/components/DropDowns/UserDropdown";

const Nav = async () => {
    const session = await getServerSession(authOptions)

    return (
        <header className="h-[11.5vh] shadow-md">
            <div className="w-[85%] md:w-[80%] h-full mx-auto flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="block w-[150px] h-[150px] md:w-[250px] md:h-[250px]">
                    <Image src={LogoImage} alt="logo" className="w-full h-full object-contain" />
                </Link>

                <div className="flex space-x-4 items-center">
                    {!session && (
                        <Link href="/signup">
                            <button className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-800 transition">
                                Registrarse
                            </button>
                        </Link>
                    )}

                    {session && (
                        <>
                            <UserDropdown
                                name={session.user?.name}
                                image={session.user?.image}
                            />

                        </>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Nav