// src/routes/conversionRoutes.js
import express from "express";
import { handleConversion } from "../controllers/conversionController.js";

const router = express.Router();

router.post("/", handleConversion);

export default router;
