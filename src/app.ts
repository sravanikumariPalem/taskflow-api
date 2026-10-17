import express from "express";
import type { Express, Request, Response } from "express";
import helmet from "helmet";
import cors from "cors";
import pinoHttp from "pino-http";
import {env} from "./config/env";

export const app: Express = express();
app.disable("x-powered-by");
app.use(helmet());
app.use(cors());
app.use(pinoHttp());
app.use(express.json());
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ status: "OK" });
});
app.listen(env.PORT, () => {
  console.log(`Server is running on port ${env.PORT}`);
}   
);
