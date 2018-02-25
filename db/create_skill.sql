INSERT INTO project_stacks
(project_id, skill, level)
VALUES ($1, $2, $3)
RETURNING *;
