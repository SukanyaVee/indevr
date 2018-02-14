SELECT * FROM users WHERE LOWER(users.first_name) = LOWER($1);
-- where users.first_name LIKE $1;
-- SELECT * FROM users where users.last_name LIKE '%' || $1 || '%';
-- SELECT * FROM projects WHERE project_name LIKE '%' || $1 || '%' and public = true;
-- SELECT * FROM project_stacks WHERE skill LIKE '%' || $1 || '%';
-- SELECT * FROM posts WHERE content LIKE '%' || $1 || '%' and public = true;

