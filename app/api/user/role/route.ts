import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/Auth';
import { db } from '@/utils/firebaseConfig';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  console.log("🔑 Session:", session?.user?.email);
  if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { role } = await req.json();
  console.log("🎯 Role received:", role);
  if (!["contractor", "employee"].includes(role)) {
    return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
  }

  const usersRef = collection(db, "users");
  const q = query(usersRef, where("email", "==", session.user.email));
  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const userDoc = snapshot.docs[0];
  await updateDoc(doc(db, "users", userDoc.id), { role });

  return NextResponse.json({ success: true });
}
