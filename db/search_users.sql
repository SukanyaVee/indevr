SELECT * FROM users WHERE LOWER(users.first_name) || LOWER(last_name) LIKE '%' || LOWER($1) || '%';
-- SELECT * FROM users WHERE LOWER(users.first_name) = LOWER($1);
-- SELECT * FROM users WHERE LOWER(users.last_name) = LOWER($1);
-- SELECT * FROM projects WHERE LOWER(projects.project_name) = LOWER($1);
-- SELECT * FROM project_stacks WHERE LOWER(project_stacks.skill) = LOWER($1);



-- where users.first_name LIKE $1;
-- SELECT * FROM users where users.last_name LIKE '%' || $1 || '%';
-- SELECT * FROM projects WHERE project_name LIKE '%' || $1 || '%' and public = true;
-- SELECT * FROM project_stacks WHERE skill LIKE '%' || $1 || '%';
-- SELECT * FROM posts WHERE content LIKE '%' || $1 || '%' and public = true;

