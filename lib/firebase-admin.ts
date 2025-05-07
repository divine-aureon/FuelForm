// lib/firebase-admin.ts
import * as admin from 'firebase-admin';

export function getAdminApp() {
  if (!admin.apps.length) {
    const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');
    console.log('🔥 Preview of privateKey:', privateKey?.slice(0, 50)); // THIS WILL NOW WORK

    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey,
      }),
    });
  }

  return admin;
}
