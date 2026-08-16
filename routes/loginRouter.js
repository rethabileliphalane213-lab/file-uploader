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
passport.authenticate("local",{
    successRedirect:"/",
    failureRedirect:"/login",
    failureFlash:false
})(req,res,next)
})

module.exports=logInRouter