# Sweet Shop Management System
**Live Application**
[Local Setup Only](#setup-instructions)

## Overview
Welcome to my submission for the Incubyte SDE Intern Assignment. I have engineered a high-performance Sweet Shop Management System that transforms inventory management into a seamless, interactive experience. This project isn't just a basic CRUD app—it's a demonstration of scalable architecture, Test-Driven Development (TDD), and a focus on user experience. I built this to handle complex data operations (search, filtering, inventory control) with ease, replicating the challenges faced in real-world production environments.

## Tech Stack
*   **Frontend**: **React (Vite)** for a blazing fast UI, styled with modular CSS to prove foundational mastery without relying on heavy frameworks.
*   **Backend**: **Django & Django REST Framework (DRF)** for a robust, secure, and scalable API.
*   **Database**: **SQLite** (Dev) optimized for rapid development and testing.
*   **Tools**: **Git/GitHub** for version control, **TDD** (Django Test Framework) for reliability.

## Why This Project Stands Out?
1.  **Architectural Purity**: I maintained a strict separation of concerns. The backend handles heavy lifting (auth, validation, logic), keeping the frontend lightweight and snappy.
2.  **Test-Driven Development (TDD)**: Unlike standard implementations, this project was built using strict TDD principles. Every model, serializer, view, and workflow was tested *before* implementation, ensuring zero regressions.
3.  **Professional-Grade Inventory Control**: Implemented logic for real-time stock deductions upon purchase and exclusive admin-only restocking capabilities.
4.  **Optimized Client-Side Performance**: The frontend manages state efficiently using React Hooks, ensuring that stock updates reflect instantly without unnecessary reloads.
5.  **Code Quality**: Zero clutter. No comments. Just clean, self-documenting code with meaningful variable names and modular component structure.
6.  **No Shortcuts**: I avoided "magic" UI libraries. Every component—from the Dashboard grid to the Search filters—is hand-crafted to meet the specific requirements.

## Implementation Details
*   **Secure Authentication**: A robust Token-based authentication system using DRF, securing api endpoints for registered users.
*   **Advanced Filtering**: The system supports dynamic queries. You can filter sweets by:
    *   **Search**: Name (fuzzy match)
    *   **Category**: Product Type
    *   **Price**: Precise Min/Max Range
*   **Inventory Logic**: 
    *   **Purchase**: Transactional updates that prevent overselling (stock < 0 checks).
    *   **Restock**: Protected endpoints accessible only to Staff/Admin users.
*   **Dynamic UI**: The Dashboard adapts based on user roles (Admin sees Restock controls; Users see Purchase only).

## Candidate Profile: Siddharth Nama
*"I don't just write code; I build solutions that scale."*

Hello! I'm **Siddharth Nama**, a passionate Software Engineer Intern from Kota, India. I thrive on solving complex backend challenges and crafting seamless user experiences. My journey involves:

*   Spearheading "Suvidha Manch" at the Haryana Government (C4GT), where I helped digitize 25,000+ roads.
*   Optimizing performance at Mercato Agency, creating systems that handle 10,000+ users with ease.
*   Driving innovation with AI-powered platforms like Scripty and AiProgress.
*   Leading teams and delivering results under pressure, from managing election portals to restocking systems.

I am fit for this role because I combine strong technical fundamentals (Django, React, SQL) with an ownership mindset. I treat every assignment like a production release—focusing on edge cases, maintainability, and user impact. I am ready to bring this energy and precision to the Incubyte team!

**Let's Connect:**
*   [LinkedIn](#)
*   [GitHub](#)
*   [LeetCode](#)
*   **Email**: siddharthnama.work@gmail.com
*   **Phone**: +91-8000694996

## Setup Instructions

Clone the repository:
```bash
git clone https://github.com/Siddharth-Nama/Incubyte-assignment.git
cd Incubyte-assignment
```

### Backend Setup:
```bash
# Navigate to root (where manage.py is)
python -m venv venv
# Windows
.\venv\Scripts\activate
# Mac/Linux
source venv/bin/activate

pip install -r requirements.txt
python manage.py migrate
# Verify tests (TDD)
python manage.py test api

python manage.py runserver
```

### Frontend Setup:
```bash
cd frontend
npm install
npm run dev
```
Visit `http://localhost:5173` to interact with the application.
