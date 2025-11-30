// backend/scripts/diag-tables.js
import dotenv from "dotenv";

import { pool } from "./config/renderDb.js";
dotenv.config();

(async () => {
  const base_url = process.env.DATABASE_URL;
  if (!base_url) {
    console.log("base_url is missing");
  }
  try {
    console.log("DATABASE_URL:", process.env.DATABASE_URL || "(missing)");

    const info = await pool.query(
      `SELECT current_database() AS db, current_schema() AS schema, current_user, session_user;`
    );
    console.log("SESSION INFO:", info.rows[0]);

    const sp = await pool.query(`SHOW search_path;`);
    console.log("search_path:", sp.rows[0].search_path);

    const all = await pool.query(`
      SELECT schemaname, tablename, tableowner
      FROM pg_catalog.pg_tables
      WHERE schemaname NOT IN ('pg_catalog', 'information_schema')
      ORDER BY schemaname, tablename;
    `);
    console.log("ALL TABLES:", all.rows);

    const exact = await pool.query(`
      SELECT schemaname, tablename FROM pg_catalog.pg_tables WHERE tablename='users' LIMIT 5;
    `);
    console.log("EXACT match (tablename='users') =>", exact.rows);

    try {
      const sample = await pool.query("SELECT * FROM public.users LIMIT 3;");
      console.log("SAMPLE public.users =>", sample.rows);
    } catch (e) {
      console.log("Selecting public.users failed:", e.message);
    }
  } catch (err) {
    console.error("DIAG ERROR:", err);
  } finally {
    await pool.end().catch(() => {});
    process.exit(0);
  }
})();
