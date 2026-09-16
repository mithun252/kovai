# Task Manager

## 1. Overview

Task Manager is a simple web application that allows users to sign in with their Google account, create tasks, view their tasks, and update task statuses. Each user can only see and manage their own tasks.

## 2. Features

- **Google Authentication**: Sign in securely with your Google account
- **Create Tasks**: Add new tasks with a title
- **View Tasks**: See all your tasks in a list
- **Update Task Status**: Change task status between Planned, In Progress, and Complete
- **Status Filter**: Filter tasks by status (All, Planned, In Progress, Complete)
- **Task Counts**: View counts for total tasks and each status

## 3. Technology Stack

- React
- JavaScript
- Vite
- Firebase Authentication
- Cloud Firestore
- Firebase Hosting

## 4. How to Access the Application

GitHub Repository: https://github.com/mithun252/kovai

LIVE APPLICATION:
https://task-manager-7d674.web.app

## 5. Login Instructions

1. Open the application in your browser
2. Click "Sign in with Google"
3. Select your Google account
4. After successful login, the task dashboard appears
5. Click "Logout" to sign out

## 6. How to Create a Task

1. Ensure you are signed in
2. Enter a task title in the input field
3. Click "Add Task"
4. The new task will appear with "Planned" status
5. Empty task titles are not allowed

## 7. How to Update Status

Each task has a status dropdown with three options:

- **Planned**: The task is being planned
- **In Progress**: The task is currently being worked on
- **Complete**: The task is finished

Select the desired status to update the task. Changes are saved automatically to Firestore.

## 8. Task Filtering

Use the filter buttons above the task list to show only tasks matching a specific status:

- **All**: Shows all tasks
- **Planned**: Shows only planned tasks
- **In Progress**: Shows only in-progress tasks
- **Complete**: Shows only completed tasks

Filtering only affects the display and does not modify the database.

## 9. Task Counts

Counters displayed above the task list show:

- **Total**: Total number of your tasks
- **Planned**: Number of tasks with Planned status
- **In Progress**: Number of tasks with In Progress status
- **Complete**: Number of tasks with Complete status

Counts are calculated from your current tasks in Firestore.

## 10. Assumptions

1. Each task belongs to the Google-authenticated user who created it
2. Task titles are required
3. New tasks start with "Planned" status
4. Only the three specified statuses are supported (Planned, In Progress, Complete)
5. Task deletion is not included because it is not explicitly required
6. Editing the task title is not included because only task creation and status updates are explicitly required
7. The application is intended for individual task management rather than team collaboration
8. Google is the only authentication provider because Google Authentication is explicitly required
9. Tasks are stored in Cloud Firestore
10. The application does not include notifications, reminders, or deadlines because they were not part of the requirements

## 11. Known Limitations

- No task deletion functionality
- No task title editing functionality
- No offline support (requires internet connection)
- Single Google authentication provider only
- No task search or sorting beyond status filter

## 12. Important Notes / Warnings

- **Google authentication is required**: You must sign in with a Google account to use the application
- **Users can only access their own tasks**: Firestore security rules prevent access to other users' tasks
- **Internet connection is required**: The application requires a working internet connection
- **Do not share authentication credentials**: Your Google account credentials are private and should never be shared

## 13. Local Setup

```bash
git clone <repository-url>
cd task-manager
npm install
```

Create a `.env` file in the project root and add your Firebase configuration:

```
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

Run the development server:

```bash
npm run dev
```

## 14. Production Build

```bash
npm run build
```

## 15. Deployment

### Step 1: Create a Firebase Project

1. Go to https://console.firebase.google.com/
2. Click "Add Project"
3. Enter a project name (e.g., "task-manager")
4. Enable Google Analytics (optional)
5. Click "Create Project"

### Step 2: Enable Google Authentication

1. In Firebase Console, go to "Authentication" > "Sign-in method"
2. Enable "Google" as a sign-in provider
3. Note your "App ID" and "API Key" from Project Settings > General

### Step 3: Configure Environment Variables

Create a `.env` file in the project root with your Firebase credentials:

```
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:...
```

### Step 4: Set Up Firestore

1. In Firebase Console, go to "Firestore Database"
2. Click "Create Database"
3. Choose "Test Mode" initially (we will deploy security rules next)
4. Click "Enable"

### Step 5: Deploy Firestore Security Rules

```bash
firebase deploy --only firestore:rules
```

Or initialize Firestore with:

```bash
firebase init firestore
```

### Step 6: Deploy to Firebase Hosting

Make sure you are logged in:

```bash
firebase login
```

Build the project:

```bash
npm run build
```

Deploy:

```bash
firebase deploy
```

The deployed URL will be in the format `https://PROJECT_ID.web.app` or `https://PROJECT_ID.firebaseapp.com`.

### Step 7: Authorize Domain for Google Authentication

After deployment, ensure your deployed domain is in Firebase Console > Authentication > Settings > Authorized domains:
- `your-project-id.web.app`
- `localhost` (for development)

Test Google login on the LIVE URL, not only localhost.

### Step 8: Configure SPA Routing

The `firebase.json` file already includes a rewrite rule that routes all requests to `/index.html`, which is required for React Router SPAs. This ensures direct navigation does not result in 404 errors.

The deployed application has been tested and verified.

The deployed URL is recorded in the Live Application section above.

### Deployment Completed

Deployment was completed on 2026-09-16 using Firebase CLI account `mithun.s2023aiml@sece.ac.in`.

Firestore security rules were compiled successfully and deployed.
