-- migrate:up
CREATE TABLE auction_wins (
  id SERIAL PRIMARY KEY,

  seller_id INTEGER,
  auction_id INTEGER NOT NULL,
  winner_id INTEGER,
  winning_bid_id INTEGER NOT NULL,

  winning_amount NUMERIC NOT NULL CHECK (winning_amount > 0),
  won_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  CONSTRAINT auction_wins_seller_fkey
    FOREIGN KEY (seller_id)
    REFERENCES users(id)
    ON DELETE SET NULL,

  CONSTRAINT auction_wins_winner_fkey
    FOREIGN KEY (winner_id)
    REFERENCES users(id)
    ON DELETE SET NULL,

  CONSTRAINT auction_wins_auction_fkey
    FOREIGN KEY (auction_id)
    REFERENCES auctions(id)
    ON DELETE CASCADE,

  CONSTRAINT auction_wins_bid_fkey
    FOREIGN KEY (winning_bid_id)
    REFERENCES bids(id),

  CONSTRAINT auction_wins_unique_auction
    UNIQUE (auction_id)
);

CREATE INDEX idx_auction_wins_winner ON auction_wins(winner_id);
CREATE INDEX idx_auction_wins_seller ON auction_wins(seller_id);

-- migrate:down
DROP INDEX IF EXISTS idx_auction_wins_seller;
DROP INDEX IF EXISTS idx_auction_wins_winner;
DROP TABLE IF EXISTS auction_wins;
