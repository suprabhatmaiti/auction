-- migrate:up
CREATE TYPE auction_status AS ENUM (
  'pending',
  'active',
  'ended'
);

CREATE TABLE auctions (
    id SERIAL PRIMARY KEY,

    title TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    category VARCHAR(100),

    start_price NUMERIC NOT NULL CHECK (start_price > 0),
    current_price NUMERIC CHECK (current_price >= start_price),

    seller_id INTEGER NOT NULL,

    start_time TIMESTAMPTZ,
    end_time TIMESTAMPTZ CHECK (end_time > start_time),

    min_increment NUMERIC DEFAULT 1 CHECK (min_increment > 0),
    seq INTEGER DEFAULT 0,

    status auction_status NOT NULL DEFAULT 'pending',

    current_highest_bid_id INTEGER,
    is_approved BOOLEAN DEFAULT false,
    winner_id INTEGER,

    auction_run_time BIGINT NOT NULL,

    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

    CONSTRAINT fk_auctions_seller
      FOREIGN KEY (seller_id)
      REFERENCES users(id)
      ON DELETE CASCADE,

    CONSTRAINT fk_auctions_winner
      FOREIGN KEY (winner_id)
      REFERENCES users(id)
      ON DELETE SET NULL
);

CREATE INDEX idx_auctions_status ON auctions(status);
CREATE INDEX idx_auctions_seller ON auctions(seller_id);
CREATE INDEX idx_auctions_end_time ON auctions(end_time);

-- migrate:down
DROP INDEX IF EXISTS idx_auctions_end_time;
DROP INDEX IF EXISTS idx_auctions_seller;
DROP INDEX IF EXISTS idx_auctions_status;
DROP TABLE IF EXISTS auctions;
