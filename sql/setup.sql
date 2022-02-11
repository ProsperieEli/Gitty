-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS gitHub_users CASCADE;
DROP TABLE IF EXISTS posts CASCADE;

CREATE TABLE gitHub_users (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email TEXT NOT NULL
);

CREATE TABLE posts (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    text VARCHAR(255),
    user_id BIGINT REFERENCES gitHub_users(id) NOT NULL
);