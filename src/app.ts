
import express from "express";
import type { Express } from "express";
import helmet from "helmet";
import cors from "cors";
import pinoHttp from "pino-http";
import {authRouter} from "./modules/auth/auth.routes";
import {errorHandler} from "./middleware/error-handler";

export const app: Express = express();

app.disable("x-powered-by");
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(errorHandler);
app.use(pinoHttp());
app.use(express.json());

app.get("/", (_req, res) => {
  res.status(200).json({
    status: "OK"
  });
});

app.use("/api/v1/auth", authRouter);