const {default:mongoose}=require("mongoose")
const educationSchema=new mongoose.Schema({
    userid:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    specialisation:{
        type:String,
        required:true
    },
    duration:{
        type:String,
        required:true
    },
    grade:{
        type:String,
        required:true
    }

})
module.exports=new mongoose.model("Education",educationSchema);
