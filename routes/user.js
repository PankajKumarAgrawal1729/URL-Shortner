import express from "express";
import { Router } from "express";
import { handleUserSignUp } from "../controllers/user.js";

export const userRouter = Router();

userRouter.post("/", handleUserSignUp);