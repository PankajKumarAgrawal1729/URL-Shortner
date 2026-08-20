import express, { urlencoded } from "express";
import { router } from "./routes/url.js";
import { staticRouter } from "./routes/staticRouter.js";
import { userRouter } from "./routes/user.js";
import { connectMongoDB } from "./connections.js";
import path from 'path';

const PORT = 8001;
const app = express();

connectMongoDB('mongodb://127.0.0.1:27017/short-url');

app.use(express.urlencoded({extended: true}));
app.use("/", staticRouter);
app.use("/api/url", router);
app.use("/api/user", userRouter);
app.set('view engine', 'ejs');
app.set('views', path.resolve("./views"));

app.listen(PORT, () => {
    console.log(`App listen at port: ${PORT}`);
})
