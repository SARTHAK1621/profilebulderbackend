const {default:mongoose}=require("mongoose")
const skillSchema=new mongoose.Schema({
    userid:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    expertise:{

    }
})
module.exports=new mongoose.model("Skills",skillSchema)