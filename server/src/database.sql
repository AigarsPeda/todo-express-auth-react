CREATE DATABASE perntodo;

-- CREATE TABLE todos (
--   id serial,
--   user_id int NOT NULL,
--   description VARCHAR(255),
--   completed BOOLEAN DEFAULT FALSE,
--   created_on TIMESTAMP NOT NULL,
--   PRIMARY KEY (user_id),
--   CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users (user_id)
-- );

-- todos table
CREATE TABLE todos (
  id serial PRIMARY KEY,
  user_id int NOT NULL,
  description VARCHAR(255),
  tags VARCHAR(255) ARRAY,
  completed BOOLEAN DEFAULT FALSE,
  created_on TIMESTAMP NOT NULL,
  CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users (user_id)
);

-- users table
CREATE TABLE users (
  user_id serial PRIMARY KEY,
	username VARCHAR ( 50 ) UNIQUE NOT NULL,
	password VARCHAR ( 255 ) NOT NULL,
	email VARCHAR ( 255 ) UNIQUE NOT NULL,
	created_on TIMESTAMP NOT NULL,
  last_login TIMESTAMP,
  user_image varchar(255) DEFAULT 'https://storage.googleapis.com/todo-avatars/default_profile.jpeg'
);

ALTER TABLE users
RENAME COLUMN user_image TO user_image_url;

alter table users add user_image varchar(255);


alter table users add image bytea;

 --`image` varchar(255)

-- TO NOT FORGET
-- const foundTodo = await poll.query(
--   "SELECT *  FROM todos WHERE id = $1 AND user_id = $2",
--   [id, user.user_id]
-- );