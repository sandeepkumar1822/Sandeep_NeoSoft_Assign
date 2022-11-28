const express=require('express');
const exphbs=require('express-handlebars');
const PORT=7711;
const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));

const mainRoutes=require('./routes/mainRoutes');
const userRoutes=require('./routes/userRoutes');

app.engine('handlebars',exphbs.engine());
app.set('view engine','handlebars');
app.set('views','./views');


app.use("/",mainRoutes);
app.use("/user",userRoutes);
app.use("*",(req,res)=>{
    res.status(404).render("404")
})


app.listen(PORT,(err)=>{
    if(err) throw err;
    console.log(`listening on :${PORT}`);
})