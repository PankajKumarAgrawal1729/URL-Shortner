import { Router } from "express";
import { getRedirectUrl, getUrlAnalytics, handleGenerateShortURL, showAllUrls } from "../controllers/url.js";

export const router = Router();

router.route("/").post(handleGenerateShortURL).get(showAllUrls);
router.get("/:id", getRedirectUrl);
router.get("/analytics/:id", getUrlAnalytics);