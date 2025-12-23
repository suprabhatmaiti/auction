-- migrate:up
CREATE TABLE bids (
    id SERIAL PRIMARY KEY,

    auction_id INTEGER NOT NULL,
    bidder_id INTEGER NOT NULL,
    amount NUMERIC NOT NULL CHECK (amount > 0),

    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

    CONSTRAINT fk_bids_auction
      FOREIGN KEY (auction_id)
      REFERENCES auctions(id)
      ON DELETE CASCADE,

    CONSTRAINT fk_bids_bidder
      FOREIGN KEY (bidder_id)
      REFERENCES users(id)
      ON DELETE CASCADE
);

CREATE INDEX idx_bids_auction ON bids(auction_id);
CREATE INDEX idx_bids_bidder ON bids(bidder_id);
CREATE INDEX idx_bids_amount_desc ON bids(amount DESC);

-- migrate:down
DROP INDEX IF EXISTS idx_bids_amount_desc;
DROP INDEX IF EXISTS idx_bids_bidder;
DROP INDEX IF EXISTS idx_bids_auction;
DROP TABLE IF EXISTS bids;
