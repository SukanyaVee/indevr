SELECT * FROM contacts
WHERE (contacts.user_id = $1 AND contacts.friend_id = $2)
OR (contacts.user_id = $2 AND contacts.friend_id = $1);
