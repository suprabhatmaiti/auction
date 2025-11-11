import pkg from "pg";
import dotenv from "dotenv";

const { Pool } = pkg;
dotenv.config();

console.log("Loaded DB config:", {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS ? "✔️ Loaded" : "❌ Missing",
});

export const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: 5432,
});

pool
  .connect()
  .then(() => console.log("Connect to PostgreSql"))
  .catch((err) => console.log("Database connection error:", err));
