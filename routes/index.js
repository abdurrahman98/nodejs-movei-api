const express = require('express');
const router = express.Router();

const User=require("../models/User")

const bcrypt=require("bcryptjs")

const jwt =require("jsonwebtoken")



/* GET home page. */
router.get('/', (req, res, next) =>{
  res.render('index', { title: 'Express' });
});
router.post("/register",(req,res)=>{
    const {password}=req.body
    bcrypt
        .hash(password,10)
        .then(hash => {
            const user=new User({
                ...req.body,
                password:hash
            })
            const promise=user.save();
            promise
                .then(data => {
                    res.json(data)
                })
                .catch(err=>{
                    res.json(err)
                })

        })



})
router.post("/authenticate",(req,res)=>{
    const {username,password}=req.body
    const promise=User.findOne({
        username
    })
    promise
        .then((user)=>{

            if(user){
                bcrypt.compare(password,user.password)
                    .then((result)=>{

                        if(!result){
                            res.json({
                                status:false,
                                message:"Authentication failed, user not found."

                            })
                        }
                        else{
                            const payload={
                                username
                            }

                            const token=jwt.sign(payload,req.app.locals.settings.api_secret_key,{
                                expiresIn: 720 // dk cinsinden
                            })

                            res.json({
                                status:true,
                                token
                            })

                        }
                    })


            }
            else{
                res.json({
                    status:false,
                    message:"Authentication failed, user not found."
                })
            }

        })
        .catch((err)=>{
            res.json(err)
        })
})
module.exports = router;
