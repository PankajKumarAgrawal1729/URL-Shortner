import express from "express";
import { Router } from "express";
import { handleUserSignUp, handleUserLogIn } from "../controllers/user.js";

export const userRouter = Router();

userRouter.post("/signup", handleUserSignUp);
userRouter.post("/signin", handleUserLogIn);