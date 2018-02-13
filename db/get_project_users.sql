SELECT first_name, last_name, users.id FROM users
JOIN project_users ON project_users.user_id = users.id
WHERE project_users.project_id = $1;
