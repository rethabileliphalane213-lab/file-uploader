const {Router}=require("express")
const homeRouter=Router()
const multer=require("multer")
const fs=require("fs")
const upload=multer({dest:"upload"})

homeRouter.get("/",(req,res)=>{
    res.render("home",{user:req.user})
})

module.exports=homeRouter