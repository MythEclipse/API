# Express API Starter Project

A starter project for building REST APIs using Express.js and TypeScript.

## Features

- Modern JavaScript (ES6+) and TypeScript support
- Environment configuration using dotenv
- RESTful API architecture
- Jest testing setup
- ESLint + Prettier code formatting
- Husky pre-commit hooks
- Nodemon for development
- Production-ready configuration

## Requirements

- Node.js 16+
- pnpm package manager

## Installation

```bash
# Clone the repository
git clone <repository-url>

# Install dependencies
pnpm install
```

## Configuration

Create a `.env` file in the root directory and add the required environment variables:

```env
PORT=3000
```

## Usage

```bash
# Development mode
pnpm run dev

# Build project
pnpm run build

# Run tests
pnpm run test

# Start production server
pnpm start
```

## Project Structure

```
src/
    ├── config/       # Configuration files
    ├── controllers/  # Route controllers
    ├── routes/       # API routes
    ├── services/     # Business logic
    ├── types/        # TypeScript types/interfaces
    ├── utils/        # Utility functions
    └── index.ts      # App entry point
```

## API Documentation

The API endpoints and documentation will be available at `/api/docs` when running the server.

## License

ISC
