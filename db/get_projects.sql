

SELECT * FROM projects JOIN project_users ON projects.id=project_users.project_id WHERE project_users.user_id=$1;