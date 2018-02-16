SELECT * FROM contacts JOIN users ON contacts.friend_id=users.id WHERE contacts.user_id=$1;
