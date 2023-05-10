import { passengers } from "./Passenger.js";
import {TimeGetter} from "./simulation.js"
import {OutputAndInputStopOver} from "./StopOvers.js"
import { Drivers } from "./drivers.js";
import { stopOvers } from "./StopOvers.js";

export let minibuses=[]; 
export function WorkInit(time){
    minibuses = Drivers;
    minibuses.forEach(minbus => {
        IsNeedToWork(minbus,time);
        
       // GetInfoForBus(minbus);
    })
    
}
function AddMinBreak(minbus){
    minbus.breaking_in_min++;
    if(minbus.breaking_in_min === 10){
        minbus.breaking_in_min = 0;
        minbus.is_breaking = false;
    }
}

export function GiveBaseInfo(driverId){
    const time = TimeGetter();
    let minibus;
   // console.log(minibuses);
   let stopOverssizes = [];
    minibuses.forEach(minbus => {

        if(minbus.driverId.equals(driverId)){
            //console.log("Luck");
        const {driverId,...minibuse} = minbus;
        //console.log(minibuse);
        minibuse.currentPath.forEach(path => {
            stopOverssizes.push(stopOvers.get(path).PassengersIndexes.length);
        });
        minibus=minibuse;
        //console.log(minibus);
    }
});
    return [time,minibus,stopOverssizes];
} 
export function GiveNewInfo(driverId){
    //console.log(driverId);
    const time = TimeGetter();
    let minibus;
    let stopOverssizes = [];
    // console.log(minibuses);
    minibuses.forEach(minbus => {
            //console.log(minbus.driverId, driverId);
         if(minbus.driverId.equals(driverId)){
             //console.log("Luck");
         const {driverId,path,path_rec,timestart,timeend,...minibuse} = minbus;
         
            minibuse.currentPath.forEach(path => {
            stopOverssizes.push(stopOvers.get(path).PassengersIndexes.length);
        });
         minibus=minibuse;
         //console.log(minibus,stopOverssizes);
     }
    });
    return [time,minibus,stopOverssizes];
}
function IsNeedToWork(minbus,time){
    if(minbus.timestart <= time.ToMinutes() && time.ToMinutes() < minbus.timeend){minbus.is_sleeping=false; return true;}
    return false;
}
export function TryNextStopOver(time){
    console.log("--------------------------------------------------------");
    console.log(time.hours,time.minutes,time.seconds);
    console.log("TryNextStopOver");
    console.log("All Passengers", passengers.size);
    for (const minbus of minibuses) {
    if(minbus.is_breaking){ console.log(minbus.bus_id,"is_breaking");AddMinBreak(minbus);}
    if(minbus.is_sleeping){ console.log(minbus.bus_id,"is_sleeping");IsNeedToWork(minbus,time);}
    if(minbus.is_sleeping || minbus.is_breaking) continue;
    if(((time.ToMinutes() -  minbus.timestart)%10 === 0)){
        OutputAndInputStopOver(minbus,time);
    }
    }
  console.log("--------------------------------------------------------");
  ;
}


//minibuses.forEach(element => {
/*
    console.log(minibuses[10].bus_id);
    minibuses[10].currentPath.forEach(el => {
    GetInfoForBus(minibuses[10]);
    console.log("--------------------------------");
    OutputAndInputStopOver(minibuses[10]);
    console.log(minibuses[10].PassengersIndexes.length,minibuses[10].PassengersIndexes);
    console.log("--------------------------------");
    minibuses[10].indexStopOver++;
    });
*/
//});
