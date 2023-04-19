const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const env = require('dotenv')
const multer = require('multer')

const userRouter = require('./routes/user')
const authRouter = require('./routes/auth')
const blogRouter = require('./routes/blog')
const categoryRouter = require('./routes/category')
const path = require('path')
//connect mongobd
mongoose.connect('mongodb://127.0.0.1:27017/blog_halo',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=>{
    console.log('connect mongoose success')
})
.catch((error)=>{
    console.log('connect mongoose faild')
})


env.config()
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())


app.use('/images', express.static(path.join(__dirname, "/images")))

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'images')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
  })
   
  var upload = multer({ storage: storage })

app.post('/api/upload', upload.single("file"), (req,res)=> {
    res.status(200).json('Upload image success')
})

app.use('/api/user',userRouter)
app.use('/api/auth',authRouter)
app.use('/api/blog',blogRouter)
app.use('/api/category', categoryRouter)

    
app.listen(process.env.PORT, ()=>{
    console.log('Server run on port '+ process.env.PORT)
})