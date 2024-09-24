import {pool} from './index.js' 


// SQL query for creating and modifying tables
const queryText = `
  CREATE TABLE IF NOT EXISTS users (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    phone TEXT,
    role TEXT,
    profile_picture TEXT
  );
`
;

(async () => {
  try {
    // Execute the SQL query
    await pool.query(queryText);
    console.log('Tables created/modified successfully');
  } catch (err) {
    console.error('Error executing query', err.stack);
  } finally {
    // End the pool to free up resources
    await pool.end();
  }
})();
