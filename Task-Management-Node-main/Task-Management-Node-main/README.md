# Task Management API (Pure Node.js Backend)

A **Task Management REST API** built using **Node.js, Express, MongoDB**, featuring **JWT authentication with cookies**, **role-based access control**, and **multi-user task management**.
This project is **backend-only (Pure API)** — no EJS or frontend UI included.

---

## Features

* User Registration & Login
* JWT Authentication (stored in HTTP-only Cookies)
* Role-Based Access Control (`admin`, `user`)
* Multi-User Task Assignment
* Task CRUD Operations
* Admin & User Permission Separation
* Secure Password Hashing (bcrypt)
* MongoDB Relationships & Populate
* Soft Delete Support

---

## Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MongoDB (Mongoose)
* **Authentication:** JWT + Cookies
* **Security:** bcrypt, httpOnly cookies
* **Testing:** Postman

---

## Project Structure

project-root/
│
├── Config/
│   └── db.js
│
├── Controller/
│   ├── employee.controller.js
│   └── task.controller.js
│
├── middleware/
│   ├── verifyToken.js
│   └── roleCheck.js
│
├── models/
│   ├── employee.model.js
│   ├── task.model.js
│   └── category.model.js
│
├── routes/
│   ├── employee.routes.js
│   ├── task.routes.js
│   └── index.routes.js
│
├── uploads/
│
├── server.js
└── README.md

---

## Authentication Flow

1. User registers
2. User logs in
3. JWT token generated
4. Token stored in **HTTP-only cookie**
5. Protected routes accessed using middleware
6. Role checked before sensitive operations

---

## User Roles

| Role  | Permissions                                      |
| ----- | ------------------------------------------------ |
| User  | View own tasks, update own tasks                 |
| Admin | Create, view, update, delete tasks for all users |

---

## API Endpoints

### Authentication (Employee)

| Method | Endpoint                    | Description           |
| ------ | --------------------------- | --------------------- |
| POST   | `/employee/register`        | Register new user     |
| POST   | `/employee/login`           | Login user            |
| POST   | `/employee/logout`          | Logout user           |
| GET    | `/employee/profile`         | Get logged-in profile |
| PUT    | `/employee/update-profile`  | Update profile        |
| POST   | `/employee/change-password` | Change password       |

---

### Task Management

| Method | Endpoint           | Access             |
| ------ | ------------------ | ------------------ |
| POST   | `/task/create`     | Admin only         |
| GET    | `/task/all`        | Admin only         |
| GET    | `/task/my`         | Logged-in user     |
| PUT    | `/task/update/:id` | Admin / Task Owner |
| DELETE | `/task/delete/:id` | Admin only         |

---

## Sample Register Request

json
{
  "firstname": "Jay",
  "lastname": "Prajapati",
  "email": "jay@test.com",
  "password": "123456",
  "gender": "Male",
  "role": "user"
}

---

## Sample Login Request

json

{
  "email": "jay@test.com",
  "password": "123456"
}

Token is stored automatically in cookie

---

## Sample Create Task (Admin)

{
  "title": "Build Task Module",
  "description": "Create task APIs",
  "assignedTo": "USER_ID_HERE",
  "dueDate": "2026-02-20",
  "status": "Pending"
}

---

## Security Notes

* Passwords are **hashed**
* JWT stored in **httpOnly cookies**
* Unauthorized access blocked
* Role validation enforced
* Soft delete implemented (`isDelete`)

---

## Postman Testing Instructions

1. Register user
2. Login user (cookie auto saved)
3. Access protected routes
4. Admin only routes require admin login
5. No Bearer token required (cookie-based)


## Run Project

bash
npm install
npm start

Server runs at:

http://localhost:8005
