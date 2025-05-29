'use client';

import { useState } from 'react';
import ChatSidebar from '@/components/ChatSideBar';
import { MenuIcon, XIcon, MessageCircleIcon } from 'lucide-react';

export default function ChatOverview() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex flex-col md:flex-row h-screen">
            {/* Header móvil */}
            <div className="md:hidden flex items-center justify-between bg-white px-4 py-2 border-b">
                <button onClick={() => setSidebarOpen(true)} className="p-1">
                    <MenuIcon className="w-6 h-6 text-gray-600" />
                </button>
                <span className="font-bold text-gray-800">Chats</span>
                <div className="w-6 h-6" />
            </div>

            {/* Drawer móvil */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-50 flex">
                    {/* Panel lateral */}
                    <div className="w-64 bg-white border-r overflow-y-auto">
                        <div className="flex justify-end p-2">
                            <button onClick={() => setSidebarOpen(false)}>
                                <XIcon className="w-6 h-6 text-gray-600" />
                            </button>
                        </div>
                        <ChatSidebar />
                    </div>
                    {/* Backdrop */}
                    <div
                        className="flex-1 bg-black bg-opacity-30"
                        onClick={() => setSidebarOpen(false)}
                    />
                </div>
            )}

            {/* Sidebar escritorio */}
            <div className="hidden md:block md:w-80 border-r">
                <ChatSidebar />
            </div>

            {/* Contenido central */}
            <div className="flex-1 flex items-center justify-center bg-gray-50 p-4">
                <div className="text-center space-y-3">
                    <MessageCircleIcon className="w-16 h-16 text-gray-400 mx-auto" />
                    <p className="text-lg text-gray-600">
                        Seleccioná un chat para comenzar a conversar.
                    </p>
                </div>
            </div>
        </div>
    );
}
