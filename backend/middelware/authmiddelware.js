 const jwt = require('jsonwebtoken');
 const User = require("../models/user.model");
 const asyncHandler = require('express-async-handler');
const { off } = require('../models/user.model');

 const protect  = asyncHandler(async(req,res,next)=>{
    let token;
    if(
        req.headers.authorization && 
        req.headers.authorization.startsWith("Bearer")
    ){
        try{

            token =  req.headers.authorization.split(" ")[1];

            //decodes token ID
            const decoded = jwt.verify(token,process.env.jwtsecret);

            req.user = await User.findById(decoded.id).select("-password")
            next();
        }catch(error){
            res.status(401);
            throw new Error("Not authorized, token failed")
        }
    }












 })

 module.exports = {protect}