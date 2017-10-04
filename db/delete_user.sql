DELETE FROM active_locations 
WHERE active_locations.user_id = $1;

DELETE FROM groups
WHERE groups.user_id = $1;

DELETE FROM friends
WHERE friends.user_id = $1;

DELETE FROM users 
WHERE users.id = $1;