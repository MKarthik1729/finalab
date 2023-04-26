const express = require('express')
const cors =  require('cors')
const rfs = require('rotating-file-stream')
const morgan = require('morgan')
const helmet = require("helmet");
const bodyParser = require("body-parser");
const multer = require('multer')
const path = require('path')
const app = express()

const storageEngine = multer.diskStorage({
    destination: "./images",
    filename: (req, file, cb) => {
    cb(null, `${Date.now()}--${file.originalname}`);
    },
    });

    const upload = multer({
        storage: storageEngine,
        });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(helmet())
const logStream = rfs.createStream("storage.log", {
    interval: "1d",
    path: path.join(__dirname, "logs"),
  });
  app.use(morgan("combined", { stream: logStream, immediate: true}));

var data = []

app.post('/',upload.single('file'),(req,res)=>{
    console.log(req.file)
    // res.send(req)
    const trail = req.body
    console.log(req.body)
    data = [...data,{
        name : req.body.name,
        phone : req.body.phone,
        email : req.body.email,
        img : req.file.filename
    }]
    res.send(req.body)
})

app.get('/',(req,res)=>{
    res.send(data)
})

app.get('/:id(*)',(req,res)=>{
    console.log(req.params.id)
    // // res.sendFile(`./images/${req.params.id}`)
    // fs.readFile(`./images/${req.params.id}`, 'utf8', function(err, data){
    //     if(err){
    //       res.end(404);
    //     }
    //     res.send(data)    
    //   });
    let fileLocation = path.join(__dirname,'images', req.params.id);
    //res.send({image: fileLocation});s
    res.sendFile(`${fileLocation}`)
    // res.sendFile(`./images/${req.params.id}`)
})

app.listen(3300,()=>{
    console.log('Listening to port 3300')
})