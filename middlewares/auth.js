import { getUser } from "../service/auth.js";

export function checkForAuthentication(req, res, next) {
    try {
        const token = req?.cookies?.token;
        
        // const authorizationHeader = req?.headers["authorization"];

        // if (!authorizationHeader || !authorizationHeader.startWith("Bearer ")) {
        //     next();
        // }
        if (!token) {
           return next();
        }

        // const token = authorizationHeader?.split("Bearer ")[1];
        const user = getUser(token);

        req.user = user;
        return next();
    } catch (error) {
        console.error("Check Auth Failed:", error);

    }
}

export function restrictTo(roles) {
    return function (req, res, next) {
        if (!req.user) {
            return res.redirect("/signin");
        }
        
        if (!roles.includes(req.user.role)) {
            return res.end("UnAutherized")
        }

        return next();
    }
}