// lib/firebase-admin.ts
import * as admin from 'firebase-admin';

export function getAdminApp() {
  if (!admin.apps.length) {

    const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey,
        
      }),
    });
  }
  console.log(process.env.FIREBASE_PRIVATE_KEY?.split('\n')[0]);
  return admin;
}