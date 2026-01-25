// src/routes/reportRoutes.js
import express from "express";
import { handleReport } from "../controllers/reportController.js";

const router = express.Router();

router.get("/", handleReport);

export default router;
