// app/api/apply/route.ts
import { db, storage } from '@/utils/firebaseConfig';
import { addDoc, collection } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    // 1) Extraer y normalizar cada campo a string
    const file       = formData.get('file')      as File | null;
    const jobId      = String(formData.get('jobId')     ?? '');
    const userId     = String(formData.get('userId')    ?? '');
    const userName   = String(formData.get('userName')  ?? '');
    const userEmail  = String(formData.get('userEmail') ?? '');
    const message    = String(formData.get('message')   ?? '');
    const phone      = String(formData.get('phone')     ?? '');
    const portfolio  = String(formData.get('portfolio') ?? '');

    if (!file || !jobId || !userId || !userName || !userEmail) {
      return NextResponse.json(
          { error: 'Faltan campos requeridos' },
          { status: 400 }
      );
    }

    // 2) Subir el archivo (una sola vez)
    const buffer   = await file.arrayBuffer();
    const filename = `applications/${file.name}`;
    const fileRef  = ref(storage, filename);
    await uploadBytes(fileRef, buffer);
    const fileUrl  = await getDownloadURL(fileRef);

    // 3) Guardar en Firestore
    const docRef = await addDoc(collection(db, 'applications'), {
      jobId,
      userId,
      userName,
      userEmail,
      message,
      phone,
      portfolio,
      fileUrl,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true, id: docRef.id });
  } catch (error) {
    console.error('Error al crear postulación:', error);
    return NextResponse.json(
        { error: 'Error del servidor' },
        { status: 500 }
    );
  }
}
