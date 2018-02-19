INSERT INTO skills (user_id, skill, level)
VALUES ($1,$2,$3) RETURNING *;
