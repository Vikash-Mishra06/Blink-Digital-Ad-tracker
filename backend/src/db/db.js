import dotenv from "dotenv";
dotenv.config({ path: "./.env" }); // 👈 EXPLICIT PATH

import { Pool } from "pg";

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL is undefined");
}

const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

pool.on("connect", () => {
  console.log("PostgreSQL connected (Neon)");
});

export const query = (text, params) => pool.query(text, params);
