# TaskFlow API

TaskFlow is a project and task management platform built with Node.js, Express, TypeScript, and PostgreSQL.

## Technology Stack

- **Node.js** — JavaScript runtime
- **Express** — HTTP server and API framework
- **TypeScript** — type safety
- **PostgreSQL** — relational database
- **Drizzle ORM** — type-safe database queries and schema migrations
- **Zod** — request and environment validation
- **Argon2** — secure password hashing
- **Helmet** — HTTP security headers
- **CORS** — cross-origin request configuration
- **Pino HTTP** — HTTP request logging

## Current Features

- Express application setup with TypeScript
- Environment variable validation
- Security middleware and HTTP request logging
- PostgreSQL database connection using a connection pool
- Drizzle ORM configuration and migrations
- Initial `users` database table
- Root health endpoint: `GET /`
- Database health endpoint: `GET /api/v1/health/db`
- Separate application configuration (`src/app.ts`) and server startup (`src/server.ts`)
- Registration request validation schema using Zod
- Email normalization and validation
- Password length validation
- Optional display-name validation
- Strict rejection of unexpected registration fields

## Project Structure

```text
taskflow-api/
├── drizzle/                 # Generated SQL migrations
├── src/
│   ├── config/
│   │   └── env.ts           # Environment variable validation
│   ├── db/
│   │   ├── index.ts         # PostgreSQL pool and Drizzle instance
│   │   └── schema.ts        # Database table definitions
│   ├── app.ts               # Express middleware and routes
│   └── server.ts            # HTTP server startup
├── .env                     # Local environment variables (not committed)
├── .env.example             # Environment variable template
├── drizzle.config.ts        # Drizzle Kit configuration
├── package.json
├── tsconfig.json
└── README.md
```

## Environment Variables

Create a local `.env` file based on `.env.example`.

```env
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://USERNAME:PASSWORD@localhost:5432/taskflow
```

Replace `USERNAME` and `PASSWORD` with your local PostgreSQL credentials. Never commit `.env` or publish database credentials.

## Development Commands

```bash
npm run dev        # Start the development server
npm run typecheck  # Check TypeScript types
npm run build      # Compile TypeScript
npm start          # Build and start the compiled server
npm run db:generate # Generate a database migration
npm run db:migrate  # Apply database migrations
```

These commands assume the corresponding scripts are configured in `package.json`.

## Health Endpoints

| Method | Endpoint            | Purpose                                      |
| ------ | ------------------- | -------------------------------------------- |
| GET    | `/`                 | Checks that the Express application responds |
| GET    | `/api/v1/health/db` | Checks database connectivity                 |

A successful database health check returns HTTP `200` with a response indicating that the database is connected.

## Database

The local PostgreSQL database is named `taskflow`.

The initial `users` table includes:

- `id` — UUID primary key
- `email` — unique email address
- `password_hash` — password hash
- `display_name` — optional display name
- `created_at` — creation timestamp
- `updated_at` — last-update timestamp

Schema changes are managed using Drizzle Kit migrations.

## Development Roadmap

- [x] Set up Express with TypeScript
- [x] Configure environment variables
- [x] Connect PostgreSQL using Drizzle ORM
- [x] Create and migrate the initial users table
- [x] Add application and database health endpoints
- [x] Separate app configuration from server startup
- [x] Validate user registration input with Zod
- [ ] Hash passwords securely with Argon2
- [ ] Implement user registration
- [ ] Implement login, access tokens, refresh tokens, and logout
- [ ] Add workspaces, memberships, projects, and tasks
- [ ] Add authorization, tests, and production hardening

## Security Notes

- Store passwords only as secure password hashes.
- Keep secrets and database credentials out of source control.
- Validate incoming API requests.
- Use database migrations to track schema changes.
- Add authentication, authorization, rate limiting, and production-specific security controls before deployment.
