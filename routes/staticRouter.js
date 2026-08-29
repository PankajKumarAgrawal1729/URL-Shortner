import { Router } from "express";
import { URL } from "../models/url.js";
import { getAllUrls } from "../controllers/url.js";
import { restrictTo } from "../middlewares/auth.js";

export const staticRouter = Router();

staticRouter.get("/", restrictTo(["NORMAL", "ADMIN"]), async (req, res) => {
    const urls = await getAllUrls(req.user._id);
    return res.render("home", {urls});
});

staticRouter.get("/admin/urls", restrictTo(["ADMIN"]), async (req, res) => {
    const urls = await getAllUrls();
    return res.render("home", {urls});
});

staticRouter.get("/signup", async (req, res) => {
    return res.render("signup");
});

staticRouter.get("/signin", async (req, res) => {
    return res.render("signin");
});