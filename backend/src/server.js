import express from "express";
import dotenv from "dotenv";

import logger from "./libs/logger.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.listen(port, () => {
  logger.info(`Server is running at http://localhost:${port}`);
});
