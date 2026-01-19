# Full Stack Application (React + TypeScript + Prisma + PostgreSQL)

This is a full-stack web application built using **React**, **TypeScript**, **Node.js**, **Prisma ORM**, and **PostgreSQL**, with **Docker** used to run the database.

---

## 🧰 Tech Stack

### Frontend
- React
- TypeScript
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express.js
- TypeScript
- Prisma ORM
- JWT Authentication

### Database
- PostgreSQL (Dockerized)

### Tools
- Docker & Docker Compose
- Prisma Migrate

---
## 🛠 Backend Setup (Node.js + TypeScript + Prisma)

### 1️⃣ Navigate to Backend Folder
```bash
cd backend
npm install
create a .env file

npx prisma generate
npx prisma migrate dev
tsc -b
node dist/index.js
```
## 🛠 Frontend Setup (React+ TypeScript + Tailwind)

### 1️⃣ Navigate to Frontend Folder
```bash
cd ../frontend
npm install
npm run dev

```

Api Structure :
## Base URL
/api/v1

---

## Roles

- **USER** – Can view stores and submit ratings  
- **OWNER** – Can manage their own store and view ratings  
- **ADMIN** – Full system control (users, stores, dashboard)

---

## Authentication & Authorization

- Authentication is handled using **JWT**
- Protected routes use:
  - `authenticate` middleware
  - `allowRoles([...])` middleware

---

## Root Routes

| Method | Endpoint | Description |
|------|---------|------------|
| GET | `/` | Server health check |
| GET | `/api/v1/` | Root router check |

---

## User Routes (`/api/v1/user`)

| Method | Endpoint | Access | Description |
|------|--------|-------|------------|
| POST | `/signup` | Public | User signup |
| POST | `/login` | Public | User login |
| GET | `/` | USER | Auth check |
| GET | `/stores` | USER | Fetch all stores |
| POST | `/stores/:storeId/rating` | USER | Rate a store |
| POST | `/update/password` | USER, OWNER | Update password |

---

##  System Administrator Routes (`/api/v1/systemAdministrator`)

| Method | Endpoint | Access | Description |
|------|--------|-------|------------|
| POST | `/signup` | Public | Admin signup |
| POST | `/login` | Public | Admin login |
| POST | `/add/store` | ADMIN | Add a new store |
| POST | `/addUser` | ADMIN | Add a new user |
| GET | `/users` | ADMIN | Get all users |
| GET | `/stores` | ADMIN | Get all stores |
| GET | `/admins` | ADMIN | Get all admins |
| GET | `/dashboard` | ADMIN | Get dashboard statistics |

### Dashboard Includes
- Total number of users  
- Total number of stores  
- Total number of submitted ratings  

---

## Store Owner Routes (`/api/v1/storeOwner`)

| Method | Endpoint | Access | Description |
|------|--------|-------|------------|
| POST | `/signup` | Public | Store owner signup |
| POST | `/login` | Public | Store owner login |
| GET | `/store` | OWNER | Fetch owner’s store |
| GET | `/ratings` | OWNER | View store ratings |
| POST | `/update/password` | OWNER | Update password |
| GET | `/users` | OWNER | Authorization test route |

---

## 🏬 Store Routes (`/api/v1/store`)

Store-related routes are handled internally and are accessed by **Admins** and **Users** based on roles.

---
