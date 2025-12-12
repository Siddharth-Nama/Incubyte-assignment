# Sweet Shop Management System

**Git Repository:** [https://github.com/Siddharth-Nama/Incubyte-assignment](https://github.com/Siddharth-Nama/Incubyte-assignment)

## 1. Explanation of the Project
The Sweet Shop Management System is a full-stack web application designed to streamline inventory management and purchasing for a sweets shop. It bridges a robust Django backend with a dynamic React frontend to deliver a seamless user experience.

### Key Features
*   **Secure Authentication**: Role-Based Access Control (RBAC) restricts sensitive actions (Restock) to Admins, while allowing customers to Browse and Purchase.
*   **Dynamic Inventory**: Real-time stock updates. Users cannot purchase items that are out of stock.
*   **Search & Filter**: Advanced filtering by Name, Category, and Price Range using a custom-built API.
*   **Responsiveness**: A fully responsive "Green Theme" UI that works on Mobile and Desktop.

### Tech Stack
*   **Frontend**: React (Vite), CSS3 (Custom Design System), Axios
*   **Backend**: Django, Django REST Framework (DRF), SQLite
*   **Testing**: Django Test Framework (25+ tests covering Models, Views, and serializers)

## 2. Setup Instructions

### Backend (Django)
1.  Navigate to the root directory:
    ```bash
    git clone https://github.com/Siddharth-Nama/Incubyte-assignment.git
    cd Incubyte-assignment
    ```
2.  Create and activate virtual environment:
    ```bash
    python -m venv venv
    # Windows
    .\venv\Scripts\activate
    # Mac/Linux
    source venv/bin/activate
    ```
3.  Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```
4.  Run migrations and server:
    ```bash
    python manage.py migrate
    python manage.py populate_data  # Optional: Adds fake sweets/users
    python manage.py runserver
    ```

### Frontend (React)
1.  Navigate to frontend directory:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start Dev Server:
    ```bash
    npm run dev
    ```
4.  Access the app at `http://localhost:5173`.

## 3. Screenshots
> **Note**: Please run the application locally to interact with the live UI.

*   **Login Screen**: Clean, centered card layout with error handling.
*   **Dashboard**: Grid view of sweets with stock indicators and "Green" aesthetic.
*   **Search**: Real-time filtering by Category (Dropdown) and Price.

## 4. Test Report
The application has been rigorously tested using TDD principles.
*   **Total Tests**: 25
*   **Status**: ALL PASSED
*   **Coverage**: Models, Serializers, Authentication, Inventory Logic, Search.

**Summary Output:**
```text
Ran 25 tests in 25.967s

OK
```
*A detailed report is available in `TEST_REPORT.txt`.*

## 5. My AI Usage
I utilized AI tools to accelerate the development of this project, focusing on efficiency and best practices.
*   **Project Scaffolding**: AI helped generate the initial Django and Vite directory structures.
*   **Boilerplate Code**: Used AI to write standard CRUD Views and Serializers, allowing me to focus on business logic (permissions, inventory).
*   **Frontend Styling**: AI assisted in generating the "Green Theme" CSS variables and responsive media queries to ensure a professional look.
*   **Test Generation**: I leveraged AI to brainstorm edge cases and write unit tests for the Inventory system.

**Verification**: All AI-generated code was manually reviewed, refactored, and integrated by me to ensure correctness and adherence to the assignment requirements.

---

## Candidate Profile: Siddharth Nama
*"I don't just write code; I build solutions that scale."*

I am **Siddharth Nama**, a software engineer passionate about building robust systems.
*   **Email**: siddharthnama.work@gmail.com
*   **Phone**: +91-8000694996
*   **Code Philosophy**: Clean, Modular, and Test-Driven.
