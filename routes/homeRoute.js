const {Router}=require("express")
const homeRouter=Router()
const multer=require("multer")
const fs=require("fs")
const upload=require({dest:"uploads"})

homeRouter.get("/",(req,res)=>{
    res.render("home",{user:req.user})
})

module.exports=homeRouter