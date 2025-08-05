# NutriGuide AI - Frontend

This is the frontend for the NutriGuide AI application, a modern, responsive single-page application built with React and Vite.

## Key Features

*   **AI-Powered Chatbot:** Get instant answers to your nutrition and fitness questions.
*   **Personalized Diet Plans:** Receive custom 7-day diet plans based on your medical data and preferences.
*   **Custom Workout Plans:** Get personalized 7-day workout plans tailored to your fitness level and goals.
*   **AI Health Summary:** Get a comprehensive, AI-generated summary of your health based on your medical records.

## Setup and Installation

### Prerequisites

*   Node.js (v18.x or later)
*   npm

### Installation

1.  **Navigate to the `frontend` directory:**
    ```bash
    cd frontend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Create a `.env` file** and add the following environment variables:
    ```
    VITE_API_URL="http://localhost:5000"
    VITE_REACT_APP_FIREBASE_API_KEY="your_firebase_api_key"
    VITE_REACT_APP_FIREBASE_AUTH_DOMAIN="your_firebase_auth_domain"
    VITE_REACT_APP_FIREBASE_PROJECT_ID="your_firebase_project_id"
    VITE_REACT_APP_FIREBASE_STORAGE_BUCKET="your_firebase_storage_bucket"
    VITE_REACT_APP_FIREBASE_MESSAGING_SENDER_ID="your_firebase_messaging_sender_id"
    VITE_REACT_APP_FIREBASE_APP_ID="your_firebase_app_id"
    VITE_REACT_APP_FIREBASE_MEASUREMENT_ID="your_firebase_measurement_id"
    ```
4.  **Start the development server:**
    ```bash
    npm run dev
    ```

## Available Scripts

*   `npm run dev`: Runs the app in the development mode.
*   `npm run build`: Builds the app for production to the `build` folder.
*   `npm run test`: Runs the linter.
*   `npm run preview`: Serves the production build locally.
