const express=require("express")
const router =express.Router()

//Models
const Movie =require("../models/Movie")

router.get("/",(req,res)=>{
    const promise= Movie.find({})
    promise
        .then((data)=>{
            res.json(data)
        })
        .catch((err)=>{
            res.json(err)
        })
})

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

router.get("/:movie_id",(req,res,next)=>{
    const {movie_id}=req.params

    const promise = Movie.findById(movie_id)
    promise
        .then((data)=>{
            res.json(data)
        })
        .catch(()=>{
            next({message:"Film Bulunamadı",code:88})
        })


})

module.exports= router;



