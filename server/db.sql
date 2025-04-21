CREATE DATABASE ega;
CREATE TYPE Name AS (
  first_name TEXT,
  middle_name TEXT,
  last_name TEXT
);
CREATE TYPE USER_TYPE AS ENUM ('admin', 'employee');
CREATE TYPE STATUS AS ENUM ('pending', 'approved', 'borrowed', 'returned');
CREATE TABLE user_auth (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username TEXT,
  password TEXT DEFAULT 'mypassword',
  user_type USER_TYPE NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  created_by BIGINT REFERENCES user_auth (id)
);
CREATE TABLE profile (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  public_id TEXT UNIQUE DEFAULT '',
  name Name NOT NULL,
  email TEXT NOT NULL,
  contact TEXT NOT NULL,
  address TEXT,
  birthday DATE CHECK (birthday <= CURRENT_DATE),
  image BYTEA,
  user_auth_id BIGINT REFERENCES user_auth(id)
);
CREATE TABLE category (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  description TEXT,
  image BYTEA
);
CREATE TABLE tool (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  public_id TEXT UNIQUE DEFAULT '',
  name TEXT NOT NULL,
  quantity INT CHECK (quantity > 0),
  location TEXT NOT NULL
);
CREATE TABLE request (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  public_id TEXT UNIQUE DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE request_tool (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  quantity INT CHECK (quantity > 0),
  note TEXT,
  tool_id BIGINT REFERENCES tool (id),
  request_id BIGINT REFERENCES request (id)
);
CREATE TABLE request_status_history (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  status STATUS DEFAULT 'pending',
  changed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  changed_by BIGINT REFERENCES profile (id),
  request_id BIGINT REFERENCES request (id)
);
CREATE OR REPLACE FUNCTION set_profile_public_id() RETURNS TRIGGER AS $$ BEGIN
UPDATE profile
SET public_id = CASE
    WHEN ua.user_type = 'admin' THEN 'ADM-' || NEW.id
    WHEN ua.user_type = 'employee' THEN 'EMP-' || NEW.id
  END
FROM user_auth ua
WHERE profile.user_auth_id = ua.id
  AND profile.id = NEW.id;
RETURN NEW;
END;
$$ LANGUAGE plpgsql;
CREATE OR REPLACE FUNCTION set_tool_public_id() RETURNS TRIGGER AS $$ BEGIN
UPDATE tool
SET public_id = 'TL-' || NEW.id
WHERE id = NEW.id;
RETURN NEW;
END;
$$ LANGUAGE plpgsql;
CREATE OR REPLACE FUNCTION set_request_public_id() RETURNS TRIGGER AS $$ BEGIN
UPDATE request
SET public_id = 'RQ-' || NEW.id
WHERE id = NEW.id;
RETURN NEW;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER trg_set_profile_public_id
AFTER
INSERT ON profile FOR EACH ROW EXECUTE FUNCTION set_profile_public_id();
CREATE TRIGGER trg_set_tool_public_id
AFTER
INSERT ON tool FOR EACH ROW EXECUTE FUNCTION set_tool_public_id();
CREATE TRIGGER trg_set_request_public_id
AFTER
INSERT ON request FOR EACH ROW EXECUTE FUNCTION set_request_public_id();