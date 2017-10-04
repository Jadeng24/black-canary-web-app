DELETE FROM active_locations 
WHERE active_locations.user_id = $1;

-- DELETE FROM emergency_contacts
-- WHERE contact_id = $1;

DELETE FROM group_members
WHERE group_members.member_id = $1;

DELETE FROM friends
WHERE friends.user_id = $1;

DELETE FROM users 
WHERE users.id = $1;