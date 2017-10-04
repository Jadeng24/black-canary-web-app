UPDATE TABLE friends
SET friend_status = true
WHERE id = $1;