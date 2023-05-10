import express from 'express';
import multer from 'multer';
import mongoose from 'mongoose';
import {registerValidator,loginValidator}  from './validation/validation.js';
import {UserController} from './controllers/index.js';
import {checkAuth,handleValidationErrors} from './utils/index.js';
import {InitTimeTravel} from './Simulation/drivers.js'
import bodyParser from 'body-parser';
import cors from 'cors';
const port = process.env.PORT || 5000;
mongoose
.connect("mongodb+srv://karagodindanik:123@cluster0.yuta3v9.mongodb.net/Drivers?retryWrites=true&w=majority")
.then(() =>{
    console.log("DB OK");
})
.catch((err) =>{ console.log("DB ERROR",err);})
const app = express();
/*
app.get('/', (req, res) => {
    res.send("11222 Hello, world!");
});
*/
const storage = multer.diskStorage({
    destination: (__,_,cb) => {
        cb(null,'uploads');
    },
    filename: (__,file,cb) =>{
        cb(null,file.originalname);
    },
});
const upload = multer({storage});
app.post('/upload',checkAuth, upload.single('image'), (req,res) =>{
    res.json({
        url: `/uploads/${req.file.originalname}`,
    });
});
app.use(express.json());
app.use(bodyParser.json());
app.use('/uploads',express.static('uploads'));
app.use(cors());
/*
app.post('/auth/login', (req, res) => {
    console.log(req.body);
    const token = jwt.sign({
        email: req.body.email,
        fullname: 'Вася Пупкин',
    },'secret123');
    res.json({
    success: true,
    token,
});
});
*/
app.get('/init',InitTimeTravel);
app.get('/auth/me',checkAuth,UserController.getMe);
app.get('/info',checkAuth,UserController.getInfo);
app.post('/set/time',checkAuth,UserController.NewTime);
app.post('/set/koef',checkAuth,UserController.NewKoef);
app.post('/auth/login',loginValidator,handleValidationErrors,UserController.login);
app.post("/auth/register",registerValidator,handleValidationErrors,UserController.register);

app.listen(port,(err)=>{
    if(err){
        return console.log(err);
    }
    console.log("Server OK");


});