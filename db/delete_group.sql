DELETE FROM groups
WHERE id = $1;

DELETE FROM group_members
WHERE group_id = $1;
