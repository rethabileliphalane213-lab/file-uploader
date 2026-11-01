const { Router } = require("express")
const uploadRouter = Router()
const multer = require("multer")
const con = require("./db")

const storage = multer.diskStorage({
    destination: "upload",
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage })

uploadRouter.post("/", upload.single("file"), async (req, res) => {
    const file = req.file
   if (!file) {
    return res.redirect("/")
}

    console.log(file)
    console.log(req.user)

    try {
        await con.query(
            `INSERT INTO uploads(file_name, file_size, user_id)
             VALUES($1, $2, $3)`,
            [file.originalname, file.size, req.user.user_id]
        )

        res.redirect("/")
    } catch (e) {
        console.log(
            `An error occurred while storing your file info in the uploads table: ${e}`
        )

        res.redirect("/")
    }
})

module.exports = uploadRouter