# Sweet Shop Management System

A full-stack application for managing a sweet shop inventory, built with **Django REST Framework** (Backend) and **React Vite** (Frontend).

## Tech Stack

- **Backend**: Python 3.x, Django 5.x, Django REST Framework, SQLite
- **Frontend**: React (Vite), Axios, React Router DOM
- **Authentication**: Token-based Authentication (DRF)

## Prerequisites

- Python 3.8+ installed
- Node.js 16+ installed
- Git

## Setup Instructions

### Backend Setup

1. Navigate to the project root:
   ```bash
   cd Incubyte-assignment
   ```

2. Create a virtual environment (optional but recommended):
   ```bash
   python -m venv venv
   # Windows
   .\venv\Scripts\activate
   # Mac/Linux
   source venv/bin/activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Apply migrations:
   ```bash
   python manage.py migrate
   ```

5. Run tests (TDD verification):
   ```bash
   python manage.py test api
   ```

6. Start the server:
   ```bash
   python manage.py runserver
   ```
   The API will be available at `http://localhost:8000/api/`.

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   The app will run at `http://localhost:5173/`.

## Features

- **User Authentication**: Register and Login (Email/Password).
- **Sweet Management**: View list of sweets with stock and price.
- **Search & Filter**: Search sweets by name, category, and price range.
- **Purchase**: Users can purchase sweets (deducts stock).
- **Admin Restock**: Admins (Staff) can restock sweets.

## API Endpoints

- `POST /api/auth/register`: Register new user.
- `POST /api/auth/login`: Login user.
- `GET /api/sweets/`: List all sweets.
- `GET /api/sweets/search/`: Search with query params.
- `POST /api/sweets/{id}/purchase/`: Purchase a sweet.
- `POST /api/sweets/{id}/restock/`: Restock a sweet (Admin only).

## AI Usage Disclosure

This project was developed with the assistance of AI tools for logic building, TDD test generation, and documentation. All code was reviewed and verified.
