import "dotenv/config";
import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import videoRoutes from "./routes/video.routes.js";

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/videos", videoRoutes);

const server = http.createServer(app);
export const io = new Server(server, { cors: { origin: "*" } });

const PORT = process.env.PORT || 5000;
server.listen(PORT, () =>
  console.log(`Server running on ${PORT}`)
);
