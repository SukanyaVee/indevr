INSERT INTO users (auth0_id, first_name, last_name, email, picture) VALUES ($1, $2, $3, $4, $5)
RETURNING *;