DROP DATABASES IF EXIST myapp;

CREATE DATABASES myapp;
USE myapp;

CREATE TABLE lists (
    id INTEGER AUTO_INCREMENT,
    value TEXT,
    PRIMARY key (id)
)
