const jwt = require('jsonwebtoken')
const jwtAdminMiddleware = (req,res,next)=>{
    try {
        let token = req.headers.authorization.split(" ")[1]
        let decoded = jwt.decode(token,process.env.jwtSecretKey)
        console.log(decoded)
        if(decoded){
            if(decoded.userType== "admin") {
                req.userMail = decoded.userMail
                next()
            }else{
                res.status(403).json({message:"invalid usertype,only admin can do operation"})
            }
           
        }else{
            res.status(401).json({message:"invalid token,please login"})
        }
        
    } catch (error) {
          console.log(error)
             res.status(500).json({message:"something went wrong in server"})
            
    }
}
module.exports  = jwtAdminMiddleware