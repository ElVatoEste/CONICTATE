'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import { db } from '@/utils/firebaseConfig';
import {
    collection,
    addDoc,
    onSnapshot,
    orderBy,
    query,
    updateDoc,
    doc,
    Timestamp,
} from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import ChatSidebar from '@/components/ChatSideBar';
import { MenuIcon, XIcon } from 'lucide-react';

export default function ChatPage() {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const { chatId } = useParams();
    const { data: session } = useSession();
    const [messages, setMessages] = useState<any[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // estado para drawer móvil
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        if (!chatId) return;
        const messagesRef = collection(db, 'chats', String(chatId), 'messages');
        const q = query(messagesRef, orderBy('createdAt', 'asc'));
        const unsub = onSnapshot(q, snap =>
            setMessages(snap.docs.map(d => ({ id: d.id, ...d.data() })))
        );
        return () => unsub();
    }, [chatId]);

    const sendMessage = async () => {
        if (!newMessage.trim() || !session?.user?.id || !chatId) return;
        const createdAt = Timestamp.now();
        const msg = { text: newMessage, senderId: session.user.id, createdAt };
        const msgsRef = collection(db, 'chats', String(chatId), 'messages');
        await addDoc(msgsRef, msg);
        await updateDoc(doc(db, 'chats', String(chatId)), { lastMessage: msg });
        setNewMessage('');
        if (textareaRef.current) textareaRef.current.style.height = 'auto';
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, chatId]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <div className="flex flex-col md:flex-row h-screen">
            {/* HEADER móvil con botón */}
            <div className="md:hidden flex items-center justify-between bg-white px-4 py-2 border-b">
                <button onClick={() => setSidebarOpen(true)} className="p-1">
                    <MenuIcon className="w-6 h-6 text-gray-600" />
                </button>
                <span className="font-bold">Chats</span>
                {/* placeholder para centrar */}
                <div className="w-6 h-6" />
            </div>

            {/* DRAWER móvil */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-50 flex">
                    {/* panel */}
                    <div className="w-64 bg-white border-r overflow-y-auto">
                        <div className="flex justify-end p-2">
                            <button onClick={() => setSidebarOpen(false)}>
                                <XIcon className="w-6 h-6 text-gray-600" />
                            </button>
                        </div>
                        <ChatSidebar />
                    </div>
                    {/* backdrop */}
                    <div
                        className="flex-1 bg-black bg-opacity-30"
                        onClick={() => setSidebarOpen(false)}
                    />
                </div>
            )}

            {/* SIDEBAR escritorio */}
            <div className="hidden md:block md:w-80 border-r">
                <ChatSidebar />
            </div>

            {/* CHAT principal */}
            <div className="flex flex-col flex-1 bg-gray-100">
                <div className="flex-1 overflow-auto px-4 py-3 space-y-2">
                    {messages.map(msg => {
                        const date = msg.createdAt?.toDate?.() ?? new Date();
                        const hour = date.toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit'
                        });
                        const isMe = msg.senderId === session?.user?.id;
                        return (
                            <div
                                key={msg.id}
                                className={`
                  px-3 py-1.5 rounded-xl text-sm relative break-words
                  max-w-full md:max-w-[36%]
                  ${isMe
                                    ? 'bg-blue-500 text-white ml-auto'
                                    : 'bg-white text-gray-900 mr-auto border border-gray-300'}
                `}
                            >
                                <div className="flex items-end justify-between gap-2 whitespace-pre-wrap leading-tight">
                                    <span className="flex-1 break-words">{msg.text}</span>
                                    <span className="text-[10px] text-black shrink-0">
                    {hour}
                  </span>
                                </div>
                            </div>
                        );
                    })}
                    <div ref={messagesEndRef} />
                </div>

                {/* INPUT fijo abajo */}
                <div className="border-t bg-white px-4 py-3 flex items-center">
          <textarea
              ref={textareaRef}
              value={newMessage}
              onChange={e => {
                  setNewMessage(e.target.value);
                  e.target.style.height = 'auto';
                  e.target.style.height = `${e.target.scrollHeight}px`;
              }}
              onKeyDown={handleKeyDown}
              rows={1}
              className="flex-1 resize-none overflow-hidden max-h-[16rem] border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Escribe tu mensaje..."
          />
                    <button
                        onClick={sendMessage}
                        className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-700 text-sm"
                    >
                        Enviar
                    </button>
                </div>
            </div>
        </div>
    );
}
