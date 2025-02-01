const express=require('express');
const router=express.Router();
const User=require('../models/User')
const {body, validationResult}=require('express-validator');
const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken');
const SECRET_KEY="asdfghjkklzxcvbnmqwertyuiopqwsdcverfghnmuikl";
router.post('/createuser', 
    
    [body('email').isEmail(),
        body('password').isLength({min: 5})],

        async(req, res)=>{

            const errors=validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({errors: errors.array()});
            }

            const salt= await bcrypt.genSalt(10);
            let securePassword=await bcrypt.hash(req.body.password, salt)
    try{
        await User.create({
            name: req.body.name,
            password: securePassword,
            email: req.body.email,
            location: req.body.location
        })
        res.json({success: true});
    }catch(err){
        console.log(err);
        res.json({success: false, error: err.message});
    }
})

router.post('/login', 
    [body('email').isEmail(),
    body('password').isLength({min: 5})],
    async(req, res) =>
{
    const errors=validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({errors: errors.array()});
            }
    let email=req.body.email;
    try{
        let userData = await User.findOne({email})
        if(!userData){
            return res.status(400).json({errors: "Try logging in with correct credentials"});
        }
        const passwordCmp=await bcrypt.compare(req.body.password, userData.password)
        if(!passwordCmp){
            return res.status(400).json({errors: "Try logging in with correct credentials"});
        }
        const token=jwt.sign({id: userData.id}, SECRET_KEY)
        return res.json({success: true, token});
    }catch(err){
        console.log(err);
        res.json({success: false, error: err.message});
    }
})
module.exports=router;