create extension if not exists "uuid-ossp";

create table "user"
(
    id       uuid primary key default uuid_generate_v4(),
    username char(32) UNIQUE,
    password char(60) NOT NULL
);

-- From node-connect-pg-simple's table.sql
CREATE TABLE "session"
(
    "sid"    varchar      NOT NULL COLLATE "default",
    "sess"   json         NOT NULL,
    "expire" timestamp(6) NOT NULL
)
    WITH (OIDS= FALSE);

ALTER TABLE "session"
    ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE INDEX "IDX_session_expire" ON "session" ("expire");

create table user_sessions
(
    id  uuid references users,
    sid varchar primary key references session
);