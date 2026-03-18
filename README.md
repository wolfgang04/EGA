# EGA Inventory Management System

A full-stack web application for managing tool and equipment inventory within an organization. Employees can browse available tools and submit borrow requests, while administrators can manage inventory, users, categories, and the full request lifecycle.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Environment Variables](#environment-variables)
  - [Database Setup](#database-setup)
  - [Installation](#installation)
  - [Running the App](#running-the-app)
- [Available Scripts](#available-scripts)
- [API Reference](#api-reference)
- [Database Schema](#database-schema)
- [Request Workflow](#request-workflow)

---

## Features

### Employee
- Browse tools by category with real-time availability
- Add tools to a request cart with quantity and notes
- Submit batch tool requests
- Track ongoing requests and view request history
- Manage personal profile

### Admin
- Manage tool inventory (create, edit tools with location and quantity)
- Manage categories
- Create and manage employee accounts
- Review all requests and update their status
- Filter request history by date range
- Dashboard with request analytics

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 19, TypeScript, Vite, TailwindCSS 4, Ant Design, React Router 7, TanStack React Query, Axios |
| **Backend** | Node.js, Express 5, TypeScript |
| **Database** | PostgreSQL (primary), Sequelize ORM |
| **Auth** | JWT (stored in HTTP-only cookies), bcrypt |
| **Dev Tools** | Nodemon, ESLint, Prettier, Concurrently |

---

## Project Structure

```
EGA/
├── client/                  # React + TypeScript frontend
│   ├── src/
│   │   ├── components/      # Reusable UI components (Admin, Employee, shared)
│   │   ├── pages/           # Page-level components
│   │   └── utils/           # API helpers
│   ├── vite.config.ts
│   └── package.json
│
├── server/                  # Express + TypeScript backend
│   ├── src/
│   │   ├── controllers/     # Business logic
│   │   ├── routes/          # API route definitions
│   │   ├── models/          # Sequelize models and associations
│   │   ├── middlewares/     # JWT auth middleware
│   │   └── utils/           # DB config, JWT helpers, validators
│   ├── db.sql               # PostgreSQL schema
│   └── package.json
│
├── package.json             # Root workspace scripts
└── README.md
```

---

## Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **npm** v9 or higher
- **PostgreSQL** v14 or higher

### Environment Variables

Create a `.env` file inside the `server/` directory. You can copy the example file:

```bash
cp server/.env.example server/.env
```

Then fill in the values:

```env
PORT=8080
CLIENT_URL="http://localhost:3000"

# PostgreSQL connection
HOST=localhost
DB_PORT=5432
USER=your_db_user
PASSWORD=your_db_password
DATABASE=ega

# Auth
SECRET=your_session_secret
SALT_ROUNDS=10
JWT_SECRET=your_jwt_secret
```

### Database Setup

1. Create the `ega` database in PostgreSQL:
   ```sql
   CREATE DATABASE ega;
   ```

2. Run the provided schema script to create all tables, enums, and triggers:
   ```bash
   psql -U your_db_user -d ega -f server/db.sql
   ```

### Installation

Install all dependencies for both the client and server from the root:

```bash
npm install
```

### Running the App

Start both the frontend (port 3000) and backend (port 8080) concurrently:

```bash
npm run start
```

| Service | URL |
|---|---|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:8080 |

---

## Available Scripts

### Root

| Script | Description |
|---|---|
| `npm run start` | Start frontend and backend concurrently |
| `npm test` | Run tests |

### Client (`/client`)

| Script | Description |
|---|---|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |

### Server (`/server`)

| Script | Description |
|---|---|
| `npm run start` | Start server with nodemon (auto-reload) |

---

## API Reference

All endpoints are prefixed with `/api`.

### Auth

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/auth/create` | Create a new user account |
| `POST` | `/auth/login` | Log in and receive JWT cookie |
| `POST` | `/auth/logout` | Log out and clear cookie |
| `POST` | `/auth/resetDefaultPass` | Reset password to default |
| `GET` | `/auth/authCheck` | Verify current authentication |

### Users

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/user/*` | Get user information |
| `POST` | `/user/*` | Update user information |

### Categories

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/category/create` | Create a new category |
| `GET` | `/category/categories` | List all categories |
| `GET` | `/category/categoriesOverview` | Category overview with tool counts |

### Tools

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/tool/create` | Create a new tool |
| `GET` | `/tool/tools/:id` | Get tools for a specific category |
| `GET` | `/tool/all` | Get all tools |
| `POST` | `/tool/edit/:id` | Edit a tool |

### Requests

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/request/create/tools` | Submit a tool request |
| `GET` | `/request/requests` | Get request updates |
| `POST` | `/request/status` | Update request status (Admin) |
| `GET` | `/request/overview/:id` | Get full request details |
| `GET` | `/request/ongoing` | Get current user's ongoing requests |
| `GET` | `/request/previous` | Get current user's request history |

---

## Database Schema

The PostgreSQL database consists of the following tables:

| Table | Description |
|---|---|
| `user_auth` | User accounts with role (`admin` / `employee`) and hashed password |
| `profile` | User profile details (name, email, contact, address, birthday, image) |
| `category` | Tool categories |
| `tool` | Inventory items linked to a category, with location and quantity |
| `request` | A borrow request submitted by an employee |
| `request_tool` | Junction table linking requests to specific tools with quantity and notes |
| `request_status_history` | Audit trail of all status changes, with timestamps and actor |

**Status lifecycle:** `pending` → `approved` / `denied` → `borrowed` → `returned`

PostgreSQL triggers automatically generate human-readable public IDs:
- Profiles: `emp-{id}` / `adm-{id}`
- Tools: `tl-{id}`
- Requests: `rq-{id}`

---

## Request Workflow

```
Employee creates request
        │
        ▼
   [pending]
        │
   Admin reviews
        │
   ┌────┴────┐
   ▼         ▼
[approved] [denied]
   │
   ▼
[borrowed]  ← Admin marks as borrowed when tool is handed over
   │
   ▼
[returned]  ← Admin marks as returned when tool is given back
```

Each status transition is recorded in `request_status_history` with the actor and timestamp.
