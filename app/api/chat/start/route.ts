// app/api/chat/start/route.ts
import { authOptions } from '@/Auth';
import { adminDB } from '@/utils/firebaseAdmin';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    }
    const { toUserId } = await req.json();
    if (!toUserId) {
      return NextResponse.json({ error: 'Falta ID del receptor' }, { status: 400 });
    }

    const senderId = session.user.id;

    console.log(senderId, toUserId);
    if (!toUserId || !senderId) {
      return NextResponse.json({ error: 'Faltan usuarios' }, { status: 400 });
    }

    const chatId = [toUserId, senderId].sort().join('_');
    const chatRef = adminDB.collection('chats').doc(chatId);

    const doc = await chatRef.get();

    if (!doc.exists) {
      await chatRef.set({
        users: [toUserId, senderId],
        createdAt: new Date().toISOString(),
        lastMessage: null,
      });
    }

    return NextResponse.json({ chatId });
  } catch (error) {
    console.error('Error al :', error);
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 });
  }
}
