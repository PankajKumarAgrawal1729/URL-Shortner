import express, { urlencoded } from "express";
import { router } from "./routes/url.js";
import { staticRouter } from "./routes/staticRouter.js";
import { connectMongoDB } from "./connections.js";
import path from 'path';

const PORT = 8001;
const app = express();

connectMongoDB('mongodb://127.0.0.1:27017/userDB-1');

app.use(express.urlencoded({extended: true}));
app.use("/api/url", router);
app.use("/", staticRouter);
app.set('view engine', 'ejs');
app.set('views', path.resolve("./views"));

app.listen(PORT, () => {
    console.log(`App listen at port: ${PORT}`);
})
