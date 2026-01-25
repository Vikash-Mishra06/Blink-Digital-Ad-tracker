import express from "express";
import { handleClick } from "../controllers/clickController.js";

const router = express.Router();

// GET /click
router.get("/", handleClick);

export default router;
