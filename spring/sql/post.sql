create database dbtodo;

\c dbtodo;

CREATE TABLE TASK (
  id VARCHAR(50) NOT NULL PRIMARY KEY,
  task VARCHAR(50) NOT NULL,
  etats VARCHAR(100),
  edit
);

\d TASK;

CREATE TABLE CLIENTS (
  id VARCHAR(50) NOT NULL PRIMARY KEY,
  pseudo VARCHAR(50) NOT NULL,
  password VARCHAR(100)
);

\d CLIENTS;

INSERT INTO TASK (id, task, etats, edit) VALUES
('1', 'task1', false, false),
('2', 'task1', true, false),
('3', 'task1', true, false);

SELECT * FROM TASK;

INSERT INTO CLIENTS (id, pseudo, password) VALUES
('1', 'blackran', 'iloveyou');

SELECT * FROM CLIENTS;