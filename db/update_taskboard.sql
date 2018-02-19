UPDATE taskboard_items SET title=$1, description=$2, status=$3, user_id=$4
WHERE id = $5;
