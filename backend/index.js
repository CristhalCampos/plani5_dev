import { config } from 'dotenv';
config();
import express, { json } from "express";
import cors from "cors";
import cookieParser from 'cookie-parser';
import { connectToDatabase } from "./config/db.js";
import routerAuth from './routes/auth.routes.js';

if (!process.env.PORT || !process.env.FRONTEND_URL || !process.env.MONGODB_URI) {
  console.error("Missing environment variables");
  process.exit(1);
}

connectToDatabase();

const app = express();
const port = process.env.PORT;

app.use(json());
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use("/api/auth", routerAuth);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});