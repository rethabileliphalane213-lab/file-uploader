const {Router}=require("express")
const logInRouter=Router()
const localStrategy=require("passport-local").Strategy
const passport=require("passport")
const con=require("./db")
const bcrypt=require("bcryptjs")


new localStrategy({usernameField:"email"},async(email,password,done)=>{
try{
const {rows}=con.query("SELECT * FROM user WHERE email=$1",[email])
const emailFound=rows[0]
if(!emailFound){
    return done(null,false,{error:"Incorrect Email"})
}

const passwordMatch=await bcrypt.compare(password,emailFound.password)
if(!passwordMatch){
    return done(null,false,{error:"Incorrect Password"})
}
return done(null,user)

}catch(error){
    return done(error)
}
})

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