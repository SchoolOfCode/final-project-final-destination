INSERT INTO users (
  name,
  email,
  email_verified,
  role,
  is_organizer
) 
VALUES 
  (
    'Coach John Smith',
    'john.smith@footie-friends.com',
    CURRENT_TIMESTAMP,
    'organizer',
    true
  ),
  (
    'Coach Sarah Johnson',
    'sarah.johnson@footie-friends.com',
    CURRENT_TIMESTAMP,
    'organizer',
    true
  ),
  (
    'Coach Mike Williams',
    'mike.williams@footie-friends.com',
    CURRENT_TIMESTAMP,
    'organizer',
    true
  ),
  (
    'Coach Emma Brown',
    'emma.brown@footie-friends.com',
    CURRENT_TIMESTAMP,
    'organizer',
    true
  ),
  (
    'Coach David Lee',
    'david.lee@footie-friends.com',
    CURRENT_TIMESTAMP,
    'organizer',
    true
  )
ON CONFLICT (email) 
DO UPDATE SET 
  name = EXCLUDED.name,
  role = EXCLUDED.role,
  is_organizer = EXCLUDED.is_organizer,
  email_verified = EXCLUDED.email_verified
RETURNING id;