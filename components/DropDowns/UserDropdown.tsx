'use client'

import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { signOut } from 'next-auth/react'

interface UserDropdownProps {
    name?: string | null
    image?: string | null
}

export default function UserDropdown({ name, image }: UserDropdownProps) {
    const [open, setOpen] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    // Cierra el dropdown al click fuera
    useEffect(() => {
        function onClickOutside(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false)
            }
        }
        document.addEventListener('mousedown', onClickOutside)
        return () => document.removeEventListener('mousedown', onClickOutside)
    }, [])

    return (
        <div className="relative" ref={ref}>
            <button
                onClick={() => setOpen((v) => !v)}
                className="focus:outline-none"
            >
                <Image
                    src={image || '/default-avatar.png'}
                    alt="User Avatar"
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                />
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10">
                    <div className="px-4 py-2 border-b">
                        <p className="text-gray-800 font-medium truncate">{name}</p>
                    </div>
                    <button
                        onClick={() => signOut({ callbackUrl: '/' })}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 transition"
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
    )
}
