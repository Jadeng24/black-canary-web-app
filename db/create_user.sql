INSERT INTO users
(username, firstName, lastName, email, profilePic, auth_id)
VALUES 
($1, $2, $3, $4, $5, $6)
RETURNING *;