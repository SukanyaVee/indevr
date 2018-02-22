SELECT * FROM projects 
WHERE public=true AND projects.id NOT IN (SELECT project_id FROM project_users WHERE user_id = $1);