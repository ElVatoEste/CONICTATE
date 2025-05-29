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

export default function ChatPage() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { chatId } = useParams();
  const { data: session } = useSession();
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chatId) return;

    const messagesRef = collection(db, 'chats', String(chatId), 'messages');
    const q = query(messagesRef, orderBy('createdAt', 'asc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, [chatId]);

  const sendMessage = async () => {
    if (!newMessage.trim() || !session?.user?.id || !chatId) return;

    const createdAt = Timestamp.now();
    const message = {
      text: newMessage,
      senderId: session.user.id,
      createdAt,
    };

    const messagesRef = collection(db, 'chats', String(chatId), 'messages');
    await addDoc(messagesRef, message);

    const chatRef = doc(db, 'chats', String(chatId));
    await updateDoc(chatRef, {
      lastMessage: message,
    });

    setNewMessage('');
    if (textareaRef.current) {
    textareaRef.current.style.height = 'auto';
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [messages, chatId]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex h-[40rem] overflow-hidden">
  <ChatSidebar />

  <div className="flex flex-col flex-1 bg-gray-100">

    {/* SCROLL solo aquí */}
    <div className="flex-1 overflow-auto px-4 py-3 space-y-2">
      {messages.map((msg) => {
        const date = msg.createdAt?.toDate?.() ?? new Date();
        const hour = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        return (
          <div
            key={msg.id}
            className={`max-w-[36%] px-3 py-1.5 rounded-xl text-sm relative break-words
              ${msg.senderId === session?.user?.id
                ? 'bg-blue-500 text-white ml-auto'
                : 'bg-white text-gray-900 mr-auto border border-gray-300'}`}
          >
            <div className="flex items-end justify-between gap-2 whitespace-pre-wrap leading-tight">
                <span className="flex-1 break-words">{msg.text}</span>
                <span className="text-[10px] text-black shrink-0">{hour}</span>
            </div>
          </div>
        );
      })}
            <div ref={messagesEndRef} />
            </div>

            {/* INPUT SIEMPRE VISIBLE */}
            <div className="border-t bg-white px-4 py-3 flex items-center">
            <textarea
                ref={textareaRef}
                value={newMessage}
                onChange={(e) => {
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
