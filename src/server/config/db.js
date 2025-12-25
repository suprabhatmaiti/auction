import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool
  .query("SELECT NOW()")
  .then((res) =>
    console.log("Connected to render's PostgreSQL at:", res.rows[0].now)
  )
  .catch((err) => console.error("Database connection error:", err));
