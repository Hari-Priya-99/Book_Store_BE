const jwt = require('jsonwebtoken')
const jwtMiddleware = (req,res,next)=>{
    try {
        let token = req.headers.authorization.split(' ')[1]
        let decoded = jwt.decode(token,process.env.jwtSecretKey)
        if(decoded){
            req.userMail = decoded.email
            next()
        }else{
            res.status(401).json("invalid token,please login")
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"something went wrong while validating token"})
        
    }
}
module.exports = jwtMiddleware