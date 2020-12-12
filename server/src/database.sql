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
  last_login TIMESTAMP 
);


-- TO NOT FORGET
-- const foundTodo = await poll.query(
--   "SELECT *  FROM todos WHERE id = $1 AND user_id = $2",
--   [id, user.user_id]
-- );