UPDATE TABLE groups
SET friend_ids = $1,
    group_name = $2
WHERE id = $3;