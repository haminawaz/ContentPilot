# 🧭 ContentPilot

[![Node.js](https://img.shields.io/badge/Node.js->=18.0.0-green)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3+-blue)](https://www.typescriptlang.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.18+-yellow)](https://expressjs.com/)
[![React](https://img.shields.io/badge/React-19.2-61dafb)](https://react.dev/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Latest-336791)](https://www.postgresql.org/)
[![License](https://img.shields.io/badge/License-ISC-blue)](#license)

ContentPilot is an intelligent, AI-powered SEO content generation platform that combines cutting-edge AI technology with smart search analytics to create high-quality, optimized content. It features a robust backend API and a modern, responsive frontend interface.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Development Guide](#development-guide)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### Content Generation
- **AI-Powered Content Creation**: Leverages OpenAI to generate high-quality, SEO-optimized articles
- **SERP Analysis**: Integrates with SerpAPI for competitive search result analysis
- **Customizable Content**: Control topic, language, and word count for generated content
- **Markdown Support**: Content is generated in markdown format for easy publishing

### Authentication & Authorization
- **Dual-Role Authentication**: Separate admin and user authentication systems
- **JWT-Based Security**: Secure token-based authentication
- **Email Verification**: OTP-based email verification for user accounts
- **Password Reset**: Secure password reset mechanism with OTP validation

### Backend Features
- **TypeScript** for type safety and improved developer experience
- **Express.js** with modern architecture and best practices
- **PostgreSQL** database with Prisma ORM for type-safe database operations
- **Security Middleware**: Helmet, CORS, rate limiting, and request validation
- **Comprehensive Error Handling**: Global error handling with detailed logging
- **Request Logging**: Winston-based logging with daily log rotation
- **Input Validation**: Joi-validator for robust request validation
- **Email Service**: Nodemailer integration for sending emails and OTP notifications

### Frontend Features
- **React 19** with TypeScript for a modern web interface
- **Responsive Design**: Mobile-first, fully responsive UI
- **Dark/Light Theme**: Theme switching with context-based state management
- **Real-time Feedback**: Toast notifications for user interactions
- **Loading States**: Smooth loading animations with Framer Motion
- **Markdown Rendering**: Display generated content with proper formatting
- **Clean Architecture**: Component-based structure with custom hooks

## 🛠️ Tech Stack

### Backend
| Technology | Purpose |
|---|---|
| **Node.js & Express.js** | REST API server and HTTP handling |
| **TypeScript** | Static typing and code quality |
| **PostgreSQL** | Primary database |
| **Prisma ORM** | Database query builder and schema management |
| **JWT** | Authentication and authorization |
| **Joi** | Schema validation for requests |
| **Helmet** | HTTP header security |
| **CORS** | Cross-Origin Resource Sharing |
| **Winston** | Structured logging |
| **OpenAI SDK** | AI content generation |
| **SerpAPI** | Search engine results API |
| **Nodemailer** | Email service |
| **Bcrypt** | Password hashing |

### Frontend
| Technology | Purpose |
|---|---|
| **React 19** | UI library and component framework |
| **TypeScript** | Type safety for React components |
| **Vite** | Fast build tool and dev server |
| **Axios** | HTTP client |
| **Framer Motion** | Animation library |
| **Tailwind CSS** (implied) | Styling and responsive design |
| **Lucide React** | Icon library |
| **React Markdown** | Markdown rendering |

## 📁 Project Structure

```
ContentPilot/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.ts          # Database connection configuration
│   │   │   └── env.ts               # Environment variables validation
│   │   ├── controllers/
│   │   │   ├── admin/
│   │   │   │   ├── auth.controller.ts
│   │   │   │   └── user.controller.ts
│   │   │   └── user/
│   │   │       ├── auth.controller.ts
│   │   │       └── search.controller.ts
│   │   ├── lib/
│   │   │   ├── prisma.ts            # Prisma client singleton
│   │   │   ├── openai.ts            # OpenAI integration
│   │   │   ├── serpapi.ts           # SerpAPI integration
│   │   │   └── email-templates.ts   # Email templates
│   │   ├── middleware/
│   │   │   ├── authMiddleware.ts
│   │   │   ├── adminAuthMiddleware.ts
│   │   │   ├── errorHandler.ts
│   │   │   ├── security.ts
│   │   │   ├── requestLogger.ts
│   │   │   └── joi.ts
│   │   ├── queries/
│   │   │   ├── admin/
│   │   │   │   ├── auth.ts
│   │   │   │   └── user.ts
│   │   │   └── user/
│   │   │       └── auth.ts
│   │   ├── routes/
│   │   │   ├── api.routes.ts
│   │   │   ├── health.routes.ts
│   │   │   ├── admin/
│   │   │   │   ├── auth.ts
│   │   │   │   ├── index.ts
│   │   │   │   └── user.ts
│   │   │   └── user/
│   │   │       ├── auth.ts
│   │   │       ├── index.ts
│   │   │       └── search.ts
│   │   ├── schema/
│   │   │   └── joi/
│   │   │       ├── common.ts
│   │   │       ├── index.ts
│   │   │       ├── admin/
│   │   │       │   └── user.ts
│   │   │       └── user/
│   │   │           ├── auth.ts
│   │   │           └── search.ts
│   │   ├── services/
│   │   │   ├── content-generator.service.ts
│   │   │   ├── email.service.ts
│   │   │   └── logger.service.ts
│   │   ├── types/
│   │   │   └── seo-content.types.ts
│   │   ├── app.ts                   # Express app setup
│   │   └── server.ts                # Server entry point
│   ├── prisma/
│   │   ├── schema.prisma            # Database schema definition
│   │   └── migrations/              # Database migrations
│   ├── logs/                        # Application logs (daily rotation)
│   ├── .env                         # Environment variables
│   ├── .env.sample                  # Environment variables template
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── InputForm.tsx        # Content generation form
│   │   │   ├── ResultDisplay.tsx    # Generated content display
│   │   │   ├── LoadingView.tsx      # Loading state UI
│   │   │   └── Toast.tsx            # Notification system
│   │   ├── context/
│   │   │   └── ThemeContext.tsx     # Dark/Light theme provider
│   │   ├── api.ts                   # API client configuration
│   │   ├── types.ts                 # TypeScript type definitions
│   │   ├── App.tsx                  # Main application component
│   │   ├── main.tsx                 # React entry point
│   │   ├── index.css                # Global styles
│   │   └── App.css                  # Application styles
│   ├── public/                      # Static assets
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   └── README.md
└── README.md (this file)
```

## 🔧 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** >= 18.0.0 ([Download](https://nodejs.org/))
- **npm** >= 9.0.0 or **yarn** >= 1.22.0
- **PostgreSQL** >= 12 ([Download](https://www.postgresql.org/download/))
- **Git** (optional, for version control)

### API Keys Required

- **OpenAI API Key** - For content generation ([Get it here](https://platform.openai.com/api-keys))
- **SerpAPI Key** - For search result analysis ([Get it here](https://serpapi.com/))

## 📦 Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd ContentPilot
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment variables file
cp .env.sample .env

# Generate Prisma client
npm run prisma:generate

# Run database migrations
npm run prisma:migrate
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install
```

## ⚙️ Configuration

### Backend Environment Variables

Create a `.env` file in the `backend/` directory with the following variables:

```env
# Server Configuration
PORT=3001
NODE_ENV=development

# Database Configuration
DATABASE_URL="postgresql://user:password@localhost:5432/contentpilot"

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=7d

# OpenAI Configuration
OPENAI_API_KEY=sk-your-openai-api-key
OPENAI_MODEL=gpt-4-turbo

# SerpAPI Configuration
SERP_API_KEY=your-serpapi-key

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=noreply@contentpilot.com

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173

# Logging
LOG_LEVEL=info
```

### Frontend API Configuration

Update the `API_URL` in [frontend/src/api.ts](frontend/src/api.ts):

```typescript
const API_URL = 'http://localhost:3001/api/v1';
```

## 🚀 Running the Application

### Backend

```bash
cd backend

# Development mode with hot-reload
npm run dev

# Build for production
npm run build

# Run production build
npm start

# Watch mode
npm run dev:watch

# Type checking
npm run type-check

# Linting
npm run lint

# Fix linting issues
npm run lint:fix
```

The backend server will start on `http://localhost:3001`

### Frontend

```bash
cd frontend

# Development mode with hot-reload
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Linting
npm run lint
```

The frontend will be available at `http://localhost:5173`

### Using Prisma Studio (Database GUI)

```bash
cd backend

# Open interactive database GUI
npm run prisma:studio
```

## 📡 API Documentation

### Base URL
```
http://localhost:3001/api/v1
```

### Health Check
```http
GET /health
```

### User Authentication

#### Register User
```http
POST /user/auth/register
Content-Type: application/json

{
  "first_name": "John",
  "last_name": "Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "password": "SecurePassword123!",
  "language": "en"
}
```

#### Login User
```http
POST /user/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePassword123!"
}
```

#### Verify Email
```http
GET /user/auth/verify-user?email=john@example.com&otp=123456
Content-Type: application/json

```

#### Request Password Reset
```http
POST /user/auth/forgot-password
Content-Type: application/json

{
  "email": "john@example.com"
}
```

#### Reset Password
```http
POST /user/auth/reset-password
Content-Type: application/json

{
  "email": "john@example.com",
  "otp": "123456",
  "new_password": "NewSecurePassword123!"
}
```

### Content Generation

#### Generate AI Content
```http
POST /ai-search
Content-Type: application/json
Authorization: Bearer <JWT_TOKEN>

{
  "topic": "How to learn machine learning",
  "language": "en",
  "word_count": 1500
}
```

**Response:**
```json
{
  "message": "Content generated successfully",
  "response": {
    "metadata": {
      "title": "How to Learn Machine Learning",
      "meta_description": "...",
      "keywords": ["machine learning", "AI", "..."]
    },
    "content": {
      "markdown": "# How to Learn Machine Learning\n...",
      "wordCount": 1523
    },
    "linkingStrategy": [...],
    "faq": [...]
  },
  "error": null
}
```

### Admin Operations

#### Admin Login
```http
POST /admin/auth/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "AdminPassword123!"
}
```

#### Get All Users (Admin Only)
```http
GET /admin/user/all
Authorization: Bearer <ADMIN_JWT_TOKEN>
```

## 💾 Database Schema

### Admin Model
```prisma
model Admin {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  password  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Users Model
```prisma
model Users {
  id                            Int      @id @default(autoincrement())
  first_name                    String
  last_name                     String
  email                         String   @unique
  phone                         String
  password                      String
  email_verified                Boolean  @default(false)
  email_verification_otp        String?
  email_verification_expires_at DateTime?
  reset_password_otp            String?
  reset_password_expires_at     DateTime?
  status                        String   @default("active")
  last_login_at                 DateTime?
  createdAt                     DateTime @default(now())
  updatedAt                     DateTime @updatedAt
}
```

## 🔐 Security Features

- ✅ **JWT Authentication**: Secure token-based authentication
- ✅ **Password Hashing**: Bcrypt for secure password storage
- ✅ **CORS Protection**: Configured cross-origin resource sharing
- ✅ **Helmet.js**: Security headers on all HTTP responses
- ✅ **Rate Limiting**: Prevents brute force attacks
- ✅ **Input Validation**: Joi schema validation on all requests
- ✅ **Error Handling**: Global error handler without exposing sensitive information
- ✅ **Email Verification**: OTP-based verification system
- ✅ **Request Logging**: All requests logged with Winston

## 🛠️ Development Guide

### Project Setup

1. **IDE Configuration**: Use VS Code with TypeScript extensions
2. **Linting**: ESLint configured for code quality
3. **Type Checking**: Run `npm run type-check` before commits
4. **Code Formatting**: Use Prettier (configure in project)

### Database Migrations

```bash
# Create a new migration
npm run prisma:migrate -- --name migration_name

# Deploy migrations (production)
npm run prisma:migrate:deploy

# Reset database (development only)
cd backend
npx prisma migrate reset
```

### Common Development Tasks

```bash
# Backend
cd backend

# Run type checking
npm run type-check

# Lint and fix code
npm run lint:fix

# Run tests
npm run test

# Run in development with hot-reload
npm run dev

# View/manage database
npm run prisma:studio
```

```bash
# Frontend
cd frontend

# Lint and fix code
npm run lint

# Build for production
npm run build

# Preview the build
npm run preview
```

## 📊 Performance Considerations

- Database queries are optimized with Prisma indexes
- API responses use compression middleware
- Frontend uses code splitting with Vite
- Images and assets should be optimized before deployment
- Implement caching strategies for frequently accessed data

## 🚢 Deployment

### Backend Deployment (Vercel Configuration Included)

1. Configure environment variables on deployment platform
2. Ensure database is accessible from deployment region
3. Run `npm run build` to create production build
4. Set `NODE_ENV=production`

See [backend/vercel.json](backend/vercel.json) for Vercel configuration.

### Frontend Deployment

1. Build the frontend: `npm run build`
2. Deploy the `dist/` directory to your hosting service
3. Update `API_URL` to point to production backend

## 📝 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 📧 Support & Contact

- **Issues**: Please report bugs and request features via GitHub Issues
- **Questions**: Open a discussion in GitHub Discussions
- **Security**: For security vulnerabilities, please email privately instead of using issues

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [React Documentation](https://react.dev/)
- [OpenAI API Reference](https://platform.openai.com/docs/)
- [SerpAPI Documentation](https://serpapi.com/docs)

---

**Built with ❤️ by the ContentPilot Team**

Last Updated: February 2, 2026