
import express from "express";
import type { Express } from "express";
import helmet from "helmet";
import cors from "cors";
import pinoHttp from "pino-http";
import { sql } from "drizzle-orm";
// import { env } from "./config/env";
import { db } from "./db";

export const app: Express = express();

app.disable("x-powered-by");

app.use(helmet());
app.use(cors());
app.use(pinoHttp());
app.use(express.json());

app.get("/", (_req, res) => {
  res.status(200).json({
    status: "OK"
  });
});

app.get("/api/v1/health/db", async (_req, res) => {
  try {
    await db.execute(sql`SELECT 1`);

    res.status(200).json({
      success: true,
      data: {
        database: "connected"
      }
    });
  } catch (error) {
    console.error("Database readiness check failed:", error);

    res.status(503).json({
      success: false,
      data: {
        database: "unavailable"
      }
    });
  }
});
