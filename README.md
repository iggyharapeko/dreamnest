# DreamNest

A beautiful dream journal application where you can capture, explore, and reflect on your dreams.

## Project Structure

```
dreamnest/
├── src/
│   ├── app/              # Next.js app directory
│   │   ├── api/         # API routes
│   │   ├── (auth)/     # Authentication pages
│   │   └── dreams/     # Dream-related pages
│   ├── components/      # Reusable components
│   │   ├── ui/         # UI components
│   │   └── forms/      # Form components
│   ├── config/         # Configuration files
│   │   ├── constants.ts   # App constants
│   │   └── environment.ts # Environment config
│   ├── context/        # React context providers
│   ├── lib/           # Library configurations
│   ├── utils/         # Utility functions
│   └── types/         # TypeScript type definitions
├── prisma/            # Database schema and migrations
├── public/           # Static assets
└── tests/           # Test files
```

## Environment Setup

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Update the environment variables in `.env` with your values

3. Install dependencies:
   ```bash
   npm install
   ```

4. Run database migrations:
   ```bash
   npx prisma migrate dev
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run tests
- `npm run prisma:studio` - Open Prisma Studio

## Technology Stack

- **Frontend**: Next.js, React, TailwindCSS, Framer Motion
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma
- **Authentication**: JWT
- **Styling**: TailwindCSS with custom theme
- **Animation**: Framer Motion
- **Type Safety**: TypeScript

## Code Style

- Use TypeScript for type safety
- Follow ESLint configuration
- Use Prettier for code formatting
- Follow component-based architecture
- Implement proper error handling
- Write meaningful comments
- Use constants for repeated values

## Contributing

1. Create a feature branch
2. Make your changes
3. Run tests and linting
4. Submit a pull request

## License

MIT License - see LICENSE file for details
