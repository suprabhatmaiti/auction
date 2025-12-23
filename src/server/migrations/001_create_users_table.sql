-- migrate:up
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name  varchar(100) NOT NULL,
    email varchar(100) NOT NULL UNIQUE,
    password text NOT NULL,
    role TEXT CHECK (role IN ('buyer', 'seller')) DEFAULT 'buyer',
    created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_users_email ON users(email);

-- migrate:down
DROP TABLE users;
DROP INDEX idx_users_email;
--