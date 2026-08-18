import mongoose from "mongoose";

// Schema
const urlSchema = new mongoose.Schema({
    shortUrl: {
        type: String,
        required: true,
        unique: true
    },
    redirectUrl: {
        type: String,
        required: true
    },
    visitHistory: [{timestamps: {
        type: Number 
    }}]
}, {timestamps: true});

// model
export const URL = mongoose.model("url", urlSchema);