INSERT INTO groups (user_id, group_name)
VALUES ($1, $2)
RETURNING *;