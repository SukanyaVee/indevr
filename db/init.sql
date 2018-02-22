CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    auth0_id TEXT NOT NULL,
    first_name TEXT,
    last_name TEXT,
    email TEXT,
    picture TEXT,
    bio TEXT,
    location TEXT,
    location_public BOOLEAN,
    github TEXT,
    github_public BOOLEAN,
    bitbucket TEXT,
    bitbucket_public BOOLEAN,
    gitlab TEXT,
    gitlab_public BOOLEAN,
    portfolio TEXT,
    portfolio_public BOOLEAN,
    website TEXT,
    website_public BOOLEAN,
    codepen TEXT,
    codepen_public BOOLEAN,
    twitter TEXT,
    twitter_public BOOLEAN
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

CREATE TABLE IF NOT EXISTS chat (
    id SERIAL PRIMARY KEY,
    username TEXT,
    message TEXT,
    room TEXT
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

INSERT INTO projects
(user_id, project_name, description, public, repo)
VALUES
(2, 'AAAA', 'xaaaaaaaaaaaaaaaaaaaaaaaaaa',true, 'aaaa'),
(3, 'BBBB', 'xbbbbbbbbbbbbbbbbbbbbbbbbbb', false, 'bbbb'),
(3, 'CCCC', 'xcccccccccccccccccccccccccc', true, 'cccc'),
(3, 'DDDD', 'xdddddddddddddddddddddddddd', true, 'dddd'),
(2, 'EEEE', 'xeeeeeeeeeeeeeeeeeeeeeeeeee', false, 'eeee'),
(2, 'FFFF', 'xffffffffffffffffffffffffff', FALSE, 'ffff'),
(2, 'BBBB', 'xblahblahblahblahblahblah', true, 'bbbb'),
(2, 'GGGG', 'xgggggggggggggggggggggggggg', true, 'gggg');

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

INSERT INTO project_stacks
(project_id, skill, level)
VALUES
(15, 'react', 3),
(16, 'react', 2),
(16, 'angular', 2),
(17, 'react', 2),
(18, 'php', 3),
(18, 'ajax', 3),
(18, 'sql', 3),
(18, 'mongo', 3),
(19, 'html', 1),
(19, 'css', 1),
(20, 'react', 1),
(21, 'angular',1),
(22, 'vue',1);

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


 ALTER TABLE project_users ADD COLUMN owner boolean;
 UPDATE project_users SET owner = false WHERE user_id<>1;

 CREATE TABLE IF NOT EXISTS add_messages (
    id SERIAL PRIMARY KEY,
    project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    contributor_id INTEGER REFERENCES users(id) ON DELETE CASCADE
    
);

ALTER TABLE project_users
ADD UNIQUE (project_id, user_id); 

ALTER TABLE add_messages
ADD UNIQUE (project_id, contributor_id);

INSERT INTO users
(Auth0_id, username, first_name, last_name, email, picture)
VALUES
('Auth0DummySecret5', 'first5_last5', 'first5', 'last5', 'first5@last5.com', 'https://cdn.pixabay.com/photo/2016/03/03/22/33/anonymus-1235169_1280.jpg'),
('Auth0DummySecret6', 'first6_last6', 'first6', 'last6', 'first6@last6.com', 'https://cdn.pixabay.com/photo/2016/03/03/22/33/anonymus-1235169_1280.jpg'),
('Auth0DummySecret7', 'first7_last7', 'first7', 'last7', 'first7@last7.com', 'https://cdn.pixabay.com/photo/2016/03/03/22/33/anonymus-1235169_1280.jpg'),
('Auth0DummySecret8', 'first8_last8', 'first8', 'last8', 'first8@last8.com', 'https://cdn.pixabay.com/photo/2016/03/03/22/33/anonymus-1235169_1280.jpg'),
('Auth0DummySecret9', 'first9_last9', 'first9', 'last9', 'first9@last9.com', 'https://cdn.pixabay.com/photo/2016/03/03/22/33/anonymus-1235169_1280.jpg'),
('Auth0DummySecret10', 'first10_last10', 'first10', 'last10', 'first10@last10.com', 'https://cdn.pixabay.com/photo/2016/03/03/22/33/anonymus-1235169_1280.jpg');

INSERT INTO add_messages
(project_id, user_id, contributor_id)
VALUES
(1, 1, 7),
(1, 1, 8),
(1, 1, 9),
(1, 1, 10),
(1, 1, 11),
(1, 1, 12);
