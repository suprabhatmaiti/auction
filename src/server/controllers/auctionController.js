import sharp from "sharp";
import { pool } from "../config/renderDb.js";
import fs from "fs";
import { getAuctionSnapshot } from "../socket/repositories/auction.repo.js";

export const createAuction = async (req, res) => {
  try {
    const { title, description, category, start_price, auction_run_time } =
      req.body;

    // Basic validations
    if (!title || !category || !start_price || !auction_run_time) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "Image is required" });
    }

    const originalPath = req.file.path;
    const compressedPath = originalPath.replace(/(\.\w+)$/, "_compressed$1");

    await sharp(originalPath)
      .resize(800, 800, {
        fit: sharp.fit.inside,
        withoutEnlargement: true,
      })
      .jpeg({ quality: 80 })
      .toFile(compressedPath);

    fs.unlinkSync(originalPath); // Delete original file
    const imageUrl = compressedPath;

    const startPrice = Number(start_price);
    if (Number.isNaN(startPrice) || startPrice <= 0) {
      return res.status(400).json({ error: "Invalid starting bid amount" });
    }

    if (Number.isNaN(auction_run_time)) {
      return res.status(400).json({ error: "Invalid auction end time" });
    }

    const now = new Date();

    if (auction_run_time <= 600000) {
      return res.status(400).json({
        error: "Auction Run Time time must be a greater than 10 minutes ",
      });
    }

    const sellerId = req.user?.id;
    if (!sellerId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const insertSql = `
      INSERT INTO auctions
        (title, description, image_url, category, start_price, current_price, seller_id, auction_run_time,created_at)
      VALUES
        ($1, $2, $3, $4,  $5, $6, $7, $8, NOW())
      RETURNING id, title, description, image_url, category, start_price, current_price, seller_id, is_active
    `;
    const params = [
      title.trim(),
      (description || "").trim(),
      imageUrl,
      category.trim().toLowerCase(),
      startPrice,
      startPrice,
      sellerId,
      auction_run_time,
    ];

    const { rows } = await pool.query(insertSql, params);

    console.log("createAuction success:", rows[0]);

    return res.status(201).json({
      message: "Auction created successfully",
      auction: rows[0],
    });
  } catch (error) {
    console.error("create auction error:", error);
    return res
      .status(500)
      .json({ error: "Server error during auction creation" });
  }
};

export const getAuctions = async (req, res) => {
  try {
    const {
      categories = "",
      startPrice = "",
      endPrice = "",
      search = "",
      sortBy = "",
      order = "DESC",
      page = "1",
      pageSize = "10",
      activeOnly = "true",
    } = req.query;

    console.log(req.user);
    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const sizeNum = Math.min(100, Math.max(1, parseInt(pageSize, 10) || 10));
    const offset = (pageNum - 1) * sizeNum;

    const params = [];
    const where = [];

    // price range
    if (startPrice !== "") {
      params.push(Number(startPrice));
      where.push(`current_price >= $${params.length}`);
    }
    if (endPrice !== "") {
      params.push(Number(endPrice));
      where.push(`current_price <= $${params.length}`);
    }

    // active only
    if (activeOnly === "true") {
      where.push("is_active = true");
      where.push("end_time > NOW()");
    }

    // search (reuse same placeholder for both columns is OK)
    if (search) {
      params.push(`%${search.trim()}%`);
      where.push(
        `(title ILIKE $${params.length} OR description ILIKE $${params.length})`
      );
    }

    // categories (PUSH ARRAY ONCE, then = ANY($n))
    if (categories) {
      const cats = categories
        .split(",")
        .map((c) => c.trim().toLowerCase())
        .filter(Boolean);

      if (cats.length) {
        params.push(cats);
        where.push(`category = ANY($${params.length})`);
      }
    }

    where.push("is_approved = true");
    where.push("is_active = true");
    where.push("end_time > NOW()");

    const whereSql = where.length ? `WHERE ${where.join(" AND ")}` : "";

    // sorting
    let orderBySql = "ORDER BY start_time DESC";
    if (sortBy.trim() === "price") {
      orderBySql = `ORDER BY current_price ${
        order.toUpperCase() === "ASC" ? "ASC" : "DESC"
      } NULLS LAST`;
    } else if (sortBy.trim() === "end_time") {
      orderBySql = `ORDER BY end_time ${
        order.toUpperCase() === "ASC" ? "ASC" : "DESC"
      }`;
    } else if (sortBy.trim() === "newest") {
      orderBySql = `ORDER BY start_time ${
        order.toUpperCase() === "ASC" ? "ASC" : "DESC"
      }`;
    }

    // data query (uses LIMIT/OFFSET at the end)
    const dataSql = `
      SELECT id, title, description, image_url, category,
             start_price, current_price, seller_id,
             start_time, end_time, is_active
      FROM auctions
      ${whereSql}
      ${orderBySql}
      LIMIT $${params.length + 1} OFFSET $${params.length + 2}
    `;
    const dataParams = [...params, sizeNum, offset];

    // count query (same filters, no pagination)
    const countSql = `
      SELECT COUNT(*)::int AS total
      FROM auctions
      ${whereSql}
    `;

    const [dataResult, countResult] = await Promise.all([
      pool.query(dataSql, dataParams),
      pool.query(countSql, params),
    ]);

    const totalAuctions = countResult.rows[0]?.total ?? 0;
    const totalPages = Math.max(1, Math.ceil(totalAuctions / sizeNum));

    res.status(200).json({
      auctions: dataResult.rows,
      pagination: {
        totalAuctions,
        totalPages,
        currentPage: pageNum,
        pageSize: sizeNum,
      },
    });
  } catch (error) {
    console.error("getAuctions error:", error);
    res.status(500).json({ error: "Server error fetching auctions" });
  }
};

