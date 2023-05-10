export class Time{
    
    constructor(hours,minutes,seconds,koef){
       this.hours = hours;
       this.minutes = minutes;
       this.seconds = seconds;
       this.koef = koef;
    }
    SetKoef(koef){
        this.koef = koef;
    }
    SetTime(hours,minutes,seconds){
        this.hours = hours;
        this.minutes = minutes;
        this.seconds = seconds;
    }
    getTime(){
       return json({
           hour: this.hours,
           minutes: this.minutes,
           seconds: this.seconds
       })
    }
   AddSecond(){
           this.seconds++;
           let newMinute=false;
           if(this.seconds===60) {
               this.minutes++;
               this.seconds = 0;
               newMinute=true;}
           if(this.minutes===60) {this.hours++; this.minutes=0;}
           if(this.hours===24) {this.hours=0;}
           return newMinute;
   }
   ToMinutes(){return this.hours*60+this.minutes}
}