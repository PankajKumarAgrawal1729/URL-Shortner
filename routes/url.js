import { Router } from "express";
import { getRedirectUrl, getUrlAnalytics, handleGenerateShortURL, showAllUrls } from "../controllers/url.js";
// import { verifyAuth } from "../controllers/user.js";

export const urlRouter = Router();

// urlRouter.use(verifyAuth);

urlRouter.route("/").post(handleGenerateShortURL).get(showAllUrls);
urlRouter.get("/:id", getRedirectUrl);
urlRouter.get("/analytics/:id", getUrlAnalytics);