const multer = require('multer')

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./uploads")
    },
    filename:(req,file,cb)=>{
        const date = Date.now()
        cb(null,`bookstore-${date}-${file.originalname}`)
    }
})
const fileFilter =(req,file,cb)=>{
    if(file.mimetype == 'image/jpg'|| file.mimetype=="image/jpeg" ||file.mimetype =="image/png" ||file.mimetype == "image/avif"){
        cb(null,true)
    }else{
        cb(null,false)
    }
}

const multerConfig = multer({fileFilter,storage})
module.exports = multerConfig