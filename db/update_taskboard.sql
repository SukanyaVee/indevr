UPDATE taskboard_items SET title=$1, description=$2, status=$3, due=$4, user_id=$5
WHERE id = $6 RETURNING *;
