const express = require("express");
const cors = require("cors");
const app = express();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const mongoose=require("mongoose");
const url="mongodb+srv://sarthak:sarthak1621@cluster0.uw8ui.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
// mongoose.connect(url,{useUnifiedTopology:true,useNewUrlParser:true},((res)=>{console.log(res+"yyyy")}));


const formidable = require('formidable');

const  multipart  =  require('connect-multiparty');
const  multipartMiddleware  =  multipart({ uploadDir:  './uploads' });

const fs = require('fs');
const AWS = require('aws-sdk');
const s3 = new AWS.S3({
  accessKeyId: "AKIAXWO5KJIXW5V4CUM5",
  secretAccessKey: "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"
});



const User = require("./models/User");
const Info=require("./models/Info");
const Work=require("./models/Work");
const Volunteer=require("./models/Volunteer");
const Education=require("./models/Education");
const Skill=require("./models/Skills");
const { info } = require("console");


mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, 
    ((err, res) => {
        if(res) console.log("************" + res)
        console.log(err)

    })
)
    



app.use(express.json());
app.use(cors());

app.post('/uploadimage', multipartMiddleware, async (req, res) => {
    let re = (req.body.id);
    // re = JSON.stringify(re)
    console.log(re +  " --------" + typeof re)
    re = re.replaceAll("\"", "")
    console.log(re)
    const fileContent = fs.readFileSync(req.files.images.path)
    console.log(req.files);
    let name = (req.files.images.originalFilename)
    let path = fileContent
    let place="";
    let params = {
        Bucket: "sarthakimages",
        Key: name,
        Body: path
      }

      s3.upload(params, (err, data) => {
        if (err) {
          console.log(err)
        }
        place=data.Location;
        res.json(data.Location);
        console.log(place)
        Info.findOneAndUpdate({userid: re},{image:place},function(err,info){
            console.log(place)
            console.log(info);
        })
      })
      
    // Info.find({},function(err,info){
    //     console.log(info);
    // })

})

app.post("/test", async(req, res) => {
    console.log(req.body)
    
    Info.find({userid: req.body.id}, function(err,info){
        console.log(typeof req.body.id)
        if(err) {
            return res.send("errrrr")
        }
        res.send(info);
        
    })
})
// app.post("/uploadimage", async (req, res) => {
//     console.log("inside upload")
//     console.log(req.file)
//     console.log(req.files)
//     console.log(req.body)
//     res.json("ok")
// })


app.get("/", async (req, res) => {
    let data = " data from backend!";
    res.json(data);    
});

app.post("/register", async (req, res) => 
{
    // console.log(req.body.name,req.body.email,req.body.id,req.password);
    
    bcrypt.genSalt(saltRounds,function(err,salt){
        bcrypt.hash(req.body.password,salt,function(err,hash){
            // res.json("id is :"+req.body.id+"password is :"+req.body.password+"name is:"+req.body.name+"email is :"+req.body.email);
            const newUser = new User({ name:req.body.name,email:req.body.email,userid:req.body.id,password:hash });
            newUser.save()

        })
    }) 
    const newInfo=new Info({userid:req.body.id});  
    newInfo.save();    
});
app.post("/updateinfo",async(req,res)=>
{
    console.log(req.body.about);
    Info.findOneAndUpdate({userid: req.body.id},{about:req.body.about},function(err,info){
        console.log(info);
    })
})
app.post("/updatework",async(req,res)=>{
    //console.log(req.body);
    const newWork= new Work({userid:req.body.id,role:req.body.role,duration:req.body.duration,about:req.body.about,company:req.body.company})
    newWork.save();
    let r=await Work.find({userid:req.body.id})
    console.log(r)
})
app.post("/updateedu",async(req,res)=>{
    //console.log(req.body);
    const newEducation= new Education({userid:req.body.id,name:req.body.name,duration:req.body.duration,specialisation:req.body.specialisation,grade:req.body.grade})
    newEducation.save();
    let r=await Education.find({userid:req.body.id})
    console.log(r)
})
app.post("/updatevol",async(req,res)=>{
    //console.log(req.body);
    const newVolunteer= new Volunteer({userid:req.body.id,title:req.body.title,period:req.body.period,description:req.body.description})
    newVolunteer.save();
    let r=await Volunteer.find({userid:req.body.id})
    console.log(r)
})
app.post("/updateskill",async(req,res)=>{
    //console.log(req.body);
    const newSkill= new Skill({userid:req.body.id,name:req.body.name,expertise:req.body.expertise})
    newSkill.save();
    let r=await Volunteer.find({userid:req.body.id})
    console.log(r)
})

app.post("/login", async (req, res) => {
    console.log(req.body.id, req.body.password);
    // const u=User.find({userid:"sarthak"})
    // console.log(u)
    User.find({userid:req.body.id},function(err,users)
    {
        //console.log(users);
        if(users.length==0)
        {
           // res.cookie("bad cred", {sameSite: 'strict',
            //httpOnly: true});
            console.log("wrong credentials");
        }
        else{
            if(!err)
            {
                bcrypt.compare(req.body.password,users[0].password, function(err, result) 
                {
                    res.json(result);
                });
            }
        }
        
    })
    

});

app.post("/info", async(req, res) => {
    let id = (req.body.userId)
    let r = await Info.find({userid: id})
    console.log(r[0].about)
    res.send(r[0])
})
app.post("/work", async(req, res) => {
    let id = (req.body.userId)
    let r = await Work.find({userid: id})
    console.log(r)
    res.send(r)
})
app.post("/vol",async(req,res)=>{
    let id=req.body.userId;
    let r=await Volunteer.find({userid:id})
    console.log(r)
    res.send(r)
})
app.post("/education",async(req,res)=>{
    let id=req.body.id;
    let r=await Education.find({userid:id})
    console.log(r)
    res.send(r)
})
app.post("/skill",async(req,res)=>{
    let id=req.body.id;
    let r=await Skill.find({userid:id})
    console.log(r)
    res.send(r)
})



app.listen(3000, () => {
    // const newUser = new User({ name: '1' });
    // newUser.save()
    // .then(d => console.log(d))
    // console.log("_______");
    // User.find({_id: "621b119e3180212a2ddc0fcb"})
    // .select("name")
    // .then((d) => console.log(d));


    console.log("running")});