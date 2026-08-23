const {Router}=require("express")
const signinRouter=Router()

const bcrypt=require("bcryptjs")
const con=require("./db")



signinRouter.get("/",(req,res)=>{
    res.render("signin")
})


signinRouter.post("/",async(req,res)=>{
const {name,email,password,confirm}=req.body
if(password !==confirm){
   res.render("signIn",{error:"Passwords Must Both Match"}) 
}
//const emailUsed=await prisma.users.findFirst({where:{email}})
const findEmail=await con.query("SELECT * FROM users WHERE email=$1",[email])

const emailUsed=findEmail.rows[0]
if(emailUsed){
    res.render("signIn",{error:"email is already in Use"}) 
}
const hashPassword=await bcrypt.hash(password,10)
await con.query(`INSERT INTO users(name,email,password)VALUES($1,$2,$3)`,[name,email,hashPassword])

////////////////////////////////////////////Prisma Connection//////////////////////////////////////////////////
/*await prisma.user.create({
    data:{
        name:name,
        email:email,
        password:hashPassword
    }
})*/
//////////////////////////////////////////////////////////////////////////////////////////////////////////
res.render("home",{succes:"Account created"})
})

module.exports=signinRouter