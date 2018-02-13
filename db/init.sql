CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    auth0_id TEXT NOT NULL,
    username TEXT,
    first_name TEXT,
    last_name TEXT,
    email TEXT,
    picture TEXT
);

CREATE TABLE IF NOT EXISTS contacts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users (id),
    friend_id INTEGER REFERENCES users (id)
);

CREATE TABLE IF NOT EXISTS skills (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users (id),
    skill TEXT NOT NULL,
    level INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users (id),
    project_name TEXT,
    description TEXT,
    public BOOLEAN,
    repo TEXT
);

CREATE TABLE IF NOT EXISTS project_stacks (
    id SERIAL PRIMARY KEY,
    project_id INTEGER REFERENCES projects (id) ON DELETE CASCADE,
    skill TEXT NOT NULL,
    level INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS project_users (
    id SERIAL PRIMARY KEY,
    project_id INTEGER REFERENCES projects (id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS posts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    content TEXT
);

CREATE TABLE IF NOT EXISTS images (
    id SERIAL PRIMARY KEY,
    post_id INTEGER REFERENCES posts (id) ON DELETE CASCADE,
    url TEXT
);

CREATE TABLE IF NOT EXISTS taskboard_items (
    id SERIAL PRIMARY KEY,
    project_id INTEGER REFERENCES projects (id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users (id) ON DELETE SET NULL,
    title TEXT,
    description TEXT,
    status TEXT,
    due DATE
);
