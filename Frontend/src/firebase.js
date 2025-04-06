import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD8j8jk6oJnZvaKe8x5_j8BD4Ecjgnzz8w",
  authDomain: "quiz-app-3f94d.firebaseapp.com",
  projectId: "quiz-app-3f94d",
  storageBucket: "quiz-app-3f94d.firebasestorage.app",
  messagingSenderId: "240737014434",
  appId: "1:240737014434:web:a4afcb12954df108f4bdfb",
  measurementId: "G-EY40XWXJ4V",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
