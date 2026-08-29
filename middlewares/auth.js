import { getUser } from "../service/auth.js";

function checkForAuthentication(req, res, next) {

}

export function restrictToLoginUserOnly(req, res, next) {
    // const userUid = req.cookies?.uid;
    let authorizationHeader = req?.headers["authorization"];
    // if(!userUid) {
    //     return res.redirect("/signin");
    // }
    if (!authorizationHeader) {
        return res.redirect("/signin");
    }

    // const user = getUser(userUid);

    // if(!user) {
    //     return res.redirect("/signin");
    // }

    let token = authorizationHeader.split("Bearer ")[1];
    if (!token) {
        return res.redirect("/signin");
    }

    req.user = user;
    next();
}

export function checkAuth(req, res, next) {
    // const userUid = req.cookies?.uid;
    let authorizationHeader = req?.headers["authorization"];
    
    let token = authorizationHeader?.split("Bearer ")[1];
    // const user = getUser(userUid);
    const user = getUser(token);
    console.log("User:", token);
    
    // if (!token) {
    //     return res.redirect("/signin");
    // }

    req.user = user;
    next();
}