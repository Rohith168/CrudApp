const mongoose = require('mongoose');
const express = require('express');
const cors=require("cors")
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
require('./db/conn');
// const User = require('./model/userSchema');

app.use(express.json());
app.use(cors({
    origin:"http://localhost:3000"
}))
// we link the router files to make our route easy 
app.use(require('./router/auth'));


app.get('/',(req,res) =>{
res.send("hello from server")
})
app.listen(8080,()=>
{
    console.log("server is listening on port 8080");
})