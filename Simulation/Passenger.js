import {stopOvers} from "./StopOvers.js"
export class Passenger{
    constructor(stopOver,id){
        this.interestStopOver =stopOver;
        this.id = id;
        this.toleranceSec = 0;
    }
    AddSecToTolerance(){
        this.toleranceSec++;}
}
export function AddSecTol(){
    for (let stopOver of stopOvers.values()) {
        if(!stopOver.PassengersIndexes) continue;
        let len = stopOver.PassengersIndexes.length;
        for (let index = 0; index < len; index++) {
            
            if(passengers.get(stopOver.PassengersIndexes[index]).toleranceSec >= 3600){ 
                passengers.delete(stopOver.PassengersIndexes[index]);
                //console.log("Deleted", stopOver.PassengersIndexes[index]);
                stopOver.PassengersIndexes.splice(index, 1);
                index--;
                len--;
                continue;}
            else {
                passengers.get(stopOver.PassengersIndexes[index]).AddSecToTolerance();
            }
        }
      }
    }
export let passengers = new Map();
export let PassengerIndex=0;
export function incIndex(){PassengerIndex++;}
