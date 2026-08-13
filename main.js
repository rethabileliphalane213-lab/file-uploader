const express=require("express")
const app=express()
const path=require("node:path")

app.use(express.urlencoded({extended:true}))
app.set("views",path.join(__dirname,"views"))
app.set("view engine","ejs")

app.get("/",(req,res)=>{
    res.send("hello world")
})


const port=process.env.PORT ||8000

app.listen(port,()=>{
    console.log("port is running on",port)
})


