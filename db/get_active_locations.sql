SELECT al.id as alertId, users.firstname as senderFirstName, users.lastname as senderLastName, alr.recipient_id as recipientId, al.coordinates as coordinates, al.situation as situation, al.message as message, al.situation_level as situationLevel
FROM active_locations al
JOIN active_location_recipients alr ON al.id = alr.active_location_id
JOIN users on users.id = al.user_id
WHERE alr.recipient_id = $1;