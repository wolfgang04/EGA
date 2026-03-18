# 🛠️ EGA — Inventory Management System

> *Tired of sticky notes and spreadsheets to track who borrowed what? So were we.*

EGA is a full-stack tool and equipment inventory system built for organizations that actually need to know where their tools are. Employees can browse what's available, drop items into a request cart, and track their borrows — all in one place. Admins get a clean dashboard to approve requests, manage inventory, and keep an audit trail of every status change.

No more "I thought someone else returned it."

---

## ✨ What Can It Do?

### For Employees
Browsing the tool inventory feels like shopping — tools are organized by category, availability is shown in real time, and you can add multiple items to a single request with custom quantities and notes. Once submitted, you can follow the status of every request from pending all the way to returned.

- 🔍 Browse tools by category with live availability counts
- 🛒 Build a multi-tool request in one go, with per-item notes
- 📋 Track ongoing borrows and review your full request history
- 👤 Manage your personal profile

### For Admins
Admins hold the keys. They see every request across the organization, update statuses as tools move in and out, and have full control over what's in the catalog.

- 📦 Add and edit tools (name, category, location, quantity)
- 🗂️ Create and manage tool categories
- 👥 Create and manage employee accounts
- ✅ Approve, deny, mark as borrowed, mark as returned
- 📅 Filter request history by date range
- 📊 Dashboard overview of request activity

---

## 🏗️ How It's Built

EGA is a monorepo with a React frontend and a Node.js backend, talking to a PostgreSQL database.

| Layer | What's powering it |
|---|---|
| **Frontend** | React 19, TypeScript, Vite, TailwindCSS 4, Ant Design, React Router 7, TanStack React Query, Axios |
| **Backend** | Node.js, Express 5, TypeScript |
| **Database** | PostgreSQL + Sequelize ORM |
| **Auth** | JWT stored in HTTP-only cookies, bcrypt for passwords |
| **Dev Tooling** | Nodemon, ESLint, Prettier, Concurrently |

The project is split cleanly into two workspaces:

```
EGA/
├── client/                  # React + TypeScript frontend
│   └── src/
│       ├── components/      # UI building blocks (Admin, Employee, shared)
│       ├── pages/           # Top-level route views
│       └── utils/           # API helpers and shared utilities
│
├── server/                  # Express + TypeScript backend
│   ├── src/
│   │   ├── controllers/     # Business logic per domain
│   │   ├── routes/          # API route definitions
│   │   ├── models/          # Sequelize models + associations
│   │   ├── middlewares/     # JWT auth middleware
│   │   └── utils/           # DB config, JWT helpers, validators
│   └── db.sql               # PostgreSQL schema (tables, enums, triggers)
│
└── package.json             # Root scripts (runs both sides at once)
```

---

## 🚀 Getting It Running

Before you start, make sure you have these installed:

- **Node.js** v18+
- **npm** v9+
- **PostgreSQL** v14+

### Step 1 — Set up your environment

Copy the example env file and fill it in:

```bash
cp server/.env.example server/.env
```

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

### Step 2 — Set up the database

Create the database, then run the schema script to spin up all tables, enums, and triggers in one shot:

```bash
# Create the database
psql -U your_db_user -c "CREATE DATABASE ega;"

# Apply the schema
psql -U your_db_user -d ega -f server/db.sql
```

### Step 3 — Install dependencies

One command installs everything for both the frontend and backend:

```bash
npm install
```

### Step 4 — Start the app

```bash
npm run start
```

That's it. Both services boot up concurrently:

| Service | URL |
|---|---|
| 🖥️ Frontend | http://localhost:3000 |
| ⚙️ Backend API | http://localhost:8080 |

---

## 🧰 Useful Scripts

**From the root** (controls both services):
```bash
npm run start   # Start frontend + backend together
npm test        # Run tests
```

**Inside `client/`** (frontend only):
```bash
npm run dev     # Vite dev server with hot reload
npm run build   # Type-check + production bundle
npm run preview # Preview the production build locally
npm run lint    # ESLint check
```

**Inside `server/`** (backend only):
```bash
npm run start   # Start with nodemon (auto-restarts on file changes)
```

---

## 🔌 API Reference

All routes live under `/api`. Authentication is handled via JWT cookies — log in once and the cookie does the rest.

### 🔐 Auth
| Method | Endpoint | What it does |
|---|---|---|
| `POST` | `/auth/create` | Register a new user account |
| `POST` | `/auth/login` | Log in and set the JWT cookie |
| `POST` | `/auth/logout` | Log out and clear the cookie |
| `POST` | `/auth/resetDefaultPass` | Reset a password to its default |
| `GET` | `/auth/authCheck` | Verify the current session |

### 👤 Users
| Method | Endpoint | What it does |
|---|---|---|
| `GET` | `/user/*` | Fetch user information |
| `POST` | `/user/*` | Update user information |

### 🗂️ Categories
| Method | Endpoint | What it does |
|---|---|---|
| `POST` | `/category/create` | Create a new category |
| `GET` | `/category/categories` | List all categories |
| `GET` | `/category/categoriesOverview` | Categories with tool counts |

### 🔧 Tools
| Method | Endpoint | What it does |
|---|---|---|
| `POST` | `/tool/create` | Add a new tool to inventory |
| `GET` | `/tool/tools/:id` | Get tools in a specific category |
| `GET` | `/tool/all` | Get the full tool list |
| `POST` | `/tool/edit/:id` | Update a tool's details |

### 📬 Requests
| Method | Endpoint | What it does |
|---|---|---|
| `POST` | `/request/create/tools` | Submit a new tool request |
| `GET` | `/request/requests` | Get request status updates |
| `POST` | `/request/status` | Change a request's status (Admin) |
| `GET` | `/request/overview/:id` | Full details for one request |
| `GET` | `/request/ongoing` | Current user's active borrows |
| `GET` | `/request/previous` | Current user's past requests |

---

## 🗄️ Under the Hood — Database Design

The schema is built around a simple idea: track tools, who asked for them, and what happened at every step.

| Table | Purpose |
|---|---|
| `user_auth` | Accounts with role (`admin` / `employee`) and hashed password |
| `profile` | Personal details — name, email, contact, address, birthday, photo |
| `category` | Groups of related tools |
| `tool` | Individual inventory items with location and quantity |
| `request` | A borrow request from an employee |
| `request_tool` | Which tools are in a request, with quantity and notes |
| `request_status_history` | Full audit log — every status change, who made it, and when |

Every entity gets a human-readable public ID generated automatically by PostgreSQL triggers — so instead of seeing `id: 42`, you see `emp-42`, `tl-17`, or `rq-5`. Much friendlier.

---

## 🔄 The Request Lifecycle

A request travels through a well-defined set of states. Here's the full picture:

```
Employee submits request
         │
         ▼
     [pending]  ← waiting for admin review
         │
    Admin decides
         │
    ┌────┴────┐
    ▼         ▼
[approved]  [denied]
    │
    ▼
[borrowed]  ← tool physically handed over
    │
    ▼
[returned]  ← tool back in inventory
```

Every arrow in that diagram is a row in `request_status_history` — timestamped, attributed to the person who made the change, and permanent. Nothing gets quietly overwritten.
