import { getUser } from "../service/auth.js";


export function restrictToLoginUserOnly(req, res, next) {
    const userUid = req.cookies?.uid;
    if(!userUid) {
        return res.redirect("/signin");
    }

    const user = getUser(userUid);

    if(!user) {
        return res.redirect("/signin");
    }

    req.user = user;
    next();
}

export function checkAuth(req, res, next) {
    const userUid = req.cookies?.uid;
    const user = getUser(userUid);
    
    req.user = user;
    next();
}