// get auction by id
export const getAuctionById = async (req, res) => {
  const { id } = req.params;
  try {
    const idNum = Number(id);
    if (Number.isNaN(idNum) || idNum <= 0) {
      return res.status(400).json({ error: "Invalid auction ID" });
    }

    const sql = `
      SELECT 
        a.id, a.title, a.description, a.image_url, a.category,
        a.start_price, a.current_price, a.seller_id,
        a.start_time, a.end_time, a.is_active,a.created_at,
        u.email AS seller_email,
        u.name AS seller_name
      FROM auctions a
      JOIN users u ON a.seller_id = u.id
      WHERE a.id = $1
      LIMIT 1;
    `;
    const { rows } = await pool.query(sql, [idNum]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "Auction not found" });
    }
    res.status(200).json({ auction: rows[0] });
  } catch (error) {
    console.error("getAuctionById error:", error);
    res.status(500).json({ error: "Server error fetching auction" });
  }
};

export const getAuctionSnap = async (req, res) => {
  try {
    const { id } = req.params;
    const idNum = Number(id);
    if (Number.isNaN(idNum) || idNum <= 0) {
      return res.status(400).json({ error: "Invalid auction ID" });
    }
    const result = await getAuctionSnapshot(idNum);
    res.status(200).json({ snapshot: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error fetching auction" });
  }
};

export const endAuction = async (req, res) => {
  try {
    const { id } = req.params;
    const idNum = Number(id);
    if (Number.isNaN(idNum) || idNum <= 0) {
      return res.status(400).json({ error: "Invalid auction ID" });
    }
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const sql = `
      UPDATE auctions
      SET is_active = false
      WHERE id = $1`;
    const { rows } = await pool.query(sql, [idNum]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Auction not found" });
    }
    res.status(200).json({ message: "Auction ended successfully" });
  } catch (error) {}
};

export const getUnapprovedAuctions = async (req, res) => {
  try {
    const { page = "1", pageSize = "10" } = req.query;
    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const sizeNum = Math.min(100, Math.max(1, parseInt(pageSize, 10) || 10));
    const offset = (pageNum - 1) * sizeNum;

    if (!req.user) return res.status(401).json({ error: "Unauthorized" });

    const adminId = req.user.id;
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Forbidden" });
    }

    const dataSql = `SELECT a.id, a.title, a.description, a.image_url, a.category,
             a.start_price,a.seller_id, 
             a.start_time, a.end_time,u.name AS seller_name,
             a.is_approved,u.email AS seller_email,a.created_at,a.auction_run_time
      FROM auctions a
      JOIN users u ON a.seller_id = u.id
      WHERE a.is_approved = false
      ORDER BY start_time DESC
      LIMIT $1 OFFSET $2`;
    const dataParams = [sizeNum, offset];

    const result = await pool.query(dataSql, dataParams);

    const totalAuctions = result.rows.length;
    const totalPages = Math.max(1, Math.ceil(totalAuctions / sizeNum));

    res.status(200).json({
      auctions: result.rows,
      pagination: {
        totalAuctions,
        totalPages,
        currentPage: pageNum,
        pageSize: sizeNum,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error fetching auctions" });
  }
};

export const approveAuction = async (req, res) => {
  console.log(req);
  try {
    const { id } = req.params;

    const idNum = Number(id);
    if (Number.isNaN(idNum) || idNum <= 0) {
      return res.status(400).json({ error: "Invalid auction ID" });
    }
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const adminId = req.user.id;
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Forbidden" });
    }
    const result = await pool.query(
      `SELECT auction_run_time FROM auctions WHERE id = $1`,
      [idNum]
    );

    const now = new Date();
    const auctionRunTime = result.rows[0].auction_run_time;
    const end_time = new Date(now.getTime() + Number(auctionRunTime));
    const sql = `
      UPDATE auctions
      SET start_time = NOW(),
         end_time = $1,
         is_active = true,
         is_approved = true
      WHERE id = $2`;
    await pool.query(sql, [end_time, idNum]);

    res.status(200).json({ message: "Auction approved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error approving auction" });
  }
};
