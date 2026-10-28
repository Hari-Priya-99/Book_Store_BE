const bookModel = require('../models/bookModel');
exports .addBook = async(req,res)=>{
    try{
        let{title,author,noOfPages,imgUrl,price,
    discountPrice,abstract,publisher,language,ISBN,category} = req.body
        let sellerMail =req.userMail

        let uploadedImages = []

        req.files.forEach((eachFile) => {
            uploadedImages.push(eachFile.filename)
        });


        let newBook = new bookModel({title,author,noOfPages,imgUrl,price,
    discountPrice,abstract,publisher,language,ISBN,category,sellerMail,uploadedImages})
    
    await newBook.save()
    res.status(201).json({message:'successfully saved'})
        }catch(error){
        console.log(error)
        res.status(500).json({message:"something went wrong in server"})

    }
}

exports.getAllBooks = async(req,res)=>{
        try {
            let allBooks = await bookModel.find()
            res.status(200).json(allBooks)
            
        } catch (error) {
            console.log(error)
        res.status(500).json({message:"something went wrong in server"})

            
        }
    }
    exports.getLimitedBooks =async(req,res)=>{
        try {
            let limitedBooks = await bookModel.find().limit(6)
            res.status(200).json(limitedBooks)
            
        } catch (error) {

        res.status(500).json({message:"something went wrong in server"})
            
        }

    }
    exports.getSingleBook = async(req,res)=>{
        try {
            let {id} = req.params
            let singleBook = await bookModel.find().findById(id)
            res.status(200).json(singleBook)
            
        } catch (error) {
            console.log(error)
             res.status(500).json({message:"something went wrong in server"})
            
        }
    }
    exports.deleteBook = async(req,res)=>{
        try {
            let {id} = req.params
            await bookModel.findByIdAndDelete(id)
            res.status(200).json({message:"successfully deleted"})
            
        } catch (error) {
            console.log(error)
            res.status(500).json({message:"something went wrong in server"})
            
        }
    }
  
    exports.buyBook = async(req,res)=>{
        try {
            let {id} = req.params
            let buyerMail = req.userMail
            let updatedBook = await bookModel.findByIdAndUpdate(id,buyerMail)
            
        } catch (error) {
             console.log(error)
             res.status(500).json({message:"something went wrong in server"})
            
        }
    }
    exports.getUserBoughtBooks = async(req,res)=>{
        try {
            let buyerMail = req.userMail
            let getUserBoughtBooks = await bookModel.find({buyerMail})
            res.status(200).json(getUserBoughtBooks)
            
        } catch (error) {
              console.log(error)
             res.status(500).json({message:"something went wrong in server"})
            
            
        }
    }
    exports.getSellerBooks = async (req,res) => {
        try {
            let sellerMail = req.userMail
            let getSellerBooks = await bookModel.find({sellerMail})
            res.status(200).json(getSellerBooks)

            
        } catch (error) {
             console.log(error)
             res.status(500).json({message:"something went wrong in server"})
            
        }
    }
    exports.getPurchaseHistory = async(req,res)=>{
         try {
              let buyerMail = req.userMail
            let getUserBoughtBooks = await bookModel.find({buyerMail})
            res.status(200).json(getUserBoughtBooks)
            
            
        } catch (error) {
             console.log(error)
             res.status(500).json({message:"something went wrong in server"})
            
        }
    }