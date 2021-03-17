const jwt=require("jsonwebtoken")

module.exports = (req,res,next)=>{
    const token=req.headers["x-access-token"] || req.body.token || req.query.token

    if(token){

        jwt.verify(token,req.app.locals.settings.api_secret_key,(err,decoded)=>{
            if(err){
                res.json({
                    status:false,
                    message:"Failed to authenticate token."
                })
            }else{
                console.log("deneme")
                // req.decode=decoded;
                next();
            }

        })
    }
    else{
        res.json({
            status:false,
            message:"no token provided"
        })
    }
}