import dotenv from "dotenv";

dotenv.config();

export const port = process.env.PORT;
export const nodeEnv = process.env.NODE_ENV;
export const dbName = process.env.DB_NAME || "";
export const dbUsername = process.env.DB_USERNAME || "";
export const dbPassword = process.env.DB_PASSWORD || "";
export const dbPort = process.env.DB_PORT || 3306
export const dbHost = process.env.DB_HOST || "localhost";
export const jwtSecret = process.env.JWT_SECRET || "";
export const jwtExpiresIn = process.env.JWT_EXPIRES_IN || "";
export const cronJobSchedule = process.env.CRON_JOB_SCHEDULE || "";
export const redisURL = process.env.REDIS_URL || "";