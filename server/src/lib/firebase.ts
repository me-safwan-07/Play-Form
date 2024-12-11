import admin from "firebase-admin";
import serviceAccount from "./serviceAccountKey.json";

// Explicitly map only the required properties to match the ServiceAccount type
const typedServiceAccount: admin.ServiceAccount = {
  projectId: serviceAccount.project_id,
  privateKey: serviceAccount.private_key ,//.replace(/\\n/g, '\n'), // Handle newline escape in private key
  clientEmail: serviceAccount.client_email,
};

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(typedServiceAccount),
});

export default admin;
