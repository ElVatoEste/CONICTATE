'use client';

import { Application } from "@/types/application";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
    MailIcon,
    PhoneIcon,
    MessageSquareIcon,
    LinkIcon,
    FileTextIcon,
    User2Icon,
    MessageCircleIcon,
} from "lucide-react";

interface Props {
    application: Application;
}

export default function ApplicationCard({ application }: Props) {
    const router = useRouter();
    const { data: session } = useSession();

    const handleChat = async () => {
        if (!session?.user?.id) return alert("Sesión inválida");

        const res = await fetch("/api/chat/start", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ toUserId: application.userId }),
        });

        const data = await res.json();
        if (res.ok) {
            router.push(`/chat/${data.chatId}`);
        } else {
            alert("Error al iniciar el chat.");
        }
    };

    return (
        <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-all">
            <div className="grid md:grid-cols-2 gap-6">
                {/* Columna izquierda */}
                <div className="space-y-3 text-sm text-gray-700">
                    <div className="flex items-center gap-2">
                        <User2Icon className="w-4 h-4 text-gray-600" />
                        <span className="font-medium">{application.userName}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <MailIcon className="w-4 h-4 text-gray-600" />
                        <span>{application.userEmail}</span>
                    </div>

                    {application.phone && (
                        <div className="flex items-center gap-2">
                            <PhoneIcon className="w-4 h-4 text-gray-600" />
                            <span>{application.phone}</span>
                        </div>
                    )}
                </div>

                {/* Columna derecha */}
                <div className="space-y-3 text-sm text-gray-700">
                    <div className="flex items-start gap-2">
                        <MessageSquareIcon className="w-4 h-4 text-gray-600 mt-1" />
                        <p>{application.message}</p>
                    </div>

                    {application.portfolio && (
                        <div className="flex items-center gap-2">
                            <LinkIcon className="w-4 h-4 text-gray-600" />
                            <a
                                href={application.portfolio}
                                target="_blank"
                                className="text-blue-600 underline"
                            >
                                Portafolio
                            </a>
                        </div>
                    )}

                    <div className="flex items-center gap-2">
                        <FileTextIcon className="w-4 h-4 text-gray-600" />
                        <a
                            href={application.fileUrl}
                            target="_blank"
                            className="text-blue-600 underline font-medium"
                        >
                            Ver CV
                        </a>
                    </div>
                </div>
            </div>

            <div className="mt-6 flex justify-end">
                <button
                    onClick={handleChat}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 text-sm rounded hover:bg-blue-700 transition-colors"
                >
                    <MessageCircleIcon className="w-4 h-4" />
                    Chatear
                </button>
            </div>
        </div>
    );
}
