-- migrate:up
CREATE TYPE user_role AS ENUM (
  'admin',
  'buyer',
  'seller'
);
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name  varchar(100) NOT NULL,
    email varchar(100) NOT NULL UNIQUE,
    password text NOT NULL,
    role user_role NOT NULL DEFAULT 'buyer',
    created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_users_email ON users(email);

-- migrate:down
DROP INDEX idx_users_email;
DROP TABLE users;

--