const express=require("express")
const router =express.Router()

const mongoose =require("mongoose")

//Models
const Director =require("../models/Director")

router.post("/",(req,res)=>{
    const director=new Director(req.body)
    const promise=director.save()
    promise
        .then(data=>{
            res.json(data)
        })
        .catch(err=>{
            res.json(err)
        })
})

//tüm yönetmenler
router.get("/",(req,res)=>{
    const promise =Director.aggregate([
        {
            $lookup:{
                from:"movies",
                localField:"_id",
                foreignField:"director_id",
                as:"movies"
            }
        },
        {
            $unwind:{
            path:"$movies",
            preserveNullAndEmptyArrays:true // filmi olmayan directorlerde getirilir bu olmadan sadece filmi olanlar getirilir
        }
        },
        {
            $group:{
                _id:{
                    _id:"$_id",
                    name:"$name",
                    surname:"$surname",
                    bio:"$bio"
                },
                movies:{
                    $push:"$movies"
                }
            }
        },
        {
            $project:{
                _id:"$_id._id",
                name:"$_id.name",
                surname:"$_id.surname",
                bio:"$_id.bio",
                movies:"$movies"
            }
        }

    ])

    promise
        .then(data=>{
            res.json(data)
        })
        .catch(err=>{
            res.json(err)
        })

})


// yönetmen detay verileri
router.get("/:director_id",(req,res)=>{
    const {director_id}=req.params
    const promise =Director.aggregate([
        {
          $match:{
              "_id":mongoose.Types.ObjectId(director_id)
          }
        },
        {
            $lookup:{
                from:"movies",
                localField:"_id",
                foreignField:"director_id",
                as:"movies"
            }
        },
        {
            $unwind:{
                path:"$movies",
                preserveNullAndEmptyArrays:true // filmi olmayan directorlerde getirilir bu olmadan sadece filmi olanlar getirilir
            }
        },
        {
            $group:{
                _id:{
                    _id:"$_id",
                    name:"$name",
                    surname:"$surname",
                    bio:"$bio"
                },
                movies:{
                    $push:"$movies"
                }
            }
        },
        {
            $project:{
                _id:"$_id._id",
                name:"$_id.name",
                surname:"$_id.surname",
                bio:"$_id.bio",
                movies:"$movies"
            }
        }

    ])

    promise
        .then(data=>{
            res.json(data)
        })
        .catch(err=>{
            res.json(err)
        })

})



module.exports=router;
