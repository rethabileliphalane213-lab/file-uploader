const {Router}=require("express")
const logInRouter=Router()
const localStrategy=require("passport-local").Strategy
const passport=require("passport")
const con=require("./db")
const bcrypt=require("bcryptjs")





logInRouter.get("/",(req,res)=>{
    res.render("login")
})

logInRouter.post("/",(req,res,next)=>{
passport.authenticate("local",(error,user)=>{
    if(error){
        res.status(404).send("Internal error!Account not Found")
    }
    req.logIn(errr=>{
        if(errr){
            return next(errr)
        }
        return res.redirect("/")
    })
})
})

module.exports=logInRouter