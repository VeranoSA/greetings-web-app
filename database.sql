CREATE DATABASE greetings;

--\c into greetings database
--making editions to my schema

CREATE TABLE users(
    id serial not null primary key,
    username VARCHAR(255),
    greet_count DECIMAL(10,2)
);