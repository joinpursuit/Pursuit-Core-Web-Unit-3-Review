DROP DATABASE IF EXISTS just_todo_it_db;
CREATE DATABASE just_todo_it_db;

\c just_todo_it_db;

-- DROP TABLE IF EXISTS todos CASCADE; 
-- DROP TABLE IF EXISTS users CASCADE; 
-- DROP TABLE IF EXISTS winners CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR UNIQUE NOT NULL 
);

CREATE TABLE todos (
  id VARCHAR PRIMARY KEY,
  owner VARCHAR REFERENCES users(username),
  text VARCHAR NOT NULL,
  completed BOOLEAN DEFAULT FALSE
);

CREATE TABLE tags (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  owner VARCHAR REFERENCES users(username)
);

CREATE TABLE todos_tags (
  id SERIAL PRIMARY KEY,
  todo_id VARCHAR REFERENCES todos(id),
  tag_id INT REFERENCES tags(id)
);
