import { db } from "./firebase";
import { doc, collection, addDoc, getDocs, query, orderBy } from "firebase/firestore";

export const saveQuizProgress = async (userId, quizData) => {
  try {
    console.log("Saving quiz progress to Firestore for user:", userId);
    console.log("Quiz data:", quizData);
    const userProgressRef = collection(doc(db, "userProgress", userId), "quizAttempts");
    const docRef = await addDoc(userProgressRef, {
      category: quizData.category,
      difficulty: quizData.difficulty,
      questionCount: quizData.questionCount,
      mode: quizData.mode,
      score: quizData.score,
      timestamp: new Date(),
    });
    console.log("Progress saved with document ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error saving progress:", {
      message: error.message,
      code: error.code,
      details: error.details,
    });
    throw error;
  }
};

export const getUserProgress = async (userId) => {
  try {
    console.log("Fetching quiz progress for user:", userId);
    const userProgressRef = collection(doc(db, "userProgress", userId), "quizAttempts");
    const q = query(userProgressRef, orderBy("timestamp", "desc"));
    const querySnapshot = await getDocs(q);
    const progress = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log("Fetched progress:", progress);
    return progress;
  } catch (error) {
    console.error("Error fetching progress:", {
      message: error.message,
      code: error.code,
    });
    return [];
  }
};