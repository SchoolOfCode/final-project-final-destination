import pg from "pg";
import "dotenv/config";
import { readdir, readFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const connectionString = process.env.DB_CONNECTION_STRING;

if (!connectionString) {
  throw new Error("No DB_CONNECTION_STRING defined. Did you load in your env variables?");
}

const pool = new pg.Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});

async function runSqlFiles() {
  try {
    const sqlDir = path.join(__dirname, 'db', 'sql');
    const files = await readdir(sqlDir);
    const sqlFiles = files.filter(f => f.endsWith('.sql')).sort();
    
    for (const file of sqlFiles) {
      const filePath = path.join(sqlDir, file);
      const sql = await readFile(filePath, 'utf-8');
      console.log(`Executing SQL file: ${file}`);
      await pool.query(sql);
      console.log(`Completed SQL file: ${file}`);
    }
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log('No SQL directory found, skipping additional SQL files');
    } else {
      throw error;
    }
  }
}

async function resetDatabase() {
  const client = await pool.connect();
  console.log("Starting database reset...");

  try {
    await client.query("BEGIN");

    console.log("Dropping existing tables...");
    await client.query(`
      DROP TABLE IF EXISTS attendees CASCADE;
      DROP TABLE IF EXISTS meetups CASCADE;
      DROP TABLE IF EXISTS children CASCADE;
      DROP TABLE IF EXISTS verification_tokens CASCADE;
      DROP TABLE IF EXISTS sessions CASCADE;
      DROP TABLE IF EXISTS accounts CASCADE;
      DROP TABLE IF EXISTS users CASCADE;
      DROP TABLE IF EXISTS places CASCADE;
    `);

    console.log("Creating tables...");
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name TEXT,
        email TEXT UNIQUE,
        email_verified TIMESTAMP,
        image TEXT,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        provider TEXT,
        provider_account_id TEXT,
        password TEXT,
        role TEXT DEFAULT 'user',
        is_organizer BOOLEAN DEFAULT false
      );

      CREATE TABLE IF NOT EXISTS accounts (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        type TEXT NOT NULL,
        provider TEXT NOT NULL,
        provider_account_id TEXT NOT NULL,
        refresh_token TEXT,
        access_token TEXT,
        expires_at BIGINT,
        token_type TEXT,
        scope TEXT,
        id_token TEXT,
        session_state TEXT,
        UNIQUE(provider, provider_account_id)
      );

      CREATE TABLE IF NOT EXISTS sessions (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        expires TIMESTAMP NOT NULL,
        session_token TEXT NOT NULL UNIQUE,
        access_token TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS verification_tokens (
        identifier TEXT NOT NULL,
        token TEXT NOT NULL,
        expires TIMESTAMP NOT NULL,
        UNIQUE(identifier, token)
      );

      CREATE TABLE IF NOT EXISTS children (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        first_name TEXT NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS places (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        primary_use TEXT NOT NULL,
        borough TEXT NOT NULL,
        area_ha REAL NOT NULL,
        coordinates TEXT NOT NULL,
        parking BOOLEAN DEFAULT false,
        toilets BOOLEAN DEFAULT false
      );

      CREATE TABLE IF NOT EXISTS meetups (
        id SERIAL PRIMARY KEY,
        organizer_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        place_id INTEGER REFERENCES places(id),
        title TEXT NOT NULL,
        description TEXT,
        date TEXT,
        age_group TEXT,
        skill_level TEXT,
        max_participants INTEGER,
        time_period TEXT,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS attendees (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        child_id INTEGER REFERENCES children(id) ON DELETE CASCADE,
        meetup_id INTEGER REFERENCES meetups(id) ON DELETE CASCADE,
        status TEXT,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log("Creating indexes...");
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_meetups_date ON meetups(date);
      CREATE INDEX IF NOT EXISTS idx_attendees_meetup ON attendees(meetup_id);
      CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
      CREATE INDEX IF NOT EXISTS idx_meetups_place ON meetups(place_id);
      CREATE INDEX IF NOT EXISTS idx_children_user ON children(user_id);
      CREATE INDEX IF NOT EXISTS idx_attendees_user ON attendees(user_id);
      CREATE INDEX IF NOT EXISTS idx_attendees_child ON attendees(child_id);
      CREATE INDEX IF NOT EXISTS idx_sessions_token ON sessions(session_token);
      CREATE INDEX IF NOT EXISTS idx_accounts_user ON accounts(user_id);
      CREATE INDEX IF NOT EXISTS idx_sessions_user ON sessions(user_id);
    `);

    await client.query("COMMIT");
    console.log("Database structure created successfully");

    console.log("Running SQL seed files...");
    await runSqlFiles();
    
    console.log("Database reset completed successfully");
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Database reset failed:", error);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

resetDatabase().catch(console.error);