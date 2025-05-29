# QuizMaster 🧠

A modern, interactive quiz application built with React and Firebase, featuring user authentication, customizable quizzes, and progress tracking. Perfect for testing knowledge across various categories with questions sourced from the Open Trivia Database.

![Firebase](https://img.shields.io/badge/Firebase-latest-orange?logo=firebase)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-06B6D4?logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-latest-646CFF?logo=vite)

## ✨ Features

- 🔐 **Authentication** - Email/password and Google sign-in with verification
- 🎯 **Customizable Quizzes** - Multiple categories, difficulty levels, and question counts
- 📊 **Progress Tracking** - Real-time scoring and quiz history stored in Firebase
- 📱 **Responsive Design** - Clean UI with Tailwind CSS for all devices
- 🔮 **Coming Soon** - Leaderboard, settings panel, and achievements

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite
- **Styling**: Tailwind CSS
- **Backend**: Firebase (Authentication, Firestore)
- **API**: Open Trivia Database
- **Deployment**: Vercel
- **Language**: JavaScript/JSX

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **Firebase Project** - [Create one here](https://console.firebase.google.com/)
  - Enable Authentication (Email/Password and Google providers)
  - Enable Firestore Database
- **Vercel Account** (for deployment) - [Sign up here](https://vercel.com/)

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/AdityaPatilxx/quiz-app.git
cd quiz-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Firebase Configuration

Create a `.env` file in the root directory and add your Firebase configuration:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the app in your browser.

## 🚀 Deployment

### Deploy to Vercel

1. **Install Vercel CLI**:

   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:

   ```bash
   vercel login
   ```

3. **Deploy**:

   ```bash
   vercel --prod
   ```

4. **Add Environment Variables**:
   - Go to your Vercel dashboard
   - Navigate to your project settings
   - Add all the environment variables from your `.env` file

## 📝 API Reference

This project uses the [Open Trivia Database API](https://opentdb.com/api_config.php) for quiz questions.
