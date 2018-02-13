SELECT * FROM users where first_name LIKE '%' || $1 || '%';
SELECT * FROM users where last_name LIKE '%' || $1 || '%';
