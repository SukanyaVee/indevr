

SELECT * FROM project_users FULL JOIN projects ON project_users.project_id=projects.id WHERE project_users.user_id=$1;