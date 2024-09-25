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
  
  INSERT INTO users (name, email, password, phone, role, profile_picture) VALUES
  ('John Doe', 'john@example.com', 'password123', '1234567890', 'admin', 'john_profile.jpg'),
  ('Jane Smith', 'jane@example.com', 'password456', '0987654321', 'user', 'jane_profile.png'),
  ('Alice Johnson', 'alice@example.com', 'password789', '1112223333', 'user', 'alice_profile.jpg'),
  ('Bob Brown', 'bob@example.com', 'password101', '4445556666', 'moderator', 'bob_profile.jpg'),
  ('Charlie White', 'charlie@example.com', 'password202', NULL, 'user', 'charlie_profile.png')
  ON CONFLICT (email)
  DO NOTHING;

  CREATE TABLE IF NOT EXISTS meetups (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    organizer_id BIGINT REFERENCES users(id),
    title TEXT NOT NULL,
    description TEXT,
    location TEXT,
    date TIMESTAMP WITH TIME ZONE,
    age_group TEXT,
    skill_level TEXT,
    max_participants INT
  );

  CREATE TABLE IF NOT EXISTS attendees (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id BIGINT REFERENCES users(id),
    meetup_id BIGINT REFERENCES meetups(id),
    status TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  );

  ALTER TABLE attendees
    DROP CONSTRAINT IF EXISTS attendees_meetup_id_fkey;

  ALTER TABLE attendees
    ADD CONSTRAINT attendees_meetup_id_fkey FOREIGN KEY (meetup_id) REFERENCES meetups(id);

  `
;


// (async () => {
//   try {
//     // Execute the SQL query
//     await pool.query(queryText);
//     console.log('Tables created/modified successfully');
//   } catch (err) {
//     console.error('Error executing query', err.stack);
//   } finally {
//     // End the pool to free up resources
//     await pool.end();
//   }
// })();


async function getUsers() {
  const queryText = "SELECT * FROM users ORDER BY id ";
  // Use the pool object to send the query to the database
  const result = await pool.query(queryText);
  // The rows property of the result object contains the retrieved records
  return console.log(result.rows);

  // Query the database and return all resource ones
}


getUsers()


