# 📝 BlogApp - Full-Stack Blog Application

A full-stack blog application built with **React, Django REST Framework, PostgreSQL, and JWT authentication**.

BlogApp allows users to register, log in, create blogs, view blogs, edit their own blogs, and delete their own blogs. The project demonstrates **authentication, authorization, validation, responsive UI, and REST API development**.

---

## 🚀 Features

* 👤 User registration
* 🔐 JWT login authentication
* 🔄 Access and refresh token support
* 🚪 Logout with refresh-token blacklisting
* 🛡️ Protected API endpoints
* ✍️ Create blogs
* 📖 View blogs
* ✏️ Edit own blogs
* 🗑️ Delete own blogs
* 🔒 Backend ownership authorization
* ✅ Form validation
* ⚠️ API error handling
* 📱 Responsive React UI
* 🎨 Tailwind CSS styling
* 🐘 PostgreSQL database
* 🌐 RESTful APIs
* 🧪 Postman API testing

---

## 🛠️ Tech Stack

### Frontend

* React
* Vite
* React Router
* Tailwind CSS
* JavaScript
* HTML5

### Backend

* Python
* Django
* Django REST Framework
* Django REST Framework Simple JWT
* django-cors-headers

### Database & Tools

* PostgreSQL
* Git
* GitHub
* VS Code
* Postman

---

## 📁 Project Structure

```text
BlogApplication/
│
├── backend/
│   ├── config/
│   │   ├── settings.py
│   │   ├── urls.py
│   │   ├── asgi.py
│   │   └── wsgi.py
│   │
│   ├── blog/
│   │   ├── migrations/
│   │   ├── admin.py
│   │   ├── models.py
│   │   ├── permissions.py
│   │   ├── serializers.py
│   │   ├── urls.py
│   │   └── views.py
│   │
│   ├── manage.py
│   └── requirements.txt
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   └── Navbar.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Register.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Blogs.jsx
│   │   │   ├── CreateBlog.jsx
│   │   │   └── EditBlog.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

---

## 🔐 Authentication & Authorization

The application uses **JWT authentication** with Django REST Framework.

Protected API requests use:

```http
Authorization: Bearer <access_token>
```

### Authentication Flow

1. User registers an account.
2. User logs in with username and password.
3. Django returns an access token and refresh token.
4. The access token is used for protected API requests.
5. The refresh token can be used to obtain a new access token.
6. During logout, the refresh token is blacklisted.

### Blog Authorization

Blog ownership is validated on the backend.

When a user creates a blog:

```text
Authenticated User
       ↓
request.user
       ↓
Blog Author
```

Users can only **edit or delete their own blogs**.

---

## 📝 Blog Model

| Field          | Description               |
| -------------- | ------------------------- |
| `id`           | Unique blog ID            |
| `title`        | Blog title                |
| `content`      | Blog content              |
| `author`       | User who created the blog |
| `created_date` | Creation timestamp        |
| `updated_date` | Last update timestamp     |

---

## 🔗 API Endpoints

### Base URL

```text
http://127.0.0.1:8000/api
```

### 🔐 Authentication APIs

| Method | Endpoint          | Description                        |
| ------ | ----------------- | ---------------------------------- |
| `POST` | `/register/`      | Register a user                    |
| `POST` | `/login/`         | Login and receive JWT tokens       |
| `POST` | `/token/refresh/` | Refresh access token               |
| `GET`  | `/profile/`       | Get authenticated user             |
| `POST` | `/logout/`        | Logout and blacklist refresh token |

### 📝 Blog APIs

| Method   | Endpoint       | Description             |
| -------- | -------------- | ----------------------- |
| `GET`    | `/blogs/`      | Get all blogs           |
| `POST`   | `/blogs/`      | Create a blog           |
| `GET`    | `/blogs/<id>/` | Get one blog            |
| `PUT`    | `/blogs/<id>/` | Update a blog           |
| `PATCH`  | `/blogs/<id>/` | Partially update a blog |
| `DELETE` | `/blogs/<id>/` | Delete a blog           |

---

# ⚙️ Backend Setup

## 1. Clone the Repository

```bash
git clone <your-github-repository-url>
cd BlogApplication
```

---

## 2. Create and Activate Virtual Environment

### Windows PowerShell

```powershell
python -m venv venv
```

Activate the virtual environment:

```powershell
.\venv\Scripts\Activate.ps1
```

> If PowerShell blocks script execution, adjust your PowerShell execution policy according to your local environment.

---

## 3. Install Backend Dependencies

Navigate to the backend folder:

```powershell
cd backend
```

Install dependencies:

```powershell
pip install -r requirements.txt
```

If `requirements.txt` has not been created yet:

```powershell
pip install django djangorestframework psycopg2-binary djangorestframework-simplejwt django-cors-headers
```

Then generate the requirements file:

```powershell
pip freeze > requirements.txt
```

---

## 4. Configure PostgreSQL

Create a PostgreSQL database.

Example:

```text
Database: blog_db
User: postgres
```

Configure the PostgreSQL database credentials in Django settings or environment variables.

Example:

```text
DB_NAME=blog_db
DB_USER=postgres
DB_PASSWORD=your-password
DB_HOST=localhost
DB_PORT=5432
```

---

## 5. Run Database Migrations

```powershell
python manage.py makemigrations
python manage.py migrate
```

---

## 6. Start Django Development Server

```powershell
python manage.py runserver
```

Backend:

```text
http://127.0.0.1:8000/
```

---

# 💻 Frontend Setup

Open a new terminal.

Navigate to the frontend folder:

```powershell
cd frontend
```

Install dependencies:

```powershell
npm install
```

Start the development server:

```powershell
npm run dev
```

Frontend:

```text
http://localhost:5173/
```

---

# 🔄 Application Flow

```text
                User
                  │
                  ▼
          React Frontend
                  │
                  ▼
             REST API
                  │
                  ▼
        Django REST Framework
          ┌───────┼────────┐
          │       │        │
          ▼       ▼        ▼
        JWT   Validation  Authorization
                  │
                  ▼
             PostgreSQL
