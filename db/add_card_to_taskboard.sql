INSERT INTO taskboard_items (project_id, user_id, title, description, status)
VALUES ($1,$2,$3,$4,$5)
RETURNING *;
