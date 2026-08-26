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
    }}],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }
}, {timestamps: true});

// model
export const URL = mongoose.model("url", urlSchema);