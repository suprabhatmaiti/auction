import { pool } from "../config/db.js";

export const createAuction = async (req, res) => {
  try {
    // Expecting multer.single("image") before this handler
    const { title, description, category, start_price, end_time } = req.body;

    // Basic validations
    if (!title || !category || !start_price || !end_time) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    if (!req.file) {
      return res.status(400).json({ error: "Image is required" });
    }

    const startPrice = Number(start_price);
    if (Number.isNaN(startPrice) || startPrice <= 0) {
      return res.status(400).json({ error: "Invalid starting bid amount" });
    }

    const endTime = new Date(end_time);
    if (Number.isNaN(endTime.getTime())) {
      return res.status(400).json({ error: "Invalid auction end time" });
    }

    const sellerId = req.user?.id;
    if (!sellerId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const imageUrl = req.file.path;

    const insertSql = `
      INSERT INTO auctions
        (title, description, image_url, category, start_price, current_price, seller_id, start_time, end_time, is_active)
      VALUES
        ($1, $2, $3, $4,  $5, $6, $7, NOW(), $8, true)
      RETURNING id, title, description, image_url, category, start_price, current_price, seller_id, start_time, end_time, is_active
    `;
    const params = [
      title.trim(),
      (description || "").trim(),
      imageUrl,
      category.trim(),
      startPrice,
      startPrice, // current_price starts equal to start_price
      sellerId,
      endTime,
    ];

    const { rows } = await pool.query(insertSql, params);

    return res.status(201).json({
      message: "Auction created successfully",
      auction: rows[0],
    });
  } catch (error) {
    console.error("createAuction error:", error);
    return res
      .status(500)
      .json({ error: "Server error during auction creation" });
  }
};

export const getAuctions = async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM auctions WHERE is_active = true ORDER BY created_at DESC"
    );
    console.log("Fetched auctions:", rows);
    res.status(200).json({ auctions: rows });
  } catch (error) {
    console.error("getAuctions error:", error);
    res.status(500).json({ error: "Server error fetching auctions" });
  }
};

export const getAuctionById = async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query("SELECT * FROM auctions WHERE id = $1", [
      id,
    ]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "Auction not found" });
    }
    res.status(200).json({ auction: rows[0] });
  } catch (error) {
    console.error("getAuctionById error:", error);
    res.status(500).json({ error: "Server error fetching auction" });
  }
};
