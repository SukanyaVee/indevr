SELECT project_users.id as contributor_id, project_users.owner, users.id, users.first_name, users.last_name, users.picture 
FROM project_users JOIN users ON project_users.user_id=users.id 
WHERE project_id = $1; 