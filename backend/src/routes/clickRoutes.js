// src/routes/clickRoutes.js
import express from "express";
import { handleClick } from "../controllers/clickController.js";

const router = express.Router();

router.get("/", handleClick);

export default router;
