import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";

import { arcjetMiddleware } from "./middleware/arcjet.middleware.js";
import { clerkMiddleware } from "@clerk/express";

import logger from "./libs/logger.js";
import connectDB from "./config/db.js";

import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js";
import commentRoutes from "./routes/comment.route.js";
import notificationRoutes from "./routes/notification.route.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(clerkMiddleware());
app.use(arcjetMiddleware);

app.get("/", (_, res) => res.send("Hello from server"));

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/notifications", notificationRoutes);

app.use((error, _req, res, _next) => {
  logger.error(`Server error: ${error.message}`);
  res
    .status(500)
    .json({ error: `${process.env.NODE_ENV === "development" ? `${error.message}` : "Internal server error"}` });
});

(async () => {
  try {
    await connectDB();

    if (process.env.NODE_ENV !== "production") {
      app.listen(port, () => {
        logger.info(`Server is running at http://localhost:${port}`);
      });
    }
  } catch (error) {
    logger.warn("Failed to start server:", error.message);
    process.exit(1);
  }
})();

export default app;
