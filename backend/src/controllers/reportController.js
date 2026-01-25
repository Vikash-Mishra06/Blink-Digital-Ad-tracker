import { query } from "../db/db.js";

export const getReport = async (req, res) => {
  const { source } = req.query;

  try {
    const result = await query(
      `
      SELECT
        c.campaign_id,
        COUNT(DISTINCT c.click_id) AS total_clicks,
        COUNT(cv.id) AS total_conversions,
        COALESCE(SUM(cv.value), 0) AS total_revenue
      FROM clicks c
      LEFT JOIN conversions cv
        ON c.click_id = cv.click_id
      WHERE ($1::text IS NULL OR c.source = $1)
      GROUP BY c.campaign_id
      ORDER BY c.campaign_id
      `,
      [source || null]
    );

    return res.json(result.rows);
  } catch (err) {
    console.error("Report fetch failed:", err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};
