const express=require("express")
const app=express()
const path=require("node:path")
const session=require("express-session")
const passport=require("passport")
const localStrategy=require("passport-local").Strategy
const bcrypt=require("bcryptjs")



const homeRouter=require("./routes/homeRoute")
const signin=require("./routes/signinRuter")
const login=require("./routes/loginRouter")
const logout=require("./routes/logoutRouter")
const con=require("./routes/db")
const upload=require("./routes/uploadRouter")
const deletee=require("./routes/deleteRouter")
const { log } = require("node:console")


app.use("/upload", express.static(path.join(__dirname, "upload")));
app.use(express.static(path.join(__dirname,"public")))

app.use(express.urlencoded({extended:true}))
app.set("views",path.join(__dirname,"views"))
app.set("view engine","ejs")
app.use(session({
    secret:"file-uploader",
    resave:false,
     saveUninitialized:false
}))


app.use(passport.initialize())
app.use(passport.session())

app.use("/",homeRouter)
app.use("/signin",signin)
app.use("/login",login)
app.use("/upload",upload)
app.use("/delete",deletee)
app.use("/logout",logout)


passport.use(new localStrategy({usernameField:"email"},async(email,password,done)=>{
try{
const {rows}=await con.query("SELECT * FROM users WHERE email=$1",[email])
const emailFound=rows[0]
if(!emailFound){
    return done(null,false,{error:"Incorrect Email"})
}

const passwordMatch=await bcrypt.compare(password,emailFound.password)
if(!passwordMatch){
    return done(null,false,{error:"Incorrect Password"})
}
return done(null,emailFound)

}catch(error){
    return done(error)
}
}))



passport.serializeUser((user,done)=>{
    return done(null,user.user_id)
})
passport.deserializeUser(async(id,done)=>{

    try{
 const {rows}=await con.query("SELECT * FROM users WHERE user_id=$1",[id])
 const user=rows[0]
 done(null,user)
    }catch(error){
        done(error)
    }
})


const port=process.env.PORT ||8000

app.listen(port,()=>{
    console.log("port is running on",port)
})


