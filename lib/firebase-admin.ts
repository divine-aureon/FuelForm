import * as admin from 'firebase-admin';

export function getAdminApp() {
  if (!admin.apps.length) {
    let serviceAccount;

    // ✅ Use new full JSON env var if available
    if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
      try {
        serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
        console.log('✅ Using full service account JSON from FIREBASE_SERVICE_ACCOUNT_KEY');
      } catch (error) {
        console.error('❌ Failed to parse FIREBASE_SERVICE_ACCOUNT_KEY:', error);
        throw error;
      }
    }

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }

  return admin;
}
