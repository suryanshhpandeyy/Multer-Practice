const path = require("path");
const express = require("express");
const multer = require("multer");

const app = express()
const PORT = 4040;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage });

app.set("view engine","ejs")
app.set("views",path.resolve("./views"));
app.use(express.urlencoded({extended : false}))

app.use(express.json());

app.get("/", (req , res)=>{
    return res.render("home")
})

app.post("/upload",upload.single('file'), (req,res)=>{
    console.log(req.body);
    console.log(req.file);

    return res.redirect("/");
})

app.listen(PORT, () => console.log("Listed At Port 4040"))