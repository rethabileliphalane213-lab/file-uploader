const {Pool}=require("pg")
require("dotenv").config()
console.log(process.env.DATABSE)
const con=new Pool({
  connectionString:process.env.DATABASE
})


con.connect().then(()=>{
    console.log("connected to Database")
}).catch((error)=>{
    console.log(`failed to connect to database.......check ${error}`)
})
module.exports=con