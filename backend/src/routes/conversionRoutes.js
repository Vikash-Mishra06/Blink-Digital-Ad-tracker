import express from "express";
import { handleConversion } from "../controllers/conversionController.js";

const router = express.Router();

// POST /conversion
router.post("/", handleConversion);

export default router;
