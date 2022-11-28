const fs=require('fs');

const registration=((req,res)=>{
    const {fullname,emailId,password,contactNum,cityName}=req.body;
    let data=
`${fullname},${emailId},${password},${contactNum},${cityName}`

    if(fs.existsSync(`./userData/${emailId}.txt`)){
        res.render("registration",{errMsg:"Email already exist"})
    }
    else{
        fs.writeFile(`./userData/${emailId}.txt`,data,(err)=>{
            if(err){
                res.render("registration",{errMsg:"Something went Wrong"})   
            }else{  
                res.redirect("/user/welcome/"+emailId);
            }
        })
    }
})

const login=((req,res)=>{
    const {emailId,password} = req.body;

    if(!(fs.existsSync(`./userData/${emailId}.txt`))){
        res.send("Email not found");
    } else{
       let data = fs.readFileSync(`./userData/${emailId}.txt`,"utf8").toString()
       let newdata=data.split(",");
       if(password==newdata[2]){
        res.send("successfully login");

       }else{
        res.send("Wrong password")
       }


    }
})


module.exports={
    registration,login
}