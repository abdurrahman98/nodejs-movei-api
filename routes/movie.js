const express=require("express")
const router =express.Router()

//Models
const Movie =require("../models/Movie")

// router.get("/",(req,res)=>{
//     const promise= Movie.find({})
//     promise
//         .then((data)=>{
//             res.json(data)
//         })
//         .catch((err)=>{
//             res.json(err)
//         })
// })

router.get("/",(req,res)=>{
    const promise= Movie.aggregate([
        {
            $lookup:{
                from:"directors",
                localField:"director_id",
                foreignField:"_id",
                as:"director"
            }

        },
        {
            $unwind:{
                path:"$director",
                preserveNullAndEmptyArrays:true
            },

        }
    ])
    promise
        .then((data)=>{
            res.json(data)
        })
        .catch((err)=>{
            res.json(err)
        })
})

router.post("/",(req,res,next)=>{

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

//Top 10 list

// (/:movei_id) get endpointi ile çakıştığı için bunu onun üzerine yazıyoruz
router.get("/top10",(req,res)=>{
    const promise= Movie.find({}).limit(10).sort({imdb_score:-1}) //-1 => büyükten küçüğe sıralar, 1 => küçükten büyüğe sıralar
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
//update işlemi
router.put("/:movie_id",(req,res,next)=>{
    const {movie_id}=req.params

    const promise = Movie.findByIdAndUpdate(movie_id,req.body,{
        new:true // güncellenmiş veriyi döndürür eğer bunu yapmazsak eski bilgi döner
    })
    promise
        .then((data)=>{
            res.json(data)
        })
        .catch(()=>{
            next({message:"Film Bulunamadı",code:88})
        })


})
//silme işlemi
router.delete("/:movie_id",(req,res,next)=>{
    const {movie_id}=req.params

    const promise = Movie.findByIdAndRemove(movie_id)
    promise
        .then((data)=>{
            res.json(data)
        })
        .catch(()=>{
            next({message:"Film Bulunamadı",code:88})
        })


})
//Between
router.get("/between/:start_year/:last_year",(req,res)=>{
    const {start_year,last_year}=req.params
    const promise=Movie.find({
        year:{
            "$gte":parseInt(start_year),// büyük eşit "e" eşitlik kontrolü için kullanılıyor
            "$lte":parseInt(last_year) //küçük eşit
        }
    })
    promise
        .then(data=>{
            res.json(data)
        })

})




module.exports= router;



