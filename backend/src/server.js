// server.js
import dotenv from "dotenv";
dotenv.config();

import app from "./src/app.js";

const PORT = process.env.PORT || 5000;

import { query } from "./src/db/db.js";

query("SELECT 1")
  .then(() => console.log("DB test query successful"))
  .catch(console.error);

app.get('/health', (req, res) => {
  res.send({ message: "Server working fine" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
