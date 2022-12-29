const express = require('express');
const router = express.Router();
const User = require("../model/Userschema")
const empdata=require("../model/Empschema")
const Jwt=require("jsonwebtoken")
const jwtkey="e-comm"
var collection;
router.get('/', (req, res) => {
    res.send(`Hello world from the server rotuer js`);
});


router.post('/register', async (req, res) => {
    const { name, email, password, cpassword } = req.body;
    // console.log(name,email);
    if (!name || !email || !password || !cpassword) {
        return res.status(422).json({ error: "please fill the Mandatory feilds" });
    }
    try {
        const userExist = await User.findOne({ email: email })
        if (userExist) {
            return res.status(422).json({ message: "user already exists" });
        }
        const user = new User({ name, email, password, cpassword });
        const userResponse = await user.save();
        if (userResponse) 
        { 
            Jwt.sign({userResponse},jwtkey,{expiresIn:"2h"},(err,token)=>{
                if(err)
                {
                    res.send("Something went wrong plz try again")
                }
                else{res.send({userResponse,auth:token})}
                
            })
            // res.status(201)({ message: "user created sucessfully" }); 
        }
        else {
            res.status(500).json({ message: "failed to register" })
        }
    } 
    catch (error) {
        console.log(error);
    }
    // const userlogin = await User.findOne({ email: email  })
    // if (!userlogin) {
    //     res.status(400).json({ error: "user not found" })
    // }
    // else {
    //     res.status(200).json({ message: "user signin sucessfully" })
    // }
});
router.post('/signin', async (req, res) => {
    const {  email, password } = req.body;
    // console.log(email,password);
    if (!email || !password ) {
        return res.status(422).json({ error: "please fill the Mandatory feilds" });
    }
const userlogin = await User.findOne({ email: email,password:password })
console.log(userlogin);
if (userlogin) {

    Jwt.sign({userlogin},jwtkey,{expiresIn:"2h"},(err,token)=>{
        if(err)
        {
            res.send("Something went wrong plz try again")
        }
        res.send({userlogin,auth:token})
    })
    // res.status(200).json({ message: "user signin sucessfully" })
}
else {
    res.status(400).json({ error:    "user not found" })
}
});
router.post('/employee', async (req, res) => {
    const { name, email, phone } = req.body;
    // console.log(name,email);
    if (!name || !email || !phone ) {
        return res.status(422).json({ error: "please fill the Mandatory feilds" });
    }
    try {
        const userExist = await empdata.findOne({ email: email })
        if (userExist) {
            return res.status(422).json({ message: "user already exists" });
        }
        const emp = new empdata({ name, email, phone });
        const userResponse = await emp.save();
        if(userResponse)
        {
            res.status(200).json({message:"user created sucessfully"})
        }
        else{
            res.status(500).json({error:"sometghing went wrong...!"})
        }
    } 
    catch (error) {
        console.log(error);
    }
});
// Fetching all the employees

router.get("/users",(req, res) => {
	empdata.find((err, foundEmployees) => {
		if (!err) {
			res.send(foundEmployees)
		} else {
			res.send(err);
		}
	})
})
router.get("/detail/users",async(req,res)=>{
    // console.log(req.params.id)
    // console.log(req.query);
    const result=await empdata.findById(req.query.id)
    // console.log(result);
   return res.send({empdata:result})
})
router.get("/navbar/users",async(req,res)=>{
    // console.log(req.params.id)
    // console.log(req.query);
    const result=await empdata.findById(req.query.id)
    // console.log(result);
   return res.send({empdata:result})
})

router.put("/navbar/users",(req,res)=>{
   
    let id=req.query.id
    let uname=req.body.name;
    let uemail=req.body.email;
    let uphone=req.body.phone;
    empdata.findByIdAndUpdate(id,{$set:{name:uname,email:uemail,phone:uphone}},{new:true},(err,data)=>{
if(data===null)
{
    res.send("nothing found")
}
else{
    res.send(data)
}
    })
})
router.delete("/navbar/users",async(req,res,next)=>{
    const result= await empdata.deleteOne({id:req.params.id}).then(result=>res.status(200).json({message:"delete sucessfull"}))
    // console.log(result);
})
function verifytoken(req,res,next)
{
    let token=req.headers["authorization"]
    if(token)
    {
   Jwt.verify(token,jwtkey,(err,valid)=>{
    if(err)
    {
        res.status(500).send({message:"Invalid token"})
    }
    else{
        next()
    }
   })
}
else{
    res.status(500).send({message:"plz send a valid token"})
}
}

module.exports = router;