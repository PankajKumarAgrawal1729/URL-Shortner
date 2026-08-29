import jwt from "jsonwebtoken";

const SECREAT_KEY = "Pankaj##Kumar$";

function setUser(user) {
    try {
        const payload = {
        _id: user._id,
        email : user.email
    }
    return jwt.sign(payload, SECREAT_KEY);
    } catch (error) {
        console.error("Create Token Failed:", error);
        
    }
}

function getUser(token) {
   try {
     if(!token) {
        return null;
    }
    
    return jwt.verify(token, SECREAT_KEY);
   } catch (error) {
    console.error("Token verify error", error);
    
   }
}

export {
    setUser,
    getUser
};