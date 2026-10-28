const mongoose = require("mongoose")
mongoose.connect(process.env.dbConnectString).then((res)=>{
    console.log("connected to mongoDB")
}).catch((err)=>{
    console.log(err)
})

