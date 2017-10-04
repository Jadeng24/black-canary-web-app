UPDATE users
SET safe_haven = $2
WHERE id = $1;

SELECT *
FROM users
WHERE id = $1;