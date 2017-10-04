INSERT INTO active_locations (user_id, coordinates, situation, message)
VALUES ($1, $2, $3, $4)
RETURNING *;

