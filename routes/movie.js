const express=require("express")
const router =express.Router()

//Models
const Movie =require("../models/Movie")


router.post("/",(req,res,next)=>{
    const data = req.body;
    const movie = new Movie(req.body)
    // movie.save((err,data)=>{
    //     if(err)
    //         res.json(err)
    //     res.json({status:1})
    // })

    const promise=movie.save()
    promise
        .then((data)=>{
            res.json(data)
        })
        .catch((err)=>{
            res.json(err)
        })

})

module.exports= router;



