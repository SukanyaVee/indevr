SELECT * FROM users where first_name LIKE '%' || $1 || '%';
SELECT * FROM users where last_name LIKE '%' || $1 || '%';
-- SELECT * FROM projects WHERE project_name LIKE '%' || $1 || '%' and public = true;
-- SELECT * FROM project_stacks WHERE skill LIKE '%' || $1 || '%';
-- SELECT * FROM posts WHERE content LIKE '%' || $1 || '%' and public = true;

