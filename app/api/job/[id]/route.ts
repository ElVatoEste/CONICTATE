// app/api/job/[id]/route.ts
import { db } from '@/utils/firebaseConfig';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { NextResponse } from 'next/server';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const docRef = doc(db, 'jobs', params.id);
  const snapshot = await getDoc(docRef);
  if (!snapshot.exists()) {
    return NextResponse.json({ error: 'No existe el trabajo' }, { status: 404 });
  }
  return NextResponse.json(snapshot.data());
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const { title, salary, location, jobtype, description, requirements, category } = await req.json();
  const docRef = doc(db, 'jobs', params.id);

  await updateDoc(docRef, {
    title,
    salary,
    location,
    jobtype,
    description,
    requirements,
    category
  });

  return NextResponse.json({ success: true });
}


export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const docRef = doc(db, 'jobs', params.id);
  await deleteDoc(docRef);
  return NextResponse.json({ success: true });
}
