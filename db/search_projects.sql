SELECT * FROM projects WHERE LOWER(project_name) LIKE '%' || LOWER($1) || '%';

-- SELECT * FROM projects JOIN project_stacks ON (projects.id = project_stacks.project_id) WHERE LOWER(project_name) LIKE '%' || LOWER($1) || '%';

-- SELECT projects.project_name, projects.description, WHERE projects.id = project_stacks.project_id