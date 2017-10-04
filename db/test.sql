select groups.user_id as group_owner_id, groups.group_name as group_name, groups.id as group_id, users.username as member_username, users.id as member_user_id 
from group_members
join users on users.id = group_members.member_id
join groups on groups.id = group_members.group_id
where user_id = 1;