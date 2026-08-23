const {Router}=require("express")
const uploadRouter=Router()
const multer=require("multer")
const upload=multer({dest:"upload"})
const con=require("./db")


uploadRouter.post("/",upload.single("file"),async(req,res,next)=>{
    const file=req.file
    console.log(file)
    console.log(req.user)
try{
await con.query(`INSERT INTO uploads(file_name,file_size,user_id)VALUES($1,$2,$3)`,[file.originalname,file.size,req.user.user_id])
res.redirect("/")
}catch(e){

res.redirect("/")
console.log(`an error occured while storing your file info inthe uploads table.fix it by checking ${e}`)
}


})

module.exports=uploadRouter