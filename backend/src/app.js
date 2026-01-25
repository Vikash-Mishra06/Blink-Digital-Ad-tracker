// src/app.js
import express from "express";
import cors from "cors";

import clickRoutes from "./routes/clickRoutes.js";
import conversionRoutes from "./routes/conversionRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/click", clickRoutes);
app.use("/conversion", conversionRoutes);
app.use("/report", reportRoutes);

export default app;
