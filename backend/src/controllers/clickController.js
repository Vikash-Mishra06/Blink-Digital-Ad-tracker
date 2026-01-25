import { v4 as uuidv4 } from "uuid";
import { query } from "../db/db.js";
import { isValidUrl } from "../utils/validateURL.js";

export const handleClick = async (req, res) => {
  const { lp, source, campaign_id, ad_id } = req.query;

  // 1. Validate landing page
  if (!lp || !isValidUrl(lp)) {
    return res.status(400).json({ error: "Invalid landing page URL" });
  }

  // 2. Generate click_id
  const clickId = uuidv4();

  // 3. Capture request metadata
  const ip =
    req.headers["x-forwarded-for"]?.split(",")[0] ||
    req.socket.remoteAddress;

  const userAgent = req.headers["user-agent"];

  // 4. Store click asynchronously (DO NOT block redirect)
  (async () => {
    try {
      await query(
        `INSERT INTO clicks (click_id, source, campaign_id, ad_id, ip, user_agent)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [clickId, source, campaign_id, ad_id, ip, userAgent]
      );
    } catch (err) {
      console.error("Click insert failed:", err.message);
    }
  })();

  // 5. Redirect immediately
  const redirectUrl = new URL(lp);
  redirectUrl.searchParams.set("click_id", clickId);

  return res.redirect(302, redirectUrl.toString());
};
