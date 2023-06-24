const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute= require("./routes/posts");
const categoryRoute= require("./routes/categories");
const multer= require('multer');
const cors = require('cors');


//The packge lock json changed

dotenv.config();
app.use(express.json());
app.use(cors());

app.use(cors({
   origin: 'http://localhost:3000', // Allow requests from this origin
   optionsSuccessStatus: 200 // Return a 200 status code for successful preflight requests
 }));
 


 mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
 }).then(console.log(" Mongo db connected"))
   .catch((err)=>
console.log(err)
 )

 //File Upload storage
const storage = multer.diskStorage({
   destination:(req,file,cb)=>{
  cn(null,"images");
   },
   filename:(req, file, cb)=>{
   cn(null,"hello.jpeg");
   }
})

const upload = multer({storage : storage});
app.post("/api/upload",upload.single("file"),(req,res)=>{
  res.status(200).json("File has been uploaded");
})

 
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts",postRoute);
app.use("/api/categories",categoryRoute)

app.listen("5000",()=>{
    console.log("backend is running")
})