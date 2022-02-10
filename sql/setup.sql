-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP TABLE IF EXISTS posts;

CREATE TABLE posts (
    id BIGINT ALWAYS GENERATED AS PRIMARY KEY,
    text VARCHAR(255),
);

DROP TABLE IF EXISTS gitHub_users;

CREATE TABLE gitHub_users (
    id BIGINT ALWAYS GENERATED AS PRIMARY KEY,
    email TEXT NOT NULL,
    password_hash TEXT NOT NULL
)