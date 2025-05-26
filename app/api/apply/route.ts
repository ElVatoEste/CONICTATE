// app/api/apply/route.ts
import { db, storage } from '@/utils/firebaseConfig';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const jobId = formData.get('jobId')?.toString();
    const userId = formData.get('userId')?.toString();
    const userName = formData.get('userName')?.toString();
    const userEmail = formData.get('userEmail')?.toString();
    const message = formData.get('message')?.toString() || '';
    const phone = formData.get('phone')?.toString() || '';
    const portfolio = formData.get('portfolio')?.toString() || '';

    if (!file || !jobId || !userId || !userName || !userEmail) {
      return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 });
    }

    // Subir archivo a Firebase Storage
    const buffer = await file.arrayBuffer();
    const fileRef = ref(storage, `applications/${userId}_${Date.now()}_${file.name}`);
    await uploadBytes(fileRef, new Uint8Array(buffer));
    const uploadResult = await uploadBytes(fileRef, buffer);
    const fileUrl = await getDownloadURL(uploadResult.ref);

    // Guardar en Firestore
    await addDoc(collection(db, 'applications'), {
      jobId,
      userId,
      userName,
      userEmail,
      message,
      phone,
      portfolio,
      fileUrl,
      createdAt: serverTimestamp(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error al crear postulación:', error);
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 });
  }
}
