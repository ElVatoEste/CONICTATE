import { NextResponse } from 'next/server';
import { db } from '@/utils/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

export async function POST(req: Request) {
  const body = await req.json();
  const { title, salary, location, jobtype, createdBy, description, requirements, category } = body;
  if (!title || !salary || !location) {
    return NextResponse.json({ error: 'Faltan campos' }, { status: 400 });
  }
  const job = {
    title,
    salary,
    location,
    jobtype,
    createdAt: new Date().toISOString(),
    createdBy,
    description,
    requirements,
    category,
  };

  await addDoc(collection(db, 'jobs'), job);

  return NextResponse.json({ success: true });
}
