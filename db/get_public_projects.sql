SELECT * FROM projects
JOIN project_stacks ON projects.id = project_stacks.project_id
WHERE projects.id NOT IN
(SELECT project_id FROM project_users WHERE user_id = $1);
