const mongoose = require('mongoose')
const bookSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    noOfPages:{
        type:Number,
        required:true
    },
    imgUrl:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    discountPrice:{
        type:Number,
        default:0
    },
    abstract:{
        type:String,
        required:true
    },
    publisher:{
        type:String,
        required:true
    },
    language:{
        type:String,
        required:true
    },
    ISBN:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    uploadedImages:{
        type:Array,
        required:true
    },
    sellerMail:{
        type:String,
        required:true
    },
    buyerMail:{
        type:String,
        default:''
    },


})
const bookModel =  mongoose.model('books',bookSchema)
module.exports = bookModel