create table users (username char(32) PRIMARY KEY, password char(60) NOT NULL);

insert into users(username, password) values ('admin', 'password');