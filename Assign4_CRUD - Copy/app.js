const express=require('express');
const mongoose=require('mongoose');
const productRouter=require('./routes/productRouter');
// mongoDB connection URI in localDB
const CONNECTION_URL="mongodb://localhost:27017/assign_4";
const PORT=9999;

const app=express();//express app instance
app.use(express.json());//json middleware to parse the req body in json
app.use(express.urlencoded({extended:false}));//encoding the url

app.use("/",productRouter);//serving product routes

mongoose.connect(CONNECTION_URL,(err)=>{
    if (err) throw err;
    console.log("Connected with MongoDB");
});//establishing a connection with DB 

app.set("view engine","ejs");//setting a view engine 

app.use("*",(req,res)=>{
    res.status(404).render("404");
});//setting error for unwanted request

app.listen(PORT,(err)=>{
    if(err) throw err;
    console.log(`Listening on ${PORT}`);
});//running a server on localhost:port