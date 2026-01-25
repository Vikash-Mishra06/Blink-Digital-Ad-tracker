import { query } from "../db/db.js";

export const handleConversion = async (req, res) => {
  const { click_id, event, value, currency } = req.body;

  // 1. Basic validation
  if (!click_id || !event) {
    return res.status(400).json({ error: "click_id and event are required" });
  }

  try {
    // 2. Ensure click exists (last-click attribution)
    const clickResult = await query(
      "SELECT id FROM clicks WHERE click_id = $1",
      [click_id]
    );

    if (clickResult.rowCount === 0) {
      return res.status(404).json({ error: "Invalid click_id" });
    }

    // 3. Store conversion
    await query(
      `INSERT INTO conversions (click_id, event, value, currency)
       VALUES ($1, $2, $3, $4)`,
      [click_id, event, value || null, currency || null]
    );

    return res.status(201).json({ message: "Conversion tracked successfully" });
  } catch (err) {
    console.error("Conversion insert failed:", err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};
