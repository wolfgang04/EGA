CREATE DATABASE ega;
CREATE TYPE USER_TYPE AS ENUM ('admin', 'employee');
CREATE TYPE STATUS AS ENUM (
  'pending',
  'denied',
  'approved',
  'borrowed',
  'returned'
);
----
CREATE TABLE user_auth (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  public_id TEXT UNIQUE DEFAULT '',
  password TEXT DEFAULT 'mypassword',
  user_type USER_TYPE NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  created_by BIGINT REFERENCES user_auth (id)
);
----
CREATE TABLE profile (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name JSONB NOT NULL,
  email TEXT NOT NULL,
  contact TEXT NOT NULL,
  address TEXT,
  birthday DATE CHECK (birthday <= CURRENT_DATE),
  image BYTEA,
  user_auth_id BIGINT REFERENCES user_auth(id)
);
----
CREATE TABLE category (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT UNIQUE NOT NULL,
  description TEXT,
  image BYTEA
);
----
CREATE TABLE tool (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  public_id TEXT UNIQUE DEFAULT '',
  name TEXT NOT NULL,
  quantity INT CHECK (quantity > 0),
  location TEXT NOT NULL,
  category_id BIGINT REFERENCES category (id)
);
----
CREATE TABLE request (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  public_id TEXT UNIQUE DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  request_by BIGINT REFERENCES profile (id)
);
----
CREATE TABLE request_tool (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  quantity INT CHECK (quantity > 0),
  note TEXT,
  tool_id BIGINT REFERENCES tool (id),
  request_id BIGINT REFERENCES request (id)
);
----
CREATE TABLE request_status_history (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  status STATUS DEFAULT 'pending',
  changed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  changed_by BIGINT REFERENCES profile (id),
  request_id BIGINT REFERENCES request (id)
);
----
CREATE OR REPLACE FUNCTION set_profile_public_id() RETURNS TRIGGER AS $$
DECLARE generated_id TEXT;
BEGIN -- compute ID
SELECT CASE
    WHEN ua.user_type = 'admin' THEN 'adm-' || NEW.id
    WHEN ua.user_type = 'employee' THEN 'emp-' || NEW.id
    ELSE 'USR-' || NEW.id
  END INTO generated_id
FROM user_auth ua
WHERE ua.id = NEW.user_auth_id;
-- set public_id
UPDATE user_auth
SET public_id = generated_id
WHERE id = NEW.user_auth_id;
return NEW;
END;
$$ LANGUAGE plpgsql;
------
CREATE OR REPLACE FUNCTION set_tool_public_id() RETURNS TRIGGER AS $$ BEGIN
UPDATE tool
SET public_id = 'tl-' || NEW.id
WHERE id = NEW.id;
RETURN NEW;
END;
$$ LANGUAGE plpgsql;
----
CREATE OR REPLACE FUNCTION set_request_public_id() RETURNS TRIGGER AS $$ BEGIN
UPDATE request
SET public_id = 'rq-' || NEW.id
WHERE id = NEW.id;
RETURN NEW;
END;
$$ LANGUAGE plpgsql;
----
CREATE TRIGGER trg_set_profile_public_id
AFTER
INSERT ON profile FOR EACH ROW EXECUTE FUNCTION set_profile_public_id();
----
CREATE TRIGGER trg_set_tool_public_id
AFTER
INSERT ON tool FOR EACH ROW EXECUTE FUNCTION set_tool_public_id();
----
CREATE TRIGGER trg_set_request_public_id
AFTER
INSERT ON request FOR EACH ROW EXECUTE FUNCTION set_request_public_id();
----