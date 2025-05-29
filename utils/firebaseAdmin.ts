// utils/firebaseAdmin.ts
import { getApps, initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import * as serviceAccount from '../firebase-service-account.json'; // <--- ubicá el JSON aquí

if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount as any),
  });
}

export const adminDB = getFirestore();
