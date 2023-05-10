import {minibus} from "./minibusClass.js";
import UserModel from '../models/User.js';
import { TimeTravel } from "./simulation.js";
class Driver extends minibus{
    constructor(busId,driverId){
        super(busId);
        this.driverId = driverId;
    };
};
export const Drivers=[];
let OnceStart = false;
export async function  InitTimeTravel(req,res){
    try {
        if(OnceStart){ res.status(400).json({
            message: "Уже запущена симуляция",
        });
        return;
        }
        const users = await UserModel.find();
        if(!users){
            return res.status(404).json({
                message: "Пользователи не найдеы",
            });
        }
        await users.forEach(function(user){
           // console.log(user._doc.busId, user._id);
            Drivers.push(new Driver(user._doc.busId, user._id));
        });
        TimeTravel();
        //console.log(Drivers);
        //res.json({users});
        OnceStart = true;
        res.status(200).json({
            message: "Всё ок по симуляции",
        });
    }
     catch (err) {
        console.log(err);
         res.status(500).json({
            message: "Нет доступа",
        });
    }
}
