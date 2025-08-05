# NutriGuide AI

[![Vercel Deployment](https://vercel.com/gyash1512/nutriguide-ai/badge)](https://nutriguideai.vercel.app/)

NutriGuide AI is an intelligent nutrition assistant designed to provide personalized dietary guidance. It leverages the power of a powerful AI model to deliver meal plans, workout routines, and health summaries tailored to your unique medical data and preferences.

**Live Demo:** [nutriguideai.vercel.app](https://nutriguideai.vercel.app/)

## Key Features

*   **AI-Powered Chatbot:** Get instant answers to your nutrition and fitness questions with our intelligent, streaming chatbot.
*   **Personalized Diet Plans:** Receive custom 7-day diet plans based on your medical data, location, and dietary preferences.
*   **Custom Workout Plans:** Get personalized 7-day workout plans that take into account your fitness level, goals, and medical history.
*   **AI Health Summary:** Get a comprehensive, AI-generated summary of your health based on your medical records.
*   **Secure Data Management:** All your data is securely stored in a unified MongoDB database.

## Architecture

### Frontend

The frontend is a modern, responsive single-page application built with React and Vite. For more details, see the [frontend README](./frontend/README.md).

### Backend

The backend is a robust Node.js application built with Express. It uses MongoDB for data storage and the Google Vertex AI SDK to interact with the AI model. For more details, see the [backend README](./backend/README.md).

### System Architecture Diagram

```mermaid
graph TD
    A[User] -->|Interacts with| B(React Frontend);
    B -->|API Calls| C(Node.js Backend);
    C -->|Queries| D(MongoDB);
    C -->|Prompts| E(AI API);
    E -->|Responses| C;
    D -->|Data| C;
```

### Database Schema

```mermaid
erDiagram
    User {
        string name
        string email
        string password
        date dob
        number weight
        number height
        string gender
    }

    MedicalData {
        string email
        object complete_blood_count
        object lipid_panel
        object liver_function
        object kidney_function
        object blood_sugar
        object thyroid_function
        object vitamin_levels
        object inflammatory_markers
        object coagulation_tests
        object cancer_markers
        string ai_health_summary
    }

    MealPlan {
        string email
        string plan
    }

    WorkoutPlan {
        string email
        string plan
    }

    User ||--o{ MedicalData : "has"
    User ||--o{ MealPlan : "has"
    User ||--o{ WorkoutPlan : "has"
```

## Deployment

The application can be configured for continuous deployment to Azure Web App using GitHub Actions. The workflow can be defined in `.github/workflows/main_nutriback.yml`.
