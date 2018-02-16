SELECT * FROM contacts JOIN users ON contacts.user_id=users.id WHERE contacts.friend_id=$1;
