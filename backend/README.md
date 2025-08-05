# NutriGuide AI - Backend

This is the backend for the NutriGuide AI application, a robust Node.js application built with Express.

## Key Features

*   **AI Integration:** Uses the Google Vertex AI SDK to interact with a powerful AI model for generating personalized diet plans, workout routines, and health summaries.
*   **Secure Data Management:** All user data is securely stored in a unified MongoDB database.
*   **RESTful API:** Provides a comprehensive RESTful API for the frontend to consume.

## Setup and Installation

### Prerequisites

*   Node.js (v18.x or later)
*   npm
*   A Google Cloud Platform project with the Vertex AI API enabled
*   A service account with the "Vertex AI User" role

### Installation

1.  **Navigate to the `backend` directory:**
    ```bash
    cd backend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Create a `.env` file** and add the following environment variables:
    ```
    MONGO_URI="your_mongodb_connection_string"
    GOOGLE_APPLICATION_CREDENTIALS="path/to/your/service_account.json"
    GCP_PROJECT_ID="your_gcp_project_id"
    GCP_LOCATION="your_gcp_location"
    FIREBASE_TYPE="service_account"
    FIREBASE_PROJECT_ID="your_firebase_project_id"
    FIREBASE_PRIVATE_KEY_ID="your_firebase_private_key_id"
    FIREBASE_PRIVATE_KEY="your_firebase_private_key"
    FIREBASE_CLIENT_EMAIL="your_firebase_client_email"
    FIREBASE_CLIENT_ID="your_firebase_client_id"
    FIREBASE_AUTH_URI="https://accounts.google.com/o/oauth2/auth"
    FIREBASE_TOKEN_URI="https://oauth2.googleapis.com/token"
    FIREBASE_AUTH_PROVIDER_X509_CERT_URL="https://www.googleapis.com/oauth2/v1/certs"
    FIREBASE_CLIENT_X509_CERT_URL="your_firebase_client_x509_cert_url"
    FIREBASE_UNIVERSE_DOMAIN="googleapis.com"
    ```
4.  **Start the server:**
    ```bash
    npm start
    ```

## Available Scripts

*   `npm start`: Runs the app in production mode.
*   `npm run dev`: Runs the app in development mode with nodemon.
*   `npm test`: Placeholder for tests.
*   `npm run build`: Placeholder for a build step.
