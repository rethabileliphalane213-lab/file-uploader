const express=require("express")
const app=express()
const path=require("node:path")
const session=require("express-session")

app.use(express.urlencoded({extended:true}))
app.set("views",path.join(__dirname,"views"))
app.set("view engine","ejs")
app.use(session({
    secret:"file-uploader",
    resave:false,
     saveUninitialized:false
}))

app.get("/",(req,res)=>{
   res.render('home')
})


const port=process.env.PORT ||8000

app.listen(port,()=>{
    console.log("port is running on",port)
})


