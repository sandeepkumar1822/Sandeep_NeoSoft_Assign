const express=require('express');
const router=express.Router();
const {registration,login}=require('../controllers/users');

router.get("/",(req,res)=>{
    res.render("user");
})

router.get("/login",(req,res)=>{
    res.render("login")
})

router.get("/registration",(req,res)=>{
    res.render("registration")
})

router.get("/welcome/:emailid",(req,res)=>{
    const {emailid}=req.params;
    // const emailId=req.params.emailid;
    res.render("welcome",{data:emailid})
})

router.post("/postData",registration);

router.post("/login",login);

module.exports=router;