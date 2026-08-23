const {Router}=require("express")
const homeRouter=Router()
const multer=require("multer")
const fs=require("fs")
const upload=multer({dest:"upload"})
const con=require("./db")

homeRouter.get("/",async(req,res)=>{
   
    if(!req.user){
       return  res.render("home",{user:null,files:[]}) 
    }
const {rows}=await con.query(`SELECT * FROM uploads WHERE user_id=$1`,[req.user.user_id])
if(!rows){
return  res.render("home",{user:req.user,file:[]})
}
   else{
    return  res.render("home",{user:req.user,files:rows})
   }
})

module.exports=homeRouter