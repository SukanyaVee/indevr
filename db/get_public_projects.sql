SELECT * FROM projects WHERE id NOT IN 
(SELECT project_id FROM project_users WHERE user_id = $1);
