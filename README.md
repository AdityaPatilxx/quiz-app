QuizMaster
A solo-developed, interactive quiz application by Aditya, built to showcase frontend skills in React, Vite, Firebase, and Tailwind CSS. Powered by the Open Trivia Database, it features user authentication, progress tracking, and a responsive UI, making it a standout portfolio piece for interviews and resumes.
Features

Email/password and Google Sign-In authentication
Email verification and password reset
Quiz with customizable categories, difficulty, and question count
Progress tracking stored in Firebase Firestore
Responsive design with Tailwind CSS
About page with project details and contact information
Leaderboard (coming soon)
Settings (coming soon)

Screenshots

Prerequisites

Node.js (v16 or higher)
Firebase project with Authentication and Firestore enabled
Vercel account for deployment

Setup

Clone the repository:git clone https://github.com/your-username/quiz-app.git
cd quiz-app


Install dependencies:npm install


Create a .env file in the root with Firebase config:VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id


Run the app locally:npm run dev



Deployment

Install Vercel CLI:npm install -g vercel


Log in to Vercel:vercel login


Deploy:vercel --prod


Add environment variables in Vercel dashboard.

Testing
Run tests with:
npm test

Contributing
Feel free to open issues or submit pull requests!
License
MIT
