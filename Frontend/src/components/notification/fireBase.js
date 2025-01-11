// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyC1IzW5bhSNm_e23Idc3Rq-0PihR73SKUY",
  authDomain: "pushnotifications-3c327.firebaseapp.com",
  projectId: "pushnotifications-3c327",
  storageBucket: "pushnotifications-3c327.firebasestorage.app",
  messagingSenderId: "21020920919",
  appId: "1:21020920919:web:b7041407a5f07d5734a712",
  measurementId: "G-VW2YR5K7EQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const generateToken = async () => {
  const permission = await Notification.requestPermission();
  console.log("hello", permission);
};
