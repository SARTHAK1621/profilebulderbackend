const {default:mongoose}=require("mongoose")
const workSchema=new mongoose.Schema({
    userid:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    },
    duration:{
        type:String,
        required:true
    },
    about:{
        type:String,
        required:true
    },
    company:{
        type:String,
        required:true
    }
})
module.exports=new mongoose.model("Work",workSchema)