UPDATE users
SET socket_id = $1
WHERE users.auth_id = $2;