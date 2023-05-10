import {Time} from "./time.js"
import {TryNextStopOver, WorkInit} from "./minibus.js"
import {GenerateOnStopOvers} from "./StopOvers.js"
import {AddSecTol} from "./Passenger.js"
const time = new Time(5,0,0,10);
export function TimeGetter(){
    return time;
}
function sleep(ms) {        
    return new Promise(resolve => setTimeout(resolve, ms)); }

export async function TimeTravel(){
        let newMinute = false;
            WorkInit(time);
            while(true){
                await sleep(1000/time.koef);
                newMinute = time.AddSecond();
                if(320<time.ToMinutes()<1380){
                GenerateOnStopOvers(time);
                if(newMinute){
                    TryNextStopOver(time);
                }
            }
                AddSecTol();
                //console.log(time.hours,time.minutes,time.seconds);
            }
    }
