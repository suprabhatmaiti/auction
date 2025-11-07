
import { pool } from "../config/db.js";

export const createAuction = async (req, res) => {
    console.log("createAuction called");
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

    const endTime = new Date(end_time); // ideally from <input type="datetime-local" />
    if (Number.isNaN(endTime.getTime())) {
      return res.status(400).json({ error: "Invalid auction end time" });
    }

    const sellerId = req.user?.id; // set by your auth middleware
    if (!sellerId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const imageUrl = req.file.path; // e.g., "uploads/173...-item.jpg"

    // Insert row; start_time = NOW(), current_price = start_price
    const insertSql = `
      INSERT INTO public.auctions
        (title, description, image_url, category, start_price, current_price, seller_id, start_time, end_time, is_active)
      VALUES
        ($1,   $2,          $3,        $4,       $5,          $6,            $7,        NOW(),   $8,      true)
      RETURNING id, title, description, image_url, category,
                start_price, current_price, seller_id, start_time, end_time, is_active
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
