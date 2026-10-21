import {Router} from "express";
import { registerController } from "./auth.controller";

export const authRouter=Router();

authRouter.post("/register",registerController);


