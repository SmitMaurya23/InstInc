import jwt  from "jsonwebtoken"

const createTokenAndSaveCookie=(userId,res)=>{
    const token=jwt.sign({userId},process.env.JWT_TOKEN,{
        expiresIn:"10d"
    });
    res.cookie("jwt",token,{
        httpOnly:true, //save from xss attack
        secure: true,        // Must be true for SameSite=None
        sameSite: 'None',    // Allows cross-site cookie sending ONLY FOR PRODUCTION FOR LOCAL USE STRICT
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000) // 1 day expiry
    });
}
export default createTokenAndSaveCookie;
