const {Router}=require("express")
const signinRouter=Router()
const {PrismaClient}=require("@prisma/client")
const bcrypt=require("bcryptjs")


const prisma=new PrismaClient()

signinRouter.get("/",(req,res)=>{
    res.render("signin")
})


signinRouter.post("/",async(req,res)=>{
const {name,email,password,confirm}=req.body
if(password !==confirm){
   res.render("signIn",{error:"Passwords Must Both Match"}) 
}
const emailUsed=await prisma.users.findFirst({where:{email}})

if(emailUsed){
    res.render("signIn",{error:"email is already in Use"}) 
}
const hashPassword=bcrypt.hash(password,10)
await prisma.user.create({
    data:{
        name:name,
        email:email,
        password:hashPassword
    }
})
res.render("home")
})

module.exports=signinRouter