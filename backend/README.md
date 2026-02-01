# ShipFlex Backend

Professional Express.js backend application built with TypeScript following industry best practices.

## Features

- ✅ TypeScript for type safety and better developer experience
- ✅ Express.js with modern architecture
- ✅ Environment-based configuration
- ✅ PostgreSQL database with Prisma ORM
- ✅ Database queries organized in separate files
- ✅ Comprehensive error handling
- ✅ Security middleware (Helmet, CORS, Rate Limiting)
- ✅ Request logging with Winston
- ✅ Input validation with Joi-validator
- ✅ Clean code structure and separation of concerns
- ✅ Graceful shutdown handling
- ✅ Production-ready setup

## Project Structure

```
backend/
├── src/
│   ├── config/          # Configuration files
│   │   ├── database.ts  # Database connection
│   │   └── env.ts       # Environment variables
│   ├── controllers/     # Route controllers
│   ├── lib/             # Library files
│   │   └── prisma.ts    # Prisma client instance
│   ├── middleware/      # Custom middleware
│   │   ├── errorHandler.ts
│   │   ├── security.ts
│   │   └── requestLogger.ts
│   ├── queries/          # Database query functions
│   ├── routes/           # API routes
│   ├── types/            # TypeScript type definitions
│   ├── utils/            # Utility functions
│   │   ├── logger.ts
│   │   └── validation.ts
│   ├── app.ts            # Express app setup
│   └── server.ts         # Server entry point
├── prisma/
│   ├── schema.prisma     # Prisma schema file
│   └── README.md         # Prisma setup guide
├── dist/                 # Compiled JavaScript (generated)
├── logs/                 # Application logs
├── .env                  # Environment variables (create from env.template)
├── .gitignore
├── package.json
├── tsconfig.json         # TypeScript configuration
└── README.md
```

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0
- PostgreSQL (local or remote)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the backend directory:
```bash
cp env.template .env
```

3. Update the `.env` file with your configuration:
```env
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/shipflex?schema=public
```

4. Set up the database:
```bash
# Generate Prisma Client
npm run prisma:generate

# Run database migrations
npm run prisma:migrate
```

4. Create logs directory:
```bash
mkdir logs
```

### Running the Application

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Build for production:**
```bash
npm run build
```

**Production mode:**
```bash
npm start
```

The server will start on `http://localhost:3000` (or the port specified in your `.env` file).

## API Endpoints

### Health Check
- `GET /health` - Server health check

### API Routes
- `GET /api/v1` - API information
- `GET /api/v1/examples` - Get all examples
- `GET /api/v1/examples/active` - Get active examples
- `GET /api/v1/examples/:id` - Get example by ID
- `POST /api/v1/examples` - Create new example
- `PATCH /api/v1/examples/:id` - Update example
- `DELETE /api/v1/examples/:id` - Delete example

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment (development/production) | `development` |
| `PORT` | Server port | `3000` |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:password@localhost:5432/shipflex?schema=public` |
| `JWT_SECRET` | JWT secret key | `your-secret-key` |
| `CORS_ORIGIN` | Allowed CORS origins | `http://localhost:3000` |
| `RATE_LIMIT_WINDOW_MS` | Rate limit window (ms) | `900000` (15 min) |
| `RATE_LIMIT_MAX_REQUESTS` | Max requests per window | `100` |

## Best Practices Implemented

1. **Security**
   - Helmet.js for security headers
   - CORS configuration
   - Rate limiting
   - Input validation

2. **Error Handling**
   - Centralized error handling
   - Custom error classes
   - Proper HTTP status codes
   - Error logging

3. **Logging**
   - Winston logger
   - Request logging with Morgan
   - Separate log files for errors and combined logs

4. **Code Organization**
   - Separation of concerns
   - Modular structure
   - Reusable utilities
   - Clean architecture

5. **Performance**
   - Compression middleware
   - Prisma connection pooling
   - Efficient database queries
   - Type-safe database operations

## Development

### Adding New Routes

1. Create a controller in `src/controllers/`
2. Create a route file in `src/routes/`
3. Import and use the route in `src/routes/api.routes.ts`

Example:
```typescript
// src/routes/user.routes.ts
import express, { Router } from 'express';
import userController from '../controllers/user.controller';

const router: Router = express.Router();

router.get('/', userController.getAllUsers);
router.post('/', userController.createUser);

export default router;
```

### Adding Middleware

Create middleware files in `src/middleware/` and import them in `src/app.ts`.

## Scripts

- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Start the server (runs compiled JavaScript)
- `npm run dev` - Start in development mode with auto-reload (TypeScript)
- `npm run dev:watch` - Start in development mode with nodemon
- `npm test` - Run tests
- `npm run lint` - Run ESLint on TypeScript files
- `npm run lint:fix` - Fix ESLint errors
- `npm run type-check` - Check TypeScript types without compiling
- `npm run prisma:generate` - Generate Prisma Client
- `npm run prisma:migrate` - Create and apply database migrations
- `npm run prisma:migrate:deploy` - Apply migrations (production)
- `npm run prisma:studio` - Open Prisma Studio (database GUI)

## Database

This project uses **Prisma ORM** with **PostgreSQL**. All database queries are organized in separate files under `src/queries/` for better code organization and maintainability.

See `prisma/README.md` for detailed Prisma setup instructions.

## License

ISC

