WITH organizer_ids AS (
  SELECT 
    id 
  FROM 
    users 
  WHERE 
    is_organizer = true
) INSERT INTO meetups (
  organizer_id, place_id, title, description, 
  date, age_group, skill_level, max_participants, 
  time_period
) 
VALUES 
  (
    1, 
    (
      SELECT 
        id 
      FROM 
        places 
      ORDER BY 
        RANDOM() 
      LIMIT 
        1
    ), 'Fun Football for 5-6 Year Olds', 
    'A friendly kickabout focused on fun and basic skills. Perfect for children just starting their football journey. We will play small-sided games and do some fun drills.', 
    '2025-09-03', 
    '5-6', 
    'Beginner', 
    12, 
    'Morning'
  ), 
  (
    1, 
    (
      SELECT 
        id 
      FROM 
        places 
      ORDER BY 
        RANDOM() 
      LIMIT 
        1
    ), 'Skills Session for 7-8 Year Olds', 
    'Focus on developing core football skills including passing, dribbling and shooting. Suitable for children who have some football experience.', 
    '2025-09-10', 
    '7-8', 
    'Intermediate', 
    16, 
    'Afternoon'
  ), 
  (
    1, 
    (
      SELECT 
        id 
      FROM 
        places 
      ORDER BY 
        RANDOM() 
      LIMIT 
        1
    ), 'Advanced Play for 9-11 Year Olds', 
    'More complex drills and game scenarios for older children. We will work on positioning, teamwork and tactical understanding.', 
    '2025-09-17', 
    '9-11', 
    'Advanced', 
    20, 
    'Evening'
  ), 
  (
    1, 
    (
      SELECT 
        id 
      FROM 
        places 
      ORDER BY 
        RANDOM() 
      LIMIT 
        1
    ), 'Beginners Welcome: 5-7 Years', 
    'A welcoming session for younger children new to football. Focus on having fun while learning the basics.', 
    '2025-09-24', 
    '5-7', 
    'Beginner', 
    14, 
    'Morning'
  ), 
  (
    1, 
    (
      SELECT 
        id 
      FROM 
        places 
      ORDER BY 
        RANDOM() 
      LIMIT 
        1
    ), 'Mixed Age Group Fun Session', 
    'An inclusive session for all abilities ages 8-11. Children will be grouped appropriately for activities. Emphasis on enjoyment and participation.', 
    '2025-10-01', 
    '8-11', 
    'Mixed', 
    24, 
    'Afternoon'
  ), 
  (
    1, 
    (
      SELECT 
        id 
      FROM 
        places 
      ORDER BY 
        RANDOM() 
      LIMIT 
        1
    ), 'Development Session 6-8 Years', 
    'Technical skills development in a fun environment. Perfect for children who want to improve their football abilities.', 
    '2025-10-08', 
    '6-8', 
    'Intermediate', 
    16, 
    'Morning'
  ), 
  (
    1, 
    (
      SELECT 
        id 
      FROM 
        places 
      ORDER BY 
        RANDOM() 
      LIMIT 
        1
    ), 'Advanced Skills 10-11 Years', 
    'Higher intensity session for experienced players. Focus on advanced techniques and game understanding.', 
    '2025-10-15', 
    '10-11', 
    'Advanced', 
    18, 
    'Evening'
  ), 
  (
    1, 
    (
      SELECT 
        id 
      FROM 
        places 
      ORDER BY 
        RANDOM() 
      LIMIT 
        1
    ), 'Football Fun for 5-6 Year Olds', 
    'Introduction to football through games and fun activities. Perfect for building confidence and basic skills.', 
    '2025-10-22', 
    '5-6', 
    'Beginner', 
    12, 
    'Morning'
  ), 
  (
    1, 
    (
      SELECT 
        id 
      FROM 
        places 
      ORDER BY 
        RANDOM() 
      LIMIT 
        1
    ), 'Skills Builder 7-9 Years', 
    'Progressive session focusing on core skills development. Suitable for children with some football experience.', 
    '2025-10-29', 
    '7-9', 
    'Intermediate', 
    16, 
    'Afternoon'
  ), 
  (
    1, 
    (
      SELECT 
        id 
      FROM 
        places 
      ORDER BY 
        RANDOM() 
      LIMIT 
        1
    ), 'Elite Training 9-11 Years', 
    'Advanced session for experienced players. Focus on tactical awareness and technical excellence.', 
    '2025-11-05', 
    '9-11', 
    'Advanced', 
    20, 
    'Evening'
  ), 
  (
    1, 
    (
      SELECT 
        id 
      FROM 
        places 
      ORDER BY 
        RANDOM() 
      LIMIT 
        1
    ), 'Junior Football Stars 5-6', 
    'Fun introduction to football basics. Games and activities designed to build confidence and basic motor skills.', 
    '2025-11-12', 
    '5-6', 
    'Beginner', 
    12, 
    'Morning'
  ), 
  (
    1, 
    (
      SELECT 
        id 
      FROM 
        places 
      ORDER BY 
        RANDOM() 
      LIMIT 
        1
    ), 'Football Skills Academy 7-8', 
    'Structured session focusing on fundamental football skills. Perfect for building strong technical foundations.', 
    '2025-11-19', 
    '7-8', 
    'Intermediate', 
    16, 
    'Afternoon'
  ), 
  (
    1, 
    (
      SELECT 
        id 
      FROM 
        places 
      ORDER BY 
        RANDOM() 
      LIMIT 
        1
    ), 'Premier Skills 9-11', 
    'Advanced training session covering complex skills and tactical understanding. Suitable for experienced young players.', 
    '2025-11-26', 
    '9-11', 
    'Advanced', 
    18, 
    'Evening'
  ), 
  (
    1, 
    (
      SELECT 
        id 
      FROM 
        places 
      ORDER BY 
        RANDOM() 
      LIMIT 
        1
    ), 'Mini Kickers 5-7', 
    'Engaging football session for our youngest players. Focus on fun, movement, and basic ball skills.', 
    '2025-12-03', 
    '5-7', 
    'Beginner', 
    14, 
    'Morning'
  ), 
  (
    1, 
    (
      SELECT 
        id 
      FROM 
        places 
      ORDER BY 
        RANDOM() 
      LIMIT 
        1
    ), 'Junior Development 8-11', 
    'Comprehensive football development session covering technical skills and game understanding.', 
    '2025-12-10', 
    '8-11', 
    'Intermediate', 
    20, 
    'Afternoon'
  ), 
  (
    1, 
    (
      SELECT 
        id 
      FROM 
        places 
      ORDER BY 
        RANDOM() 
      LIMIT 
        1
    ), 'Skills Masterclass 6-8', 
    'Technical skills focus session. Perfect for young players looking to improve their football abilities.', 
    '2025-12-17', 
    '6-8', 
    'Mixed', 
    16, 
    'Morning'
  ), 
  (
    1, 
    (
      SELECT 
        id 
      FROM 
        places 
      ORDER BY 
        RANDOM() 
      LIMIT 
        1
    ), 'Advanced Academy 9-11', 
    'High-level training session for experienced players. Focus on advanced techniques and match scenarios.', 
    '2025-12-24', 
    '9-11', 
    'Advanced', 
    18, 
    'Evening'
  ), 
  (
    1, 
    (
      SELECT 
        id 
      FROM 
        places 
      ORDER BY 
        RANDOM() 
      LIMIT 
        1
    ), 'Football Foundations 5-6', 
    'Beginner-friendly session introducing basic football concepts through fun games and activities.', 
    '2025-09-07', 
    '5-6', 
    'Beginner', 
    12, 
    'Morning'
  ), 
  (
    1, 
    (
      SELECT 
        id 
      FROM 
        places 
      ORDER BY 
        RANDOM() 
      LIMIT 
        1
    ), 'Skills & Drills 7-9', 
    'Dynamic training session focusing on essential football skills and game understanding.', 
    '2025-09-14', 
    '7-9', 
    'Intermediate', 
    16, 
    'Afternoon'
  ), 
  (
    1, 
    (
      SELECT 
        id 
      FROM 
        places 
      ORDER BY 
        RANDOM() 
      LIMIT 
        1
    ), 'Elite Development 10-11', 
    'Advanced session for committed young players. Focus on high-level skills and tactical awareness.', 
    '2025-09-21', 
    '10-11', 
    'Advanced', 
    20, 
    'Evening'
  );
