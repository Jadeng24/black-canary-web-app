select emergency.id as emergencySenderId, users.firstname as emergency_sender_firstname, emergency.message as emergency_message , emergency_contacts.contact_id as emergency_contact_id
from emergency
join emergency_contacts
on emergency.id = emergency_contacts.emergency_id
join users
on users.id = emergency.user_id
WHERE emergency_contacts.contact_id = $1;