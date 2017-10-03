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
    socket_id VARCHAR (100),
    emergency_message VARCHAR(180),
    emergency_group_created BOOLEAN
);

INSERT INTO users (username, firstName, lastName, email, profilePic, auth_id, safe_haven, socket_id)
VALUES ('hermione1549', 'Lucy', 'Pevensie', 'hermione1549@gmail.com', null, '105562344058923082049', null, null);
INSERT INTO users (username, firstName, lastName, email, profilePic, auth_id, safe_haven, socket_id)
VALUES ('rocky.neck', 'Rocky', 'Neck', 'rocky.neck@mondayshift.com', null, '59d3f63ac04b650413249b88', null, null);
INSERT INTO users (username, firstName, lastName, email, profilePic, auth_id, safe_haven, socket_id)
VALUES ('maggieessence', 'Maggie', 'Essence', 'meatgap@meat.gap', null, '105562344058923082049', null, null);
INSERT INTO users (username, firstName, lastName, email, profilePic, auth_id, safe_haven, socket_id)
VALUES ('noBats', 'Abby', 'Thelin', 'abby@noBats.tuna', null, '1055623442sdf058923082049', null, null);
INSERT INTO users (username, firstName, lastName, email, profilePic, auth_id, safe_haven, socket_id)
VALUES ('alien', 'Alan', 'Miller', 'alan@theystillthinkimhuman.mothership', null, 'af105562344058923082049', null, null);
INSERT INTO users (username, firstName, lastName, email, profilePic, auth_id, safe_haven, socket_id)
VALUES ('princesshack', 'Princess', 'Hackamore', 'salsamaker@cook.food', null, 'vae104058923082049', null, null);
INSERT INTO users (username, firstName, lastName, email, profilePic, auth_id, safe_haven, socket_id)
VALUES ('buddyc', 'Buddy', 'Charlwood', 'bwood@thunderdownunder.net', null, 'zjsd958923082049', null, null);

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
insert into friends (user_id, friend_id, friend_status) values (8, 3, true);
insert into friends (user_id, friend_id, friend_status) values (6, 2, false);
insert into friends (user_id, friend_id, friend_status) values (7, 1, true);
insert into friends (user_id, friend_id, friend_status) values (7, 2, false);

-- GROUPS TABLE --
CREATE TABLE IF NOT EXISTS groups (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users NOT NULL,
    group_name VARCHAR(40) NOT NULL
);

insert into groups (user_id, group_name) values (1, 'the janises');
insert into groups (user_id, group_name) values (2, 'chronicles of hermionia');
insert into groups (user_id, group_name) values (3, 'rocky neck bunch');
insert into groups (user_id, group_name) values (4, 'meat gap group');
insert into groups (user_id, group_name) values (8, 'aliens are real');


-- GROUP MEMBERS TABLE --
CREATE TABLE IF NOT EXISTS group_members (
    id SERIAL PRIMARY KEY,
    group_id INTEGER REFERENCES groups NOT NULL,
    member_id INTEGER REFERENCES users NOT NULL
);

INSERT INTO group_members (group_id, member_id) VALUES (1, 3);
INSERT INTO group_members (group_id, member_id) VALUES (1, 7);
INSERT INTO group_members (group_id, member_id) VALUES (2, 4);
INSERT INTO group_members (group_id, member_id) VALUES (2, 5);
INSERT INTO group_members (group_id, member_id) VALUES (3, 3);
INSERT INTO group_members (group_id, member_id) VALUES (3, 2);
INSERT INTO group_members (group_id, member_id) VALUES (3, 2);
INSERT INTO group_members (group_id, member_id) VALUES (4, 8);
INSERT INTO group_members (group_id, member_id) VALUES (4, 6);
INSERT INTO group_members (group_id, member_id) VALUES (5, 1);


-- ACTIVE LOCATIONS TABLE --
CREATE TABLE IF NOT EXISTS active_locations (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users,
    coordinates VARCHAR(200), -- {latitude, longitude}
    recipient_id INTEGER --friends user id
);