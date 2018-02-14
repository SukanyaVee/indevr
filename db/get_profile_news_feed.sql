SELECT * FROM posts
JOIN users ON posts.user_id = users.id
WHERE user_id = $1 ORDER BY created_at;
