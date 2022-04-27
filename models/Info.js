const { default: mongoose } = require("mongoose");
const infoSchema=new mongoose.Schema({
    userid:{
        type: String,
        required:true
    },
    image:
    {
        type: String,
        default:""
    },
    about:{
        type:String,
        default:""
    }
})
module.exports=mongoose.model("Info",infoSchema);