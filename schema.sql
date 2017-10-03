-- USER TABLE --
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(20) NOT NULL,
    firstName VARCHAR(40),
    lastName VARCHAR (40),
    email VARCHAR (80) NOT NULL,
    profilePic VARCHAR (200),
    auth_id VARCHAR(100) NOT NULL,
    safe_haven VARCHAR (200),
    socket_id VARCHAR (100)
);

INSERT INTO users (username, firstName, lastName, email, profilePic, auth_id, safe_haven, socket_id)
VALUES ('hermione1549', 'Lucy', 'Pevensie', 'hermione1549@gmail.com', null, '105562344058923082049', null, null);

-- FRIENDS TABLE --
CREATE TABLE IF NOT EXISTS friends (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users,
    friend_id INTEGER REFERENCES users,
    friend_status BOOLEAN --true is accepted, false is pending, app.delete remove pending friend request
);

insert into friends (user_id, friend_id, friend_status) values (1, 3, true);
insert into friends (user_id, friend_id, friend_status) values (3, 1, true);
insert into friends (user_id, friend_id, friend_status) values (1, 2, true);
insert into friends (user_id, friend_id, friend_status) values (2, 1, false);
insert into friends (user_id, friend_id, friend_status) values (2, 3, true);
insert into friends (user_id, friend_id, friend_status) values (3, 2, false);
insert into friends (user_id, friend_id, friend_status) values (4, 3, true);
insert into friends (user_id, friend_id, friend_status) values (4, 2, false);

-- GROUPS TABLE --
CREATE TABLE IF NOT EXISTS groups (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users,
    group_name VARCHAR(40) NOT NULL,
    friend_id INTEGER 
);

insert into groups (user_id, group_name, friend_id) values (1, 'the janises', 2);
insert into groups (user_id, group_name, friend_id) values (1, 'the janises', 3);
insert into groups (user_id, group_name, friend_id) values (2, 'chronicles of hermionia', 1);
insert into groups (user_id, group_name, friend_id) values (2, 'chronicles of hermionia', 3);
insert into groups (user_id, group_name, friend_id) values (3, 'rocky neck bunch', 1);
insert into groups (user_id, group_name, friend_id) values (3, 'rocky neck bunch', 2);
insert into groups (user_id, group_name, friend_id) values (3, 'rocky neck bunch', 4);
insert into groups (user_id, group_name, friend_id) values (4, 'meat gap group', 2);
insert into groups (user_id, group_name, friend_id) values (4, 'meat gap group', 1);
insert into groups (user_id, group_name, friend_id) values (4, 'meat gap group', 3);

-- ACTIVE LOCATIONS TABLE --
CREATE TABLE IF NOT EXISTS active_locations (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users,
    coordinates VARCHAR(200), -- {latitude, longitude}
    recipient_id INTEGER --friends user id
);