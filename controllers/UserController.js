import jwt from 'jsonwebtoken';
import UserModel from '../models/User.js';
import bcrypt from 'bcrypt';
import {GiveBaseInfo, GiveNewInfo} from "../Simulation/minibus.js"
import {TimeGetter} from "../Simulation/simulation.js"
export const register = async (req,res) => {
    try {
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const Hash = await bcrypt.hash(password, salt);
    const doc=new UserModel({
        email: req.body.email,
        FullName: req.body.FullName,
        avatarUrl: req.body.avatarUrl,
        busId: req.body.busId,
        passwordHash: Hash
    });
    const user = await doc.save();
    const token = jwt.sign({
        _id: user._id,
    },"service123",{
        expiresIn: '30d',
    });
    const {passwordHash, ...userData} = user._doc;
    res.json({
        ...userData,
        token,
    });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не удалось зарегестрироваться",
        });
    }};
export const NewKoef = async (req, res) => {
    try{
   await TimeGetter().SetKoef(req.body.koef);
   return res.status(200).json({
    message: "Удалось изменить коеффициент",
   })
    } catch (err) {
    console.log(err);
    res.status(500).json({
        message: "Не удалось изменить коеффициент",
    });
}
};
export const NewTime = async (req, res,) => {
    try{
        await TimeGetter().SetTime(req.body.hours, req.body.minutes, req.body.seconds);
        return res.status(200).json({
         message: "Удалось изменить время",
        })
         } catch (err) {
         console.log(err);
         res.status(500).json({
             message: "Не удалось изменить время",
         });
     }
}
export const login =  async (req, res) => {
    try {
       // console.log(req.body);
        const user = await UserModel.findOne({email: req.body.email});
        if(!user){
            return res.status(404).json({
                message: "Пользователь не найден",
            });
        }
        const isValidPass = await bcrypt.compare(req.body.password,user._doc.passwordHash);
        if(!isValidPass){
            return res.status(404).json({
                message: "Неверный логин или пароль",
            });
        }
        const token = jwt.sign({
            _id: user._id,
        },"service123",{
            expiresIn: '30d',
        });
        const {passwordHash, ...userData} = user._doc;
        const InfoBus = GiveBaseInfo(user._id);
res.json({
    ...userData,
    token,
    InfoBus,
});
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не удалось авторизоваться",
        });
    }
};
export const getMe =  async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId);
        if(!user){
            return res.status(404).json({
                message: "Пользователь не найден",
            });
        }
        const token = jwt.sign({
            _id: user._id,
        },"service123",{
            expiresIn: '30d',
        });
        const {passwordHash, ...userData} = user._doc;
        const InfoBus = GiveBaseInfo(user._id);
        res.json({
            ...userData,
            token,
            InfoBus,});
    } catch (err) {
        console.log(err);
         res.status(500).json({
            message: "Нет доступа",
        });
    }
};
export const getInfo = async (req, res) => {
    try {
        const Info = await GiveNewInfo(req.userId);
        res.json({
            Info,
        });
    } 
    catch (err) {
        console.log(err);
         res.status(500).json({
            message: "Ошибка на сервере",
        });
    }
};