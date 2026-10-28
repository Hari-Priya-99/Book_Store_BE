const express =require('express')
const {registerUser, loginUser,updateProfile, getSingleUser, getAllUsers, userDelete, googleLogin} = require('./controllers/userController')
const multerConfig = require('./middlewares/multerMiddleware')
const { addBook, getAllBooks, getLimitedBooks, getSingleBook, deleteBook, buyBook, getUserBoughtBooks, getSellerBooks, getPurchaseHistory, } = require('./controllers/bookController')
const router = new express.Router()
const jwtMiddleware = require("./middlewares/jwtMiddleware")
const jwtAdminMiddleware = require("./middlewares/jwtAdminMiddleware")

router.post('/register',registerUser)
router.post('/login',loginUser)
router.post("/googleLogin",googleLogin)

router.post('/addBook',jwtMiddleware,multerConfig.array("uploadedImages"),addBook);

router.get('/getAllBooks',jwtMiddleware,getAllBooks)

router.get("/getLimitedBooks",getLimitedBooks)
router.get('/:id/getSingleBook',jwtMiddleware,getSingleBook)
router.delete('/:id/deleteBook', jwtMiddleware,deleteBook)
router.patch('/:id/updateProfile',jwtMiddleware,multerConfig.single('proPic'),updateProfile)
router.get('/getSingleUser',jwtMiddleware,getSingleUser)
 router.post('/:id/buyBook',jwtMiddleware,buyBook)

 router.get('/getUserBoughtBooks',jwtMiddleware,getUserBoughtBooks)
 router.get('/getAllUsers',jwtAdminMiddleware,getAllUsers)
 router.delete('/:id/userDelete',jwtAdminMiddleware,userDelete)
 router.get('/getSellerBooks',jwtMiddleware,getSellerBooks)
 router.get("/getPurchaseHistory",jwtMiddleware,getPurchaseHistory)
 
module.exports = router
