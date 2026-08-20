import { User } from "../models/user.js";

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

export {
    handleUserSignUp
}