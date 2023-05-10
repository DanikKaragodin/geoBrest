import {Passenger,passengers,PassengerIndex,incIndex} from "./Passenger.js";
import {Time} from "./time.js";
import {minibuses} from "./minibus.js"; 
class StopOver{
    constructor(SOname){
    this.PassengersIndexes=[];
    this.u = 840;
    this.disp = 26000;
    this.stopOverName=SOname;
    }

    TryToAddPassenger(time){
        const veroyatnost = (1/(Math.sqrt(this.disp*2*Math.PI)))
        *Math.exp(-(Math.pow((time.ToMinutes() - this.u),2)/(2*this.disp)));
        if(veroyatnost<Math.random()) return false;
        let minibus = minibuses[0];
        let tolerance =0;
        do {
            minibus = minibuses[Math.floor(Math.random()*(minibuses.length-1))];
            //console.log(minibus);
            tolerance++;
        } while (!minibus.currentPath.includes(this.stopOverName) && tolerance<100);
        if(tolerance !== 100){
        const startIndex =  minibus.currentPath.indexOf(this.stopOverName);
        passengers.set(PassengerIndex,
            new Passenger(minibus.currentPath[Math.floor(Math.random()*(minibus.currentPath.length-startIndex-2) + startIndex+1)],PassengerIndex));
        //console.log(passengers);
        this.PassengersIndexes.push(PassengerIndex);
        //console.log(passengers.get(PassengerIndex));
        incIndex();
        }
    }
    
}
export let stopOvers = new Map();
const AllStopOvers =
["«Санта Бремор»",
"«Сельхозтехника»",
"б-р Космонавтов",
"Брест-Западный",
"Брестская крепость",
"ВамРад",
"Вычулки",
"гост. «Дружба»",
"д.Бернады",
"д.Вистичи",
"д.Клейники",
"д.Ковердяки",
"д.Козловичи",
"д.Косичи",
"д.Курница",
"д.Скоки",
"д.Тюхиничи",
"д.Черни",
"Детская поликлиника №1",
"ДСУ",
"Каменица-Жировецкая",
"Катин Бор",
"кладбище Плоска",
"Ковельское шоссе",
"л. Морозова",
"ОАО «Агротранс»",
"ОАО «Брестский мясокомбинат»",
"ул.Смирнова",
"ул.Речицкая",
"ул.Ленина",
"ул.Мицкевича",
"ул.Комсомольская",
"пр-т Машерова",
"б-р Шевченко",
"ул.Махновича",
"ул.Мытная",
"Областная больница",
"Партизанский пр-т",
"ППВ",
"пр-т Республики",
"пригородный ж/д вокзал",
"с/т Заозёрное",
"строительный рынок",
"Тельмы",
"ТРЦ Варшавский",
"ул.17 Сентября",
"ул.28 Июля",
"ул.8-я Вересковая",
"ул.Автолюбителей",
"ул.Адамковская",
"ул.Акимочкина",
"ул.Аэродромная",
"ул.Белорусская",
"ул.Бориса Маслова",
"ул.Брестских Дивизий",
"ул.Вересковая",
"ул.Веселая",
"ул.Винника",
"ул.Вишневая",
"ул.Войкова",
"ул.Волгоградская",
"ул.Вульковская",
"ул.Вычулки",
"ул.Гаврилова",
"ул.Героев Обороны Брестской крепости (ГОБК)",
"ул.Гоголя",
"ул.Городская",
"ул.Грибоедова",
"Варшавское шоссе",
"Женский монастырь",
"ул.Ковельская",
"ул.Свято-Афанасьевская",
"Ковельское шоссе",
"ул.Жукова",
"ул.Гвардейская",
"ул.Рокосовского",
"ул.Суворова",
"ул.Луцкая",
"ул.Ленинградская",
"ул.Лактионова",
"ул.Гродненская",
"ул.Грюнвальдская",
"ул.Дворникова",
"ул.Дворцовая",
"ул.Дружная",
"ул.Дубровская",
"ул.Екельчика",
"ул.Защитников Отечества",
"ул.Зубачева",
"ул.К.Маркса",
"ул.Кижеватова",
"ул.Кирпичная",
"ул.Клейниковская",
"ул.Колесника",
"ул.Коммерческая",
"ул.Красногвардейская",
"ул.Краснознаменная",
"ул.Л-та Рябцева",
"ул.Молодогвардейская",
"ул.Московская",
"ул.Мошенского",
"ул.Орджоникидзе",
"ул.Орловская",
"ул.Пионерская",
"ул.Пригородная",
"ул.Пушкинская",
"ул.Республиканская",
"ул.Рябиновая",
"ул.Сальникова",
"ул.Сикорского",
"ул.Советская",
"ул.Советской Конституции",
"ул.Спортивная",
"ул.Старозадворская",
"ул.Стафеева",
"ул.Сябровская",
"ул.Т.Костюшко",
"ул.Томашовская",
"ул.Учительская",
"ул.Филатова",
"ул.Фортечная",
"ул.Фруктовая",
"ул.Шоссейная",
"ул.Южная",
"ул.Юбилейная",
"ул.Я.Купалы",
"ул.Ясеневая",
"ЦГБ",
"Центральный ж/д вокзал",];
AllStopOvers.forEach(element => {
    stopOvers.set(element,new StopOver(element));
});
 export function GenerateOnStopOvers(time){
    for(let entry of stopOvers.values()) {
        entry.TryToAddPassenger(time);
    }
};
 export function GetInfoForBus(minibus){
    for (let index = minibus.indexStopOver; index < minibus.currentPath.length; index++) {
        GenerateOnStopOvers(new Time(14,0,0,1));
        const StopOverPassengers = stopOvers.get(minibus.currentPath[index]).PassengersIndexes;
        console.log(`${minibus.currentPath[index]} - ${StopOverPassengers.length}`);
    }
};
 export function OutputAndInputStopOver(minibus,time){
    const stopOverstr = minibus.currentPath[minibus.indexStopOver];
    const stopOver = stopOvers.get(stopOverstr);
    let len = minibus.PassengersIndexes.length;
    //outout
    for (let index = 0; index < len; index++) {
        //console.log(index,len,passengers);
        if(passengers.get(minibus.PassengersIndexes[index]).interestStopOver !== stopOverstr) continue;
            console.log(`${minibus.bus_id} Output - ${stopOverstr}`);
            passengers.delete(minibus.PassengersIndexes[index]);
            minibus.PassengersIndexes.splice(index, 1);
            index--;
            len--;
    }
    //input
    len = stopOver.PassengersIndexes.length;
    for (let index = 0; index < len; index++) {
        if(minibus.PassengersIndexes.length == minibus.max_passengers) break;
        const passengerStopOver = passengers.get(stopOver.PassengersIndexes[index]).interestStopOver;
        if(minibus.currentPath.findIndex((element)=> element === passengerStopOver) <
         minibus.currentPath.findIndex((element)=> element === stopOverstr) ) continue;
        console.log(`${minibus.bus_id} Input - ${passengers.get(stopOver.PassengersIndexes[index]).interestStopOver} in ${stopOverstr}`);
            let removed = stopOver.PassengersIndexes.splice(index, 1);
            minibus.PassengersIndexes.push(removed[0]);
            index--;
            len--;
    }
    minibus.indexStopOver++;
    if(minibus.indexStopOver === minibus.sizeOfPath){
        minibus.currentPath=minibus.is_recursive ? minibus.path : minibus.path_rec;
        minibus.is_recursive=minibus.is_recursive ? false : true;
        minibus.indexStopOver=0;
        minibus.sizeOfPath= minibus.currentPath.length;
        minibus.is_breaking=true;
        if(time.ToMinutes()>=minibus.timeend || time.ToMinutes()<minibus.timestart) minibus.is_sleeping=true;
    }
};