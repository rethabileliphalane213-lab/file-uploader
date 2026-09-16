const {Router}=require("express")
const signinRouter=Router()

const bcrypt=require("bcryptjs")
const con=require("./db")

signinRouter.get("/",(req,res)=>{
    res.render("signin")
})


signinRouter.post("/",async(req,res)=>{

try{

const {name,email,password,confirm}=req.body


if(password !== confirm){
   return res.render("signin",
   {error:"Passwords Must Both Match"})
}


const findEmail=await con.query(
"SELECT * FROM users WHERE email=$1",
[email]
)


const emailUsed=findEmail.rows[0]


if(emailUsed){
    return res.render("signin",
    {error:"Email is already in Use"})
}


const hashPassword=await bcrypt.hash(password,10)


const newUser=await con.query(
`INSERT INTO users(name,email,password)
VALUES($1,$2,$3)
RETURNING *`,
[name,email,hashPassword]
)


const user=newUser.rows[0]


req.login(user,(error)=>{

    if(error){
        return res.render("signin",
        {error:"Failed to sign in please try again"})
    }

    return res.redirect("/")
})


}catch(error){

console.log(error)

return res.render("signin",
{error:"Something went wrong"})

}

})


module.exports=signinRouter