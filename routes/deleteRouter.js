const {Router}=require("express")
const deleteRouter=Router()
const con=require("./db")

deleteRouter.post("/",async(req,res)=>{
const {file_id}=req.body
try{
await con.query(`DELETE FROM uploads where file_id=$1`,[file_id])
res.redirect("/")
}catch(e){
    res.redirect("/")
}
})

module.exports=deleteRouter