```

---

## ✍️ Blog Creation Flow

```text
Create Blog Form
       │
       ▼
POST /api/blogs/
       │
       ▼
JWT Authentication
       │
       ▼
request.user becomes author
       │
       ▼
PostgreSQL
```

---

# 🧪 API Testing

The REST APIs were tested using **Postman**.

The following scenarios were tested:

* User registration
* Registration validation
* Successful login
* Invalid login credentials
* Access token
* Refresh token
* Token refresh
* Profile authentication
* Blog creation
* Blog listing
* Single blog retrieval
* Owner blog update
* Owner blog deletion
* Unauthorized update/delete
* Invalid JWT
* Missing JWT
* Blog validation
* Logout
* Refresh-token blacklisting

---

# 🎨 User Interface

The application uses a **developer-focused BlogApp design** with:

* 🌙 Dark navy navigation bar
* 🔵 Blue accent colors
* 📰 Responsive blog cards
* 🔐 Login page
* 📝 Registration page
* ✍️ Create Blog page
* ✏️ Edit Blog page
* 👤 User avatar and username
* 📱 Responsive layouts

---

# 🔒 Security

The project includes:

* JWT authentication
* Protected API endpoints
* Backend ownership validation
* Django password hashing
* Read-only blog author field
* Input validation
* Refresh-token blacklisting
* CORS configuration

### Production Security

For production deployment, development settings such as:

```text
DEBUG=True
```

and unrestricted CORS should be replaced with environment-specific configuration.

**Never commit real passwords, secret keys, database credentials, or other sensitive information to GitHub.**

---

# 🌱 Environment Variables

For production, environment variables should be used for configuration.

### Frontend

Example:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000/api
```

### Backend

Example:

```env
SECRET_KEY=your-secret-key
DEBUG=False

DB_NAME=blog_db
DB_USER=postgres
DB_PASSWORD=your-password
DB_HOST=localhost
DB_PORT=5432
```

Add `.env` to `.gitignore`:

```gitignore
.env
```

---

# 📌 Future Improvements

Planned improvements include:

* 🏷️ Blog categories and tags
* 🔎 Search functionality
* 📄 Pagination
* 🖼️ Featured images
* 💬 Comments
* ❤️ Likes
* 👤 User profiles
* 🔑 Password reset
* 📧 Email verification
* 📝 Rich text editor
* 📤 Image upload
* 🧪 Automated tests
* 🔄 CI/CD
* 🚀 Production deployment

---

# 📚 Learning Outcomes

This project demonstrates practical experience with:

* Python
* Django
* Django REST Framework
* REST API development
* JWT authentication
* Authorization and permissions
* React
* React Router
* React Hooks
* Tailwind CSS
* PostgreSQL
* CRUD operations
* API integration
* Validation and error handling
* Git
* GitHub
* Postman

---

# 👨‍💻 Author

**Praveen Kumar M**

**Full-Stack Developer | Python | Django | React | PostgreSQL**

---

# 📄 License

This project is created for **learning, portfolio, and demonstration purposes**.
