const express=require("express")
const app=express()
const path=require("node:path")
const session=require("express-session")

const homeRouter=require("./routes/homeRoute")
const signin=require("./routes/signinRuter")

app.use(express.urlencoded({extended:true}))
app.set("views",path.join(__dirname,"views"))
app.set("view engine","ejs")
app.use(session({
    secret:"file-uploader",
    resave:false,
     saveUninitialized:false
}))

app.use("/",homeRouter)
app.use("/signin",signin)


const port=process.env.PORT ||8000

app.listen(port,()=>{
    console.log("port is running on",port)
})


