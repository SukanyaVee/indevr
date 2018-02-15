CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    auth0_id TEXT NOT NULL,
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
    content TEXT,
    created_at TIMESTAMP DEFAULT NOW();
);

CREATE TABLE IF NOT EXISTS images (
    id SERIAL PRIMARY KEY,
    post_id INTEGER REFERENCES posts (id) ON DELETE CASCADE,
    url TEXT
);

INSERT INTO users 
(auth0_id, username, first_name, last_name, email, picture)
VALUEs 
('Auth0DummySecret1', 'apple_barrel', 'Apple', 'Barrel', 'apple@barrel.com','https://i.pinimg.com/originals/ec/89/33/ec89338e7860728bcb2c3ece84a5e715.jpg'),
('Auth0DummySecret2','cherry_drum', 'Cherry','Drum','cherry@drum.com', 'http://www.goodfruit.com/wp-content/uploads/earlyRobinRainierCherryHarvest061814tj-17494.jpg'),
('Auth0DummySecret3','eggplant_flower','Eggplant','Flower','eggplant@flower.com','https://www.motherearthnews.com/-/media/Images/MEN/Editorial/Articles/Online-Articles/2015/10-01/The-Seed-Garden/Saving-Eggplant-Seeds/eggplant-flower-jpg.jpg');

INSERT INTO projects
(user_id, project_name, description, public, repo)
VALUES
(1, 'Test 1','description 1',true, 'random1'),
(1, 'Test 2','description 2',true, 'random2'),
(1, 'Test 3','description 3',false, 'random3'),
(1, 'Test 4','description 4',true, 'random4'),
(1, 'Test 5','description 5',false, 'random5');

INSERT INTO project_stacks
(project_id, skill, level)
VALUES 
(1, 'React', 3),
(1, 'Express', 2),
(1, 'HTML', 3),
(2, 'Angular', 2),
(2, 'Node', 2),
(2, 'AJAX', 2),
(3, 'React', 3),
(3, 'Express', 2),
(3, 'HTML', 3),
(3, 'CSS', 1),
(4, 'React', 3),
(4, 'Express', 3),
(5, 'HTML', 1),
(5, 'CSS', 1);

INSERT INTO posts 
(user_id, content)
VALUES 
(1, 'Found a great tutorial for React https://reactjs.org/'),
(1, 'Found a great tutorial for JSS http://cssinjs.org/?v=v9.8.0'),
(1, 'Here is the documentation for NPM https://www.npmjs.com/');

INSERT INTO contacts 
(user_id, friend_id)
VALUES
(1,2),
(1,3);
CREATE TABLE IF NOT EXISTS taskboard_items (
    id SERIAL PRIMARY KEY,
    project_id INTEGER REFERENCES projects (id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users (id) ON DELETE SET NULL,
    title TEXT,
    description TEXT,
    status TEXT,
    due DATE
);
