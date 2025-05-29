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

    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const chatsWithMeta: DisplayChat[] = [];

      for (const docSnap of snapshot.docs) {
        const chatData = docSnap.data() as Chat & { lastMessage?: { text: string; createdAt: any } };
        const otherUserId = chatData.users.find(u => u !== session.user.id);
        if (!otherUserId) continue;

        const userDoc = await getDoc(doc(db, 'users', otherUserId));
        const otherUserName = userDoc.exists() ? userDoc.data().name : 'Usuario';

        chatsWithMeta.push({
          id: docSnap.id,
          otherUserId,
          otherUserName,
          lastMessage: chatData.lastMessage?.text || '',
          lastTimestamp: chatData.lastMessage?.createdAt?.toDate() || new Date(0),
        });
      }

      chatsWithMeta.sort(
        (a, b) =>
          (b.lastTimestamp?.getTime?.() ?? 0) - (a.lastTimestamp?.getTime?.() ?? 0)
      );

      setChats(chatsWithMeta);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [session]);

  return (
    <div className="w-80 border-r p-4 space-y-3 overflow-y-auto h-screen">
      <h2 className="text-lg font-bold">Chats</h2>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Buscar chat..."
        className="w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

      {loading ? (
        <p className="text-sm text-gray-500">Cargando chats...</p>
      ) : chats.length === 0 ? (
        <p className="text-sm text-gray-500">No hay chats todavía.</p>
      ) : (
        chats
  .filter(chat =>
    chat.otherUserName.toLowerCase().includes(searchTerm.toLowerCase())
  )
  .map((chat) => (
    <Link
      key={chat.id}
      href={`/chat/${chat.id}`}
      className={`flex items-center justify-between p-2 hover:bg-gray-200 rounded ${
        pathname.includes(chat.id)
          ? 'bg-blue-100 font-semibold'
          : 'hover:bg-gray-200'
      }`}
    >
      <div className="flex flex-col w-full">
        <div className="flex justify-between items-center">
          <div className="font-semibold truncate max-w-[75%]">
            {chat.otherUserName}
          </div>
          {chat.lastTimestamp && (
            <div className="text-xs text-gray-400">
              {formatChatTimestamp(chat.lastTimestamp)}
            </div>
          )}
        </div>
        {chat.lastMessage && (
          <div className="text-sm text-gray-600 truncate">
            {chat.lastMessage}
          </div>
        )}
      </div>
    </Link>
))
      )}
    </div>
  );
}