-- SELECT * FROM projects JOIN project_users ON projects.id=project_users.project_id JOIN project_stacks ON projects.id=project_stacks.project_id WHERE project_users.user_id=$1;
-- SELECT * FROM projects_users JOIN project_stacks ON project_users.project_id=project_stacks.project_id WHERE project_stacks.project_id IN 
-- (SELECT project_id FROM project_users WHERE user_id=1);

SELECT * FROM projects JOIN project_users ON projects.id=project_users.project_id WHERE project_users.user_id=$1;