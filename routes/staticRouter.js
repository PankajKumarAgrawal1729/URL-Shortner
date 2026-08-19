import { Router } from "express";
import { URL } from "../models/url.js";

export const staticRouter = Router();

staticRouter.get("/", async (req, res) => {
    async function showAllUrls() {
        try {
            const urls = await URL.find({});
            return urls;
        } catch (error) {
            
        }
    }
    const urls = await showAllUrls();
    res.render("home", {urls});
});