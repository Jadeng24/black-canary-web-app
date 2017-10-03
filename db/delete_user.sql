DELETE FROM active_locations 
WHERE user_id = $1;

DELETE FROM groups
WHERE user_id = $1;

DELETE FROM friends
WHERE user_id = $1;

DELETE FROM users 
WHERE user_id = $1;