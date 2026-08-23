const {Router}=require("express")
const logoutRouter=Router()


logoutRouter.get("/",(req,res,next)=>{
    req.logOut((error)=>{
        if(error){
            return next(error)
        }
        res.redirect("/")
    })
})


module.exports=logoutRouter