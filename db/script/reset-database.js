import {pool} from './index.js' 


// SQL query for creating and modifying tables
const queryText = `
DROP TABLE users CASCADE;
DROP TABLE meetups CASCADE;
DROP TABLE attendees CASCADE;

 CREATE TABLE IF NOT EXISTS users (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    parents_name TEXT NOT NULL,
    child_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    phone TEXT,
    role TEXT,
    profile_picture TEXT
);

INSERT INTO users (parents_name, child_name, email, password, phone, role, profile_picture) VALUES
    ('John Doe', 'Johnny', 'john@example.com', 'password123', '1234567890', 'admin', 'john_profile.jpg'),
    ('Jane Smith', 'Janey', 'jane@example.com', 'password456', '0987654321', 'user', 'jane_profile.png'),
    ('Alice Johnson', 'Ally', 'alice@example.com', 'password789', '1112223333', 'user', 'alice_profile.jpg'),
    ('Bob Brown', 'Bobby', 'bob@example.com', 'password101', '4445556666', 'moderator', 'bob_profile.jpg'),
    ('Charlie White', 'Charlie Jr.', 'charlie@example.com', 'password202', NULL, 'user', 'charlie_profile.png')
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
    max_participants INT,
    borough TEXT,
    parking TEXT CHECK (parking IN ('Yes', 'No')),  -- Parking option
    time_period TEXT CHECK (time_period IN ('Morning', 'Afternoon', 'Evening'))  -- Time period options
);

-- Sample data with the new time_period column and valid times
INSERT INTO meetups (organizer_id, title, description, location, date, age_group, skill_level, max_participants, borough, parking, time_period) VALUES
    (1, 'Weekend Football Fun', 'A casual football meetup for kids.', 'Central Park, London', '2024-10-05 10:00:00+01', '7-8', 'Beginner', 5, 'Hammersmith and Fulham', 'Yes', 'Morning'),
    (2, 'Junior Football League', 'Competitive football for junior players.', 'Westfield Sports Ground', '2024-10-12 15:00:00+01', '9-10', 'Intermediate', 5, 'Brent', 'No', 'Afternoon'),
    (3, 'Soccer Stars Training', 'Football drills and fun for young enthusiasts.', 'Community Center Field', '2024-10-19 09:00:00+01', '10-11', 'Beginner', 5, 'Ealing', 'Yes', 'Morning'),
    (1, 'Sunday Soccer Scrimmage', 'Friendly matches for kids aged 7-12.', 'Local Park', '2024-10-06 18:00:00+01', '11-12', 'Beginner', 10, 'Islington', 'No', 'Evening'),
    (2, 'Football Fundamentals', 'Learning the basics of football.', 'Town Hall Grounds', '2024-10-13 14:00:00+01', '7-8', 'Beginner', 12, 'Camden', 'Yes', 'Afternoon'),
    (3, 'Skills and Drills', 'Enhancing skills with fun drills.', 'School Field', '2024-10-20 11:00:00+01', '9-10', 'Intermediate', 8, 'Hackney', 'Yes', 'Morning'),
    (1, 'Kids Football Tournament', 'Friendly tournament for young players.', 'City Stadium', '2024-10-27 16:00:00+01', '10-11', 'Intermediate', 16, 'Southwark', 'No', 'Afternoon'),
    (2, 'After School Football Club', 'Weekly football sessions after school.', 'Local Sports Center', '2024-11-02 17:00:00+01', '11-12', 'Beginner', 15, 'Tower Hamlets', 'Yes', 'Evening'),
    (3, 'Goalkeeper Training Camp', 'Specialized training for aspiring goalkeepers.', 'Sports Academy', '2024-11-09 08:00:00+01', '9-10', 'Intermediate', 6, 'Wandsworth', 'Yes', 'Morning'),
    (1, 'Football Fitness Fun', 'Fitness through football activities.', 'Community Recreation Ground', '2024-11-16 15:00:00+01', '7-8', 'Beginner', 10, 'Bromley', 'No', 'Afternoon'),
    (2, 'Winter Football Workshop', 'Indoor sessions focusing on skills.', 'Indoor Sports Hall', '2024-11-23 10:00:00+01', '8-9', 'Intermediate', 12, 'Bromley', 'Yes', 'Morning'),
    (3, 'Football Skills Showcase', 'Show off your skills in a fun setting.', 'Central Sports Park', '2024-11-30 19:00:00+01', '11-12', 'All', 20, 'Richmond upon Thames', 'No', 'Evening'),
    (1, 'Football Parent-Child Day', 'A day of fun games for kids and parents.', 'City Park', '2024-12-07 10:00:00+01', '5-12', 'Beginner', 10, 'Barnet', 'Yes', 'Morning'),
    (2, 'Holiday Football Camp', 'A week of football during the holidays.', 'Local Stadium', '2024-12-14 09:00:00+01', '7-10', 'All', 30, 'Bexley', 'No', 'Morning'),
    (3, 'New Year Football Kickoff', 'Start the new year with football.', 'West London Field', '2025-01-04 16:00:00+01', '7-12', 'Beginner', 15, 'Greenwich', 'Yes', 'Afternoon'),
    (1, 'Football Coaching Clinic', 'A session for aspiring coaches.', 'University Pitch', '2025-01-11 10:00:00+01', '10-12', 'Intermediate', 10, 'Harrow', 'Yes', 'Morning'),
    (2, 'Football Skills Academy', 'Advanced skills training for dedicated players.', 'Elite Sports Complex', '2025-01-18 15:00:00+01', '9-10', 'Advanced', 12, 'Hounslow', 'No', 'Afternoon'),
    (3, 'Girls Football Training', 'Empowering girls through football.', 'Community Center', '2025-01-25 18:00:00+01', '7-11', 'Beginner', 10, 'Sutton', 'Yes', 'Evening'),
    (1, 'Football Themed Birthday Party', 'Celebrate your birthday with football games!', 'Birthday Park', '2025-02-01 12:00:00+01', '5-12', 'Beginner', 20, 'Croydon', 'No', 'Afternoon'),
    (2, 'Football Tactics Workshop', 'Learn about game strategies.', 'Local Library Hall', '2025-02-08 10:00:00+01', '10-12', 'Intermediate', 12, 'Lewisham', 'Yes', 'Morning'),
    (1, 'Spring Football Festival', 'Celebrate spring with football activities.', 'Victoria Park', '2025-03-15 14:00:00+01', '5-10', 'All', 30, 'Hackney', 'No', 'Afternoon'),
    (2, 'Family Football Day', 'A day of family-friendly football games.', 'Clapham Common', '2025-03-22 10:00:00+01', '7-12', 'Beginner', 20, 'Lambeth', 'Yes', 'Morning'),
    (3, 'Football Skills Development Camp', 'Focus on developing football skills.', 'St. James’s Park', '2025-03-29 18:00:00+01', '8-12', 'Intermediate', 15, 'Westminster', 'No', 'Evening');


CREATE TABLE IF NOT EXISTS attendees (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id BIGINT REFERENCES users(id),
    meetup_id BIGINT REFERENCES meetups(id),
    status TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

INSERT INTO attendees (user_id, meetup_id, status) VALUES

    (2, 1, 'Confirmed'),
    (3, 1, 'Confirmed'),
    (4, 1, 'Pending'),
    (5, 1, 'Confirmed'),
    (1, 1, 'Confirmed'),

   
    (3, 2, 'Confirmed'),
    (4, 2, 'Confirmed'),
    (5, 2, 'Pending'),
    (1, 2, 'Confirmed'),
    (2, 2, 'Confirmed'),

    
    (4, 3, 'Confirmed'),
    (5, 3, 'Confirmed'),
    (1, 3, 'Pending'),
    (2, 3, 'Confirmed');
  `
;


 /*(async () => {
     try {
    //Execute the SQL query
     await pool.query(queryText);
      console.log('Tables created/modified successfully');
      } catch (err) {
      console.error('Error executing query', err.stack);
     } finally {
    //End the pool to free up resources
    await pool.end();
  }
})();*/


/*async function getUsers() {
  const queryText = "SELECT * FROM users ORDER BY id ";
  // Use the pool object to send the query to the database
  const result = await pool.query(queryText);
  // The rows property of the result object contains the retrieved records
  return console.log(result.rows);

  // Query the database and return all resource ones
}*/


async function getUsers() {
  const queryText = "SELECT * FROM meetups ORDER BY organizer_id ";
  // Use the pool object to send the query to the database
  const result = await pool.query(queryText);
  // The rows property of the result object contains the retrieved records
  return console.log(result.rows);

  // Query the database and return all resource ones
}

/*async function getUsers() {
  const queryText = "SELECT * FROM attendees ORDER BY user_id ";
  // Use the pool object to send the query to the database
  const result = await pool.query(queryText);
  // The rows property of the result object contains the retrieved records
  return console.log(result.rows);

  // Query the database and return all resource ones
}*/
getUsers()


