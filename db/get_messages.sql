SELECT add_messages.id, add_messages.contributor_id, users.first_name, users.last_name, users.picture, add_messages.project_id, projects.project_name 
FROM add_messages JOIN projects ON add_messages.project_id=projects.id JOIN users ON add_messages.contributor_id=users.id 
WHERE add_messages.user_id=$1;