import { Router } from "express";
import { URL } from "../models/url.js";
import { getAllUrls } from "../controllers/url.js";

export const staticRouter = Router();

staticRouter.get("/", async (req, res) => {
    if(!req.user) {
        return res.redirect("/signin");
    }
    const urls = await getAllUrls(req.user._id);
    return res.render("home", {urls});
});

staticRouter.get("/signup", async (req, res) => {
    return res.render("signup");
});

staticRouter.get("/signin", async (req, res) => {
    return res.render("signin");
});