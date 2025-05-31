const environment = {
  // Server Configuration
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 3000,

  // Database Configuration
  DATABASE_URL: process.env.DATABASE_URL,

  // Authentication
  JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',

  // API Configuration
  API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  
  // Feature Flags
  ENABLE_AUTH: process.env.ENABLE_AUTH === 'true' || true,
  ENABLE_DREAMS: process.env.ENABLE_DREAMS === 'true' || true,

  // Analytics and Monitoring
  ANALYTICS_ID: process.env.ANALYTICS_ID,
  
  // Social Media Integration
  TWITTER_API_KEY: process.env.TWITTER_API_KEY,
  FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID,
}

// Validate required environment variables
const requiredEnvVars = ['DATABASE_URL'] as const
for (const envVar of requiredEnvVars) {
  if (!environment[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`)
  }
}

export default environment 