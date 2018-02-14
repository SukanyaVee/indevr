SELECT * FROM projects WHERE project_name LIKE '%' || $1 || '%' and public = true;

-- SELECT projects.project_name, projects.description, WHERE projects.id = project_stacks.project_id