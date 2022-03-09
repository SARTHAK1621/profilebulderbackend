const express = require("express");
const cors = require("cors");
const app = express();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const mongoose=require("mongoose");
const url="mongodb+srv://sarthak:sarthak1621@cluster0.uw8ui.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
// mongoose.connect(url,{useUnifiedTopology:true,useNewUrlParser:true},((res)=>{console.log(res+"yyyy")}));

const User = require("./models/User");

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, 
    ((err, res) => {
        if(res) console.log("************" + res)
        console.log(err)

    })
)
    


app.use(express.json());
app.use(cors());
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
});

app.post("/login", async (req, res) => {
    console.log(req.body.id, req.body.password);
    // const u=User.find({userid:"sarthak"})
    // console.log(u)
    User.find({userid:req.body.id},function(err,users)
    {
        //console.log(users);
        if(users.length==0)
        {
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

app.listen(3000, () => {
    // const newUser = new User({ name: '1' });
    // newUser.save()
    // .then(d => console.log(d))
    // console.log("_______");
    // User.find({_id: "621b119e3180212a2ddc0fcb"})
    // .select("name")
    // .then((d) => console.log(d));


    console.log("running")});