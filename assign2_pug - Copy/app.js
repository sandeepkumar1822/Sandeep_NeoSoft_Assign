const express=require('express');
const fs=require('fs');
const app = express();
const PORT=4000;
app.set('view engine', 'pug');
app.set('views','./views');
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use("/static", express.static("public"));
const path = require('path')
app.use('/static', express.static(path.join(__dirname, 'public')))
//define routes
app.get("/",(req,res)=>{
    res.render("firstview")
})
app.get("/about_us",(req,res)=>{
    res.render("about_us")
})
app.get("/gallary",(req,res)=>{
    res.render("Gallary")
})
app.get("/services",(req,res)=>{
    res.render("Services")
})
app.get("/contact",(req,res)=>{
    res.render("Contact")
})
app.get("/contact_details",(req,res)=>{
    res.render("contact_details")
})
app.get("/home",(req,res)=>{
    res.render("home")
    })
app.post("/contactData",(req,res)=>{
    let email=req.body.email;
    let name=req.body.name;
    let phone=req.body.phone;
    let date=req.body.date;
    let time=req.body.time;
    let area=req.body.area;
    let city=req.body.city;
    let state=req.body.state;
    let data=(`<tr>
    <td>${email}</td>
    <td>${name}</td>
    <td>${phone}</td>
    <td>${date}</td>
    <td>${time}</td>
    <td>${area}</td>
    <td>${city}</td>
    <td>${state}</td>
    `)
    var data2=data.toString();
    if(fs.existsSync(`./user`)){
        fs.appendFileSync(`./user/detail.pug`,`${data2}`)
        res.render('Contact_Details');
    }

    else{
        fs.mkdirSync(`./user`)
        fs.writeFileSync(`./user/detail.pug`,`${data2}`)
         res.render('Contact_Details');
    }

})


app.listen(PORT,(err)=>{
    if(err)throw err;
    else console.log(`listening on port ${PORT}`)

})


