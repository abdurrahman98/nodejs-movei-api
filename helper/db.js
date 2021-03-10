const mongoose =require("mongoose")

module.exports = () =>{
    mongoose.connect("mongodb+srv://abdurrahman:Apo-19031998@example.kw79b.mongodb.net/nodejs", {useNewUrlParser:true,useUnifiedTopology: true})
    mongoose.connection.on("open",()=>{
        console.log("MONGODB connected")
    })
    mongoose.connection.on("error",()=>{
        console.log("MONGODB error")
    })
    mongoose.Promise=global.Promise;
}