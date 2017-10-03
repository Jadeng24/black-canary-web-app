UPDATE users
SET username = $1
WHERE id = $2;

SELECT username
FROM users
WHERE id = $2;