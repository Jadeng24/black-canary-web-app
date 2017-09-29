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


-- FRIENDS TABLE --
CREATE TABLE IF NOT EXISTS friends (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users,
    friend_id INTEGER REFERENCES users,
    friend_status BOOLEAN --true is accepted, false is pending, app.delete remove pending friend request
);


-- GROUPS TABLE --
CREATE TABLE IF NOT EXISTS groups (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users,
    group_name VARCHAR(40) NOT NULL,
    friend_ids INTEGER [] --array of friends user_ids
);


-- ACTIVE LOCATIONS TABLE --
CREATE TABLE IF NOT EXISTS active_locations (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users,
    coordinates VARCHAR(200), -- {latitude, longitude}
    recipient_ids INTEGER [] --friends user ids
);