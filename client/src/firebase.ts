import { initializeApp } from "firebase/app";

const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_CLIENT_api_key,
	authDomain: import.meta.env.VITE_FIREBASE_CLIENT_auth_domain,
	projectId: import.meta.env.VITE_FIREBASE_CLIENT_project_id,
	storageBucket: import.meta.env.VITE_FIREBASE_CLIENT_storage_bucket,
	messagingSenderId: import.meta.env.VITE_FIREBASE_CLIENT_messaging_sender_id,
	appId: import.meta.env.VITE_FIREBASE_CLIENT_app_id,
};

export const firebaseApp = initializeApp(firebaseConfig);
