# Favorite Movies & TV Shows Web Application - Backend

This is the backend service for the **Favorite Movies & TV Shows** web application. It allows users to manage a list of their favorite movies and TV shows, providing a clean RESTful API for adding, viewing, editing, and deleting entries.

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Setup & Local Development](#setup--local-development)

  - [1. Clone the Repository](#1-clone-the-repository)
  - [2. Install Dependencies](#2-install-dependencies)
  - [3. Configure Environment Variables](#3-configure-environment-variables)
  - [4. Database Setup & Migrations](#4-database-setup--migrations)
  - [5. Run the Application (Development)](#5-run-the-application-development)

- [Database Schema](#database-schema)
- [API Endpoints](#api-endpoints)

  - [1. Add New Entry (POST /api/media)](#1-add-new-entry-post-apimedia)
  - [2. Get All Entries (GET /api/media)](#2-get-all-entries-get-apimedia)
  - [3. Get Entry by ID (GET /api/media/\:id)](#3-get-entry-by-id-get-apimediaid)
  - [4. Edit Existing Entry (PUT /api/media/\:id)](#4-edit-existing-entry-put-apimediaid)
  - [5. Delete Entry (DELETE /api/media/\:id)](#5-delete-entry-delete-apimediaid)

- [Deployment](#deployment)

---

## Features

- **Add New Entry**: Securely add new movie or TV show entries with comprehensive details.
- **Required Fields**: `title`, `type` (`"Movie"` | `"TV Show"`), `director`, `budget`, `location`, `duration`, `yearTime`.
- **Optional Field**: `imageUrl` for a poster/thumbnail (defaults to a placeholder if not provided).
- **View All Entries**: Retrieve all media entries with pagination.
- **Edit Entry**: Update any detail of an existing movie or TV show entry.
- **Delete Entry**: Remove entries from the database.
- **Robust Validation**: Powered by Zod for strong data integrity.
- **RESTful API Design**: Clean and standard endpoints.
- **Type-Safety**: Built with TypeScript and Prisma.

---

## Technology Stack

- **Runtime**: Node.js
- **Web Framework**: Express.js
- **Database**: MySQL
- **ORM**: Prisma
- **Validation**: Zod
- **Language**: TypeScript
- **Environment Management**: Dotenv
- **CORS**: `cors` middleware

---

## Prerequisites

Ensure you have the following installed:

- **Node.js** (v18+): [Download Node.js](https://nodejs.org)
- **npm** (comes with Node.js)
- **MySQL Server**:

  - Local: via official installers, Homebrew (macOS), or Docker
  - Cloud: Railway, PlanetScale, AWS RDS, Google Cloud SQL, etc.

---

## Setup & Local Development

### 1. Clone the Repository

```bash
git clone https://github.com/yosefHesham/favorite-movie-be
cd favorite-movie-be
```

---

### 2. Install Dependencies

```bash
npm install
```

---

### 3. Configure Environment Variables

````bash

Create a `.env` file in your root directory:

```env
DATABASE_URL="mysql://YOUR_LOCAL_MYSQL_USER:YOUR_LOCAL_MYSQL_PASSWORD@localhost:3306/your_local_database_name"
PORT=5000
NODE_ENV=development
````

---

### 4. Database Setup & Migrations

Create your database (if it doesn't exist):

```sql
CREATE DATABASE your_local_database_name;
```

Apply Prisma schema:

```bash
npx prisma migrate dev --name initial_media_setup
npx prisma generate
```

---

### 5. Run the Application (Development)

```bash
npm run dev
```

The server will run at: [http://localhost:5000](http://localhost:5000)

---

## 🗃️ Database Schema

Defined in `prisma/schema.prisma`:

```ts
model Media {
  id        Int      @id @default(autoincrement())
  title     String
  type      String
  director  String
  budget    String
  location  String
  duration  String
  yearTime  String
  imageUrl  String?  @default("Your default image URL here")
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

---

## 📡 API Endpoints

All endpoints are prefixed with `/api/media`.
Base URL (dev): `http://localhost:5000/api/media`

---

### 1. Add New Entry (POST `/api/media`)

**Body:**

```json
{
  "title": "Interstellar",
  "type": "Movie",
  "director": "Christopher Nolan",
  "budget": "$165M",
  "location": "Iceland, Los Angeles",
  "duration": "169 min",
  "yearTime": "2014",
  "imageUrl": "https://example.com/interstellar_poster.jpg"
}
```

**Success (201):**

```json
{
  "id": 1,
  "title": "Interstellar",
  ...
  "createdAt": "...",
  "updatedAt": "..."
}
```

**Error (400):**

```json
{
  "errors": [
    {
      "path": "title",
      "message": "Title is required",
      "code": "too_small"
    }
  ]
}
```

---

### 2. Get All Entries (GET `/api/media`)

**Query Parameters:**

- `page` (optional)
- `limit` (optional)

**Success (200):**

```json
{
  "data": [ ... ],
  "meta": {
    "total": 25,
    "page": 1,
    "limit": 10,
    "totalPages": 3
  }
}
```

---

### 3. Edit Existing Entry (PUT `/api/media/:id`)

**URL Param:** `:id`
**Body:** Any updatable fields.

```json
{
  "budget": "$200M",
  "imageUrl": null,
  "location": "Vancouver, Canada"
}
```

**Success (200):** Updated object
**Errors:** `400 Bad Request`, `404 Not Found`

---

### 5. Delete Entry (DELETE `/api/media/:id`)

**URL Param:** `:id`
**Success (204):** No content
**Errors:** `400 Bad Request`, `404 Not Found`

---

## 🚀 Deployment

### 1. Host Your MySQL Database

You can use any MySQL hosting service. Here are some popular options:

- **Railway**
- **PlanetScale**
- **AWS RDS**
- **Google Cloud SQL**
- **DigitalOcean Managed Databases**

Copy the provided connection string into your `.env`:

```env
DATABASE_URL="your_mysql_connection_url"
```

---

### 3. Configure on Hosting Platform (e.g., Render)

- Create a new web service
- Connect to your GitHub repo
- Add environment variables:

  - `DATABASE_URL`
  - `PORT`
  - `NODE_ENV=production`

**Build Command:**

```bash
npm install && npm run build && npx prisma migrate deploy
```

**Start Command:**

```bash
npm start
```

Trigger deployment and you're live!
