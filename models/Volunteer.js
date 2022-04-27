const {default:mongoose}=require("mongoose");
const volunteerSchema=new mongoose.Schema({
    userid:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    period:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }
})
module.exports=new mongoose.model("Volunteer",volunteerSchema);