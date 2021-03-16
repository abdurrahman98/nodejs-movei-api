const mongoose=require("mongoose")

const Schema =mongoose.Schema;


const MovieSchema  = new Schema({
    title:{
        type:String,
        required:[true,"`{PATH} alanı zorunludur`"],
        maxlength:[15,"`{PATH} alanı (`{VALUE}`) , (15) karakterden küçük olmalıdır`"],
        minlength:[3,"``{PATH} alanı (`{VALUE}`), (3) karakterden büyük olmalıdır"]
    },
    category:String,
    country:String,
    year:Number,
    imdb_score:Number,
    director_id:mongoose.Types.ObjectId,
    createdAt:{
        type:Date,
        default:Date.now
    }

})

module.exports=mongoose.model("movie", MovieSchema)