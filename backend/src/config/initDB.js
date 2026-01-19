import fs from "fs";
import mysql from "mysql2/promise";
import dotenv from "dotenv";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from src folder
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const DB_NAME = process.env.DB_NAME;

async function initSchema() {
  try {
    // Lidhet me MySQL
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      port: process.env.DB_PORT
    });

    // Teston nese DB veq se ekziston ne MySQL
    const [rows] = await connection.query(
      "SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = ?",
      [DB_NAME]
    );

    if (rows.length > 0) {
      console.log(`Database '${DB_NAME}' already exists — skipping schema creation`);
      await connection.end();
      return; // Nese egziston, perfundo
    }

    // Nese nuk egziston, fillo inicializimin e DB
    await connection.query(`CREATE DATABASE \`${DB_NAME}\`;`);
    console.log(`Database '${DB_NAME}' created`);
    await connection.query(`USE \`${DB_NAME}\`;`);

    // Lexon schema.sql dhe e ndan ate ne statements te ekzekutueshem
    const schema = fs.readFileSync("./schema.sql", "utf-8");
    const statements = schema
      .split(";")
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0);

    for (const stmt of statements) {
      await connection.query(stmt);
    }

    console.log("Database schema initialized successfully");
    await connection.end();
  } catch (err) {
    console.error("Failed to initialize DB:", err.message);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  initSchema();
}

export default initSchema;