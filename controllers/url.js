import { URL } from "../models/url.js";
import { nanoid } from "nanoid";

async function getAllUrls(createdBy) {
    try {
        const urls = createdBy ? await URL.find({createdBy: createdBy}) : await URL.find({createdBy});
        return urls;
    } catch (error) {
        console.error(`Error while fetching All Urls: ${error}`);
    }
}

async function showAllUrls(req, res) {
    try {
        const urls = await getAllUrls();
        return res.json({urls});
    } catch (error) {
        console.error(`Error while showing All Urls: ${error}`);
    }
}

async function handleGenerateShortURL(req, res) {
    try {
        const data = req.body;
        
        const redirectUrl = data.url;
        if(!redirectUrl) {
            res.status(400).json({status: "URL is required"});
        }
        const shortId = nanoid(8);
        const url = await URL.create({
            shortUrl: shortId,
            redirectUrl: redirectUrl,
            visitHistory: [],
            createdBy: req.user._id
        });
        
        return res.status(201).render("home", {id: shortId});
    } catch (error) {
        console.error(`Something went wrong while generating your Short URL: ${error}`);
    }
}

async function getRedirectUrl(req, res) {
    try {
        const id = req?.params?.id;
        
        const url = await URL.findOneAndUpdate({
            shortUrl: id
        }, {
            $push: {
                visitHistory: {timestamp: Date.now()}
            }
        });
        
        if(!url) {
            return res.status(404).json({status: "Enter valid ID"});
        }

        return res.status(301).redirect(url.redirectUrl);
    } catch (error) {
        console.error(`URL redirect fails: ${error}`);
    }
}

async function getUrlAnalytics(req, res) {
    try {
        const shortUrl = req?.params?.id;
        const urlInfo = await URL.findOne({
            shortUrl
        });
        return res.json({clickCount: urlInfo.visitHistory.length, visitHistory: urlInfo.visitHistory})
    } catch (error) {
        console.error(`Error while fetching analytics: ${error}`);
    }
}

export {
    handleGenerateShortURL,
    getRedirectUrl,
    showAllUrls,
    getUrlAnalytics,
    getAllUrls
}