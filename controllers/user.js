import { User } from "../models/user.js";
import { v4 as uuidv4 } from "uuid";
import { setUser } from "../service/auth.js";

async function handleUserSignUp(req, res) {
    try {
        const { name, email, password } = req.body;
        const user = await User.create({
            name,
            email,
            password
        });
        return user ? res.status(201).render("home") : res.send("<h1>Something Went Wrong</h1>")
    } catch (error) {
        console.error(`User SignUp Fails: ${error}`);
    }
}

async function handleUserLogIn(req, res, next) {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({
            email,
            password
        });


        if (!user) {
            return res.status(201).render("signin");
        }

        // const sessionId = uuidv4();
        // setUser(sessionId, user);

        const token = setUser(user);
        res.cookie("uid", token);
        return res.status(201).redirect("/");

    } catch (error) {
        console.error(`User LogIn Fails: ${error}`);
    }
}

export {
    handleUserSignUp,
    handleUserLogIn
}