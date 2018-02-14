SELECT project_name FROM projects WHERE LOWER(project_name) LIKE '%' || LOWER($1) || '%';

-- SELECT projects.project_name, projects.description, WHERE projects.id = project_stacks.project_id