const userModel = require('../models/usermodel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.registerUser = async(req,res)=>{
    try {
        let fullName = req.body.fullName
        let email = req.body.email
        let password = req.body.password
        let existingUser = await userModel.findOne({email})
        if (existingUser) {
            res.status(409).json({message:'user with this email id is already registered'
            })
        }
        let hashedPassword = await bcrypt.hash(password,12)


        let newUser = new userModel({fullName,email,password:hashedPassword})
        await newUser.save()
        res.status(201).json(newUser)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"something went wrong in server"})
        
    }
}

exports.loginUser = async(req,res)=>{
    try {
        let {email,password} = req.body
        
        let existingUser = await userModel.findOne({email})
        if(!existingUser){
            res.status(404).json({message:"there is no user registered with this emailid,please register"})
        }
        
        let isPswdMatch = await bcrypt.compare(password,existingUser.password)
        let payload = {
            fullName:existingUser.fullName,
            email:existingUser.email,
            userType:existingUser.userType
        }

        let token = jwt.sign(payload,process.env.jwtSecretKey)



        if(isPswdMatch){
             res.status(200).json({message:'login successfull',token})
        }else{
            res.status(401).json({message:'invalid password'})
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({message:"something went wrong  in the server"})
        
    }
}
  exports.updateProfile =async(req,res)=>{
        try {
            let {id} = req.params
            let {fullname,email,password,bio} = req.body
            let proPic = req.files[0]
            let updatedUser = await userModel.findByIdandUpdate(id,{fullname,email,password,bio,proPic},{new:true})
            res.status(200).json(updatedUser)
        } catch (error) {
            console.log(error)
             res.status(500).json({message:"something went wrong in server"})
            
        }
    }
    exports.getSingleUser = async(req,res)=>{
        try {
            let email = req.userMail
            let userDetails = await userModel.findOne({email}).select('-password')
            res.status(200).json(userDetails)
            
        } catch (error) {
             console.log(error)
             res.status(500).json({message:"something went wrong in server"})
            
        }
    }
    exports.getAllUsers = async(req,res)=>{
        try {
             let allUsers = await userModel.find()
             res.status(200).json(allUsers)
            
        } catch (error) {
             console.log(error)
             res.status(500).json({message:"something went wrong in server"})
            
        }
    }
    exports.userDelete = async(req,res)=>{
        try {
             let {id} = req.params
            await userModel.findByIdAndDelete(id)
            res.status(200).json({message:"successfully deleted"})
            
        } catch (error) {
             console.log(error)
             res.status(500).json({message:"something went wrong in server"})
            
        }
    }
    exports.googleLogin =async(req,res)=>{
        try {
            let {fullName,email,propic} = req.body
            let existingUser = await userModel.findOne({email})
            if(existingUser){
            let payload = {
            fullName:existingUser.fullName,
            email:existingUser.email,
            userType:existingUser.userType
        }

        let token = jwt.sign(payload,process.env.jwtSecretKey)
         res.status(200).json({message:'login successfull',token})

            }else{
                let newUser = new userModel({fullName,email,propic,password:"fggtd"})
                await newUser.save()
                 let payload = {
            fullName:newUser.fullName,
            email:newUser.email,
            userType:newUser.userType
        }

        let token = jwt.sign(payload,process.env.jwtSecretKey)
         res.status(200).json({message:'login successfull',token})


            }
        } catch (error) {
             console.log(error)
             res.status(500).json({message:"something went wrong in server"})
            
        }

    }