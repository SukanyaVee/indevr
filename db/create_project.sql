INSERT INTO projects (user_id, project_name, description, public, repo) VALUES ($1,$2,$3,$4,$5) RETURNING *;