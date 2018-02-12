INSERT INTO users (auth0_id, username, email, picture) VALUES ($1, $2, $3, $4)
RETURNING *;