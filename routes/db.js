const {Pool}=require("pg")


const con=new Pool({
    password:"rethabilenongs",
    database:"file-uploader",
    port:5432,
    host:"localhost",
    user:"postgres"
})


con.connect().then(()=>{
    console.log("connected to Database")
}).catch((error)=>{
    console.log(`failed to connect to database.......check ${error}`)
})
module.exports=con