import { initializeApp } from "firebase/app";

const firebaseConfig = {
	// Dont need to put that in environment
	apiKey: "AIzaSyC_miVgdIP2mAj7zOWq3OYWONoQSkJmDbY",
	authDomain: "smart-tutor-c1502.firebaseapp.com",
	projectId: "smart-tutor-c1502",
	storageBucket: "smart-tutor-c1502.firebasestorage.app",
	messagingSenderId: "230175717579",
	appId: "1:230175717579:web:f868c7878f67afd145434e",
};

export const firebaseApp = initializeApp(firebaseConfig);
