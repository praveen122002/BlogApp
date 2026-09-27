# 📘 BlogApp Operations & Commands Cheatsheet

A complete reference guide for running, maintaining, and deploying the **Frontend** and **Backend**.

---

## 🗂️ Project Directory Overview

```text
blogapp/
├── frontend/    # React 19 + Vite + Tailwind CSS SPA
└── backend/     # Django 5 + Django REST Framework + SimpleJWT API
```

---

## 💻 1. Frontend Commands (`frontend/`)

The frontend is built with **React 19**, bundled with **Vite**, and styled with **Tailwind CSS v4**.

> Always run these commands inside the `frontend/` directory.

### Quick Navigation
```powershell
cd frontend
```

| Task | Command | Description |
| :--- | :--- | :--- |
| **Install Dependencies** | `npm install` | Installs all packages listed in `package.json` |
| **Start Dev Server** | `npm run dev` | Runs the Vite local dev server (default: `http://localhost:5173`) |
| **Production Build** | `npm run build` | Compiles and optimizes assets into the `dist/` directory |
| **Preview Build** | `npm run preview` | Locally serves and tests the production build |
| **Run Linter** | `npm run lint` | Runs ESLint to check for code quality and syntax errors |

### Environment Variables
Located in `frontend/.env`:
```env
VITE_API_URL=http://127.0.0.1:8000/api
```

---

## 🐍 2. Backend Commands (`backend/`)

The backend is powered by **Django 5** and **Django REST Framework (DRF)**, connected to PostgreSQL via `DATABASE_URL`.

> Always activate your Python virtual environment before running any `python manage.py` commands.

### Quick Navigation
```powershell
cd backend
```

### Environment & Dependency Setup

```powershell
# 1. Create a virtual environment (if not already created)
python -m venv venv

# 2. Activate Virtual Environment
# Windows PowerShell:
.\venv\Scripts\Activate.ps1
# Windows Command Prompt (CMD):
.\venv\Scripts\activate.bat
# Linux / macOS:
source venv/bin/activate

# 3. Install required packages
pip install -r requirements.txt

# 4. Save newly installed packages to requirements.txt
pip freeze > requirements.txt
```

### Django Management Commands

| Task | Command | Description |
| :--- | :--- | :--- |
| **Start API Server** | `python manage.py runserver` | Launches server at `http://127.0.0.1:8000` |
| **Start on Custom Port** | `python manage.py runserver 8080` | Starts server on port 8080 |
| **Inspect Migrations** | `python manage.py showmigrations` | Lists all applied and pending database migrations |
| **Generate Migrations** | `python manage.py makemigrations` | Detects model changes and generates migration files |
| **Apply Migrations** | `python manage.py migrate` | Applies pending migrations to the database |
| **Create Admin Account**| `python manage.py createsuperuser` | Prompts to create an admin user for `/admin` |
| **Open Django Shell** | `python manage.py shell` | Interactive Python terminal with Django context |
| **Run Unit Tests** | `python manage.py test` | Executes test suites in `blog/tests.py` |

### Database Connection Configuration
Configured in `backend/.env`:
```env
SECRET_KEY=django-insecure-m^2*9+t9ni9olm%(&vmen09wv8%j1wx66^%z!$x=%--i(8sxy$'
DEBUG=True
DATABASE_URL=postgresql://neondb_owner:npg_UpuRft3inMJ6@ep-broad-band-b41jo4d3-pooler.c-6.us-east-2.aws.neon.tech/neondb?sslmode=require
```

---

## ⚡ Quick Daily Workflow Summary

| Service | Directory | Command | Default URL |
| :--- | :--- | :--- | :--- |
| **Frontend** | `frontend/` | `npm run dev` | `http://localhost:5173` |
| **Backend API** | `backend/` | `python manage.py runserver` | `http://127.0.0.1:8000` |
| **Admin Panel** | `backend/` | - | `http://127.0.0.1:8000/admin` |
