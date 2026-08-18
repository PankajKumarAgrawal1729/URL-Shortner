import mongoose from "mongoose";

export async function connectMongoDB(url) {
    return mongoose.connect(url).then(() => {
        console.log("DB Connected successfully");
    }).catch(error => console.error("DB Connection fails"));
}