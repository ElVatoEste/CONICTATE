'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { db } from '@/utils/firebaseConfig';
import {
  collection,
  query,
  where,
  onSnapshot,
  getDoc,
  doc
} from 'firebase/firestore';
import { usePathname } from 'next/navigation';
import {SearchIcon} from "lucide-react";

interface Chat {
  id: string;
  users: string[];
}

interface DisplayChat {
  id: string;
  otherUserId: string;
  otherUserName: string;
  lastMessage?: string;
  lastTimestamp?: Date;
}

function formatChatTimestamp(date: Date): string {
  const now = new Date();
  const isToday =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  if (isToday) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } else {
    return date.toLocaleDateString('es-NI', {
      day: '2-digit',
      month: 'short',
    });
  }
}

export default function ChatSidebar() {
  const { data: session } = useSession();
  const [chats, setChats] = useState<DisplayChat[]>([]);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!session?.user?.id) return;
    const q = query(
        collection(db, 'chats'),
        where('users', 'array-contains', session.user.id)
    );
    const unsubscribe = onSnapshot(q, async snap => {
      const arr: DisplayChat[] = [];
      for (const docSnap of snap.docs) {
        const data = docSnap.data() as any;
        const otherId = data.users.find((u: string) => u !== session.user.id);
        if (!otherId) continue;
        const userDoc = await getDoc(doc(db, 'users', otherId));
        arr.push({
          id: docSnap.id,
          otherUserId: otherId,
          otherUserName: userDoc.exists() ? userDoc.data().name : 'Usuario',
          lastMessage: data.lastMessage?.text || '',
          lastTimestamp: data.lastMessage?.createdAt?.toDate() || new Date(0),
        });
      }
      arr.sort((a, b) => (b.lastTimestamp!.getTime() - a.lastTimestamp!.getTime()));
      setChats(arr);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [session]);

  return (
      <div className="h-full p-4 flex flex-col">
        <h2 className="text-lg font-bold mb-2">Chats</h2>
        <div className="relative mb-4">
          <SearchIcon className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Buscar..."
              className="w-full pl-9 pr-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex-1 overflow-y-auto space-y-2">
          {loading ? (
              <p className="text-sm text-gray-500">Cargando...</p>
          ) : chats.length === 0 ? (
              <p className="text-sm text-gray-500">No hay chats.</p>
          ) : (
              chats
                  .filter(c => c.otherUserName.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map(chat => (
                      <Link
                          key={chat.id}
                          href={`/chat/${chat.id}`}
                          className={`flex items-center justify-between p-2 rounded transition-colors ${
                              pathname.includes(chat.id)
                                  ? 'bg-blue-100 font-semibold'
                                  : 'hover:bg-gray-200'
                          }`}
                      >
                        <div className="truncate">{chat.otherUserName}</div>
                        {chat.lastTimestamp && (
                            <div className="text-xs text-gray-400 ml-2">
                              {formatChatTimestamp(chat.lastTimestamp)}
                            </div>
                        )}
                      </Link>
                  ))
          )}
        </div>
      </div>
  );
}