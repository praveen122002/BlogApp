BlogApp - Full-Stack Blog Application
A full-stack blog application built with React, Django REST Framework, PostgreSQL, and JWT authentication.
BlogApp allows users to register, log in, create blogs, view blogs, edit their own blogs, and delete their own blogs. The project demonstrates authentication, authorization, validation, responsive UI, and REST API development.
🚀 Features
User registration
JWT login authentication
Access and refresh token support
Logout with refresh-token blacklisting
Protected API endpoints
Create, view, edit, and delete blogs
Users can edit/delete only their own blogs
Backend ownership authorization
Form validation and API error handling
Responsive React UI
Tailwind CSS styling
PostgreSQL database
RESTful APIs
Postman API testing
🛠️ Tech Stack
Frontend
React
Vite
React Router
Tailwind CSS
JavaScript
HTML5
Backend
Python
Django
Django REST Framework
Simple JWT
django-cors-headers
Database & Tools
PostgreSQL
Git
GitHub
VS Code
Postman
📁 Project Structure

```text
BlogApplication/
├── backend/
│   ├── config/
│   │   ├── settings.py
│   │   ├── urls.py
│   │   ├── asgi.py
│   │   └── wsgi.py
│   ├── blog/
│   │   ├── migrations/
│   │   ├── admin.py
│   │   ├── models.py
│   │   ├── permissions.py
│   │   ├── serializers.py
│   │   ├── urls.py
│   │   └── views.py
│   ├── manage.py
│   └── requirements.txt
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   └── Navbar.jsx
│   │   ├── pages/
│   │   │   ├── Register.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Blogs.jsx
│   │   │   ├── CreateBlog.jsx
│   │   │   └── EditBlog.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
├── .gitignore
└── README.md
```

🔐 Authentication & Authorization
The application uses JWT authentication with Django REST Framework.
Protected requests use:

```http
Authorization: Bearer <access_token>
```

Blog ownership is checked on the backend. The authenticated user becomes the blog author when creating a blog, and users cannot modify or delete another user's blog.
📝 Blog Model
Field Description
`id` Unique blog ID
`title` Blog title
`content` Blog content
`author` User who created the blog
`created_date` Creation timestamp
`updated_date` Last update timestamp
🔗 API Endpoints
Base URL:

```text
http://127.0.0.1:8000/api
```

Authentication
Method Endpoint Description
POST `/register/` Register a user
POST `/login/` Login and receive JWT tokens
POST `/token/refresh/` Refresh access token
GET `/profile/` Get authenticated user
POST `/logout/` Logout and blacklist refresh token
Blog APIs
Method Endpoint Description
GET `/blogs/` Get all blogs
POST `/blogs/` Create a blog
GET `/blogs/<id>/` Get one blog
PUT `/blogs/<id>/` Update a blog
PATCH `/blogs/<id>/` Partially update a blog
DELETE `/blogs/<id>/` Delete a blog
⚙️ Backend Setup

1. Clone the repository

```bash
git clone <your-github-repository-url>
cd BlogApplication
```

2. Create and activate a virtual environment
   Windows PowerShell:

```powershell
python -m venv venv
.
env\Scripts\Activate.ps1
```

3. Install dependencies

```powershell
cd backend
pip install -r requirements.txt
```

If `requirements.txt` has not been created yet:

```powershell
pip install django djangorestframework psycopg2-binary djangorestframework-simplejwt django-cors-headers
pip freeze > requirements.txt
```

4. Configure PostgreSQL
   Create a PostgreSQL database such as:

```text
Database: blog_db
User: postgres
```

Configure the database credentials in Django settings or environment variables. 5. Run migrations

```powershell
python manage.py makemigrations
python manage.py migrate
```

6. Start Django

```powershell
python manage.py runserver
```

Backend:

```text
http://127.0.0.1:8000/
```

💻 Frontend Setup
Open a new terminal:

```powershell
cd frontend
npm install
npm run dev
```

Frontend:

```text
http://localhost:5173/
```

🔄 Application Flow

```text
User
  ↓
React Frontend
  ↓
REST API
  ↓
Django REST Framework
  ├── JWT Authentication
  ├── Validation
  └── Authorization
  ↓
PostgreSQL
```

Blog Creation

```text
Create Blog Form
      ↓
POST /api/blogs/
      ↓
JWT Authentication
      ↓
request.user becomes author
      ↓
PostgreSQL
```

🧪 API Testing
The API was tested using Postman, including:
Registration success and validation
Login and invalid credentials
Token refresh
Profile authentication
Blog creation
Blog listing
Single blog retrieval
Owner update
Owner delete
Unauthorized update/delete
Invalid JWT
Missing JWT
Blog validation
Logout and refresh-token blacklisting
🎨 UI
The application uses a BlogApp developer-focused design with:
Dark navy navigation bar
Blue accent colors
Responsive blog cards
Login and registration pages
Create and edit blog forms
User avatar and username
Responsive layouts
🔒 Security
The project includes:
JWT authentication
Protected API endpoints
Backend ownership validation
Django password hashing
Read-only blog author field
Input validation
Refresh-token blacklisting
For production, development settings such as unrestricted CORS and `DEBUG=True` should be replaced with environment-specific configuration.
Never commit real passwords, secret keys, or other credentials to GitHub.
🌱 Environment Variables
For production, use environment variables for configuration.
Frontend example:

```text
VITE_API_BASE_URL=http://127.0.0.1:8000/api
```

Backend example:

```text
SECRET_KEY=your-secret-key
DEBUG=False
DB_NAME=blog_db
DB_USER=postgres
DB_PASSWORD=your-password
DB_HOST=localhost
DB_PORT=5432
```

Add `.env` to `.gitignore` so credentials are not committed.
📌 Future Improvements
Blog categories and tags
Search
Pagination
Featured images
Comments and likes
User profile
Password reset
Email verification
Rich text editor
Image upload
Automated tests
CI/CD
Production deployment
📚 Learning Outcomes
This project demonstrates practical experience with:
Python
Django
Django REST Framework
REST API development
JWT authentication
Authorization and permissions
React
React Router
React hooks
Tailwind CSS
PostgreSQL
CRUD operations
API integration
Validation and error handling
Git and GitHub
Postman
👨‍💻 Author
Praveen Kumar M
Full-Stack Developer | Python | Django | React | PostgreSQL
📄 License
This project is created for learning, portfolio, and demonstration purposes.
