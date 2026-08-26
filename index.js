import express, { urlencoded } from "express";
import { urlRouter } from "./routes/url.js";
import { staticRouter } from "./routes/staticRouter.js";
import { userRouter } from "./routes/user.js";
import { connectMongoDB } from "./connections.js";
import path from 'path';
import cookieParser from 'cookie-parser';
import { restrictToLoginUserOnly, checkAuth } from "./middlewares/auth.js";

const PORT = 8001;
const app = express();

connectMongoDB('mongodb://127.0.0.1:27017/short-url');

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/", checkAuth, staticRouter);
app.use("/api/url", restrictToLoginUserOnly, urlRouter);
app.use("/api/user", userRouter);
app.set('view engine', 'ejs');
app.set('views', path.resolve("./views"));

app.listen(PORT, () => {
    console.log(`App listen at port: ${PORT}`);
